const express = require('express');
const morgan = require('morgan');
const dotenv=require('dotenv');
const config_data=require('./config/config_db');
dotenv.config({path:'config.env'})
const globalError=require('./middlewares/errorMiddleware')
const ApiError=require('./utils/apiError')
const userRoutes=require('./routes/userRoutes')
const authRoutes=require('./routes/authRoues')
const domaineRoutes=require('./routes/domaineRoutes')
const courRoutes=require('./routes/courRoutes')
const chapitreRoutes=require('./routes/chapitreRoutes')
const leconRoutes=require('./routes/leconRoutes')
const videoRoutes=require('./routes/videoRoutes')
const quizzRoutes=require('./routes/quizzRoutes')
const sessionEleveRoutes=require('./routes/sessionEleveRoutes')
const pdfRoutes=require('./routes/pdfRoutes')
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const cors = require("cors");
const session=require('express-session');
var http = require("http");
const c = require('ansi-colors');
const { Console } = require('console');

const app = express();

// Json and Cors Middlewares
app.use(cors());
app.use(express.json());


//connection database
config_data()




  
//middlewares
if(process.env.NODE_ENV === 'dev')
{
    app.use(morgan('dev'));
    console.log(`mode:${process.env.NODE_ENV}`);
}

 
//route
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/domaines',domaineRoutes);
app.use('/api/cours',courRoutes);
app.use('/api/chapitres',chapitreRoutes);
app.use('/api/lecons',leconRoutes);
app.use('/api/videos',videoRoutes);
app.use('/api/quizzs',quizzRoutes);
app.use('/api/sessionEleves',sessionEleveRoutes);
app.use('/api/pdfs',pdfRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get('/',(req,res) => {res.send('route API')});
//static Images Folder

app.use('/image', express.static('./image'))
//static Images Folder

app.use('/pdf', express.static('./pdf'))

app.all("*",(req,res,next)=>{
    //create error and send it to error handling middleware
    // const error=new Error(`can't find this route : ${req.originalUrl}`);
    // next(error.message);
     next(new ApiError(`can't find this route : ${req.originalUrl}`,400));
})




// Global error handling middleware for express
app.use(globalError);
const PORT=process.env.PORT || 3000;

// Listen to Server (Socket)

const server = app.listen(
  PORT,
  console.log(c.yellow(`Server running on PORT ${PORT}...`))
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    var user = JSON.parse(userData);
    
console.log(user);
    socket.join(JSON.parse(user)._id );
    socket.emit("connected");
    console.log("setup for: " + JSON.parse(user)._id);

  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on('typing', () => {
    // Broadcast the typing event to all other clients except the sender
    socket.broadcast.emit('typing');
  });

  socket.on('stop typing', () => {
    // Broadcast the stop typing event to all other clients except the sender
    socket.broadcast.emit('stop typing');
  });
  // socket.on("typing", (room) => socket.in(room).emit("typing"));
  // socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(JSON.parse(user)._id);
  });});

// error handling Rejection outside express
process.on("unhandledRejection",(err=>{
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(()=>{
       console.log('shutting down....')
       process.exit(1);})
  
}
));