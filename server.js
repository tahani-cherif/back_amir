const express = require('express');
const morgan = require('morgan');
const dotenv=require('dotenv');
const config_data=require('./config/config_db');
dotenv.config({path:'config.env'})
const globalError=require('./middlewares/errorMiddleware')
const ApiError=require('./utils/apiError')
const userRoutes=require('./routes/userRoutes')
const authRoutes=require('./routes/authRoues')
const catalogueRoutes=require('./routes/catalogueRoutes')
const domaineRoutes=require('./routes/domaineRoutes')
const courRoutes=require('./routes/courRoutes')
const chapitreRoutes=require('./routes/chapitreRoutes')
const leconRoutes=require('./routes/leconRoutes')
const videoRoutes=require('./routes/videoRoutes')
const quizzRoutes=require('./routes/quizzRoutes')
const sessionEleveRoutes=require('./routes/sessionEleveRoutes')


//connection database
config_data()
const app=express()

//middlewares
app.use(express.json());
if(process.env.NODE_ENV === 'dev')
{
    app.use(morgan('dev'));
    console.log(`mode:${process.env.NODE_ENV}`);
}

//route
app.use('/api/users',userRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/catalogues',catalogueRoutes);
app.use('/api/domaines',domaineRoutes);
app.use('/api/cours',courRoutes);
app.use('/api/chapitres',chapitreRoutes);
app.use('/api/lecons',leconRoutes);
app.use('/api/videos',videoRoutes);
app.use('/api/quizzs',quizzRoutes);
app.use('/api/sessionEleves',sessionEleveRoutes);
app.get('/',(req,res) => {res.send('route API')});

app.all("*",(req,res,next)=>{
    //create error and send it to error handling middleware
    // const error=new Error(`can't find this route : ${req.originalUrl}`);
    // next(error.message);
     next(new ApiError(`can't find this route : ${req.originalUrl}`,400));
})

// Global error handling middleware for express
app.use(globalError);
const PORT=process.env.PORT || 8000;
app.listen(PORT,
           console.log("App running on port 8000"));
// error handling Rejection outside express
process.on("unhandledRejection",(err=>{
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(()=>{
       console.log('shutting down....')
       process.exit(1);})
  
}));