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
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passport = require('passport');
const session=require('express-session');
var http = require("http");
const app=express()


var server = http.createServer(app);
var io = require("socket.io")(server);
app.use(express.json());

//connection database
config_data()




  
//middlewares
if(process.env.NODE_ENV === 'dev')
{
    app.use(morgan('dev'));
    console.log(`mode:${process.env.NODE_ENV}`);
}
// auth with google
// passport.use(new GoogleStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['email profile'] }),
//   function(req, res) {
//   console.log("appppppp")
//   });

// app.get('/auth/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Authenticated successfully
//     res.redirect('/');
//   });
//   passport.use(new FacebookStrategy({
//     clientID: process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://www.example.com/auth/google/callback",
//     profileFields:['id', 'name', 'displayname','email']
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ googleId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));
// auth with facebook
//  app.use(passport.initialize());
//  app.use(passport.session());
//  app.use(session({secret: 'thisissecretkey'}));
 
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
const PORT=process.env.PORT || 8000;
server.listen(PORT, "0.0.0.0", () => {
    console.log("server started");
  });
  global.onlineUsers = new Map();
  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });
  
    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data.msg);
      }
    });});
// error handling Rejection outside express
process.on("unhandledRejection",(err=>{
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(()=>{
       console.log('shutting down....')
       process.exit(1);})
  
}));