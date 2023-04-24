const  mongoose=require('mongoose');
const leconModel=require('../models/leconModel')

const videoShema=new mongoose.Schema(
    {
        url:{
            type:String,
            trim:true,
            require:[true,'url require']
        },
        time:{
            type:Number,
            require:[true,'time require']
        },
        id_lecons:{
            type:mongoose.Schema.ObjectId,
            ref:'lecons',
            require:[true,'id_lecons require']
        },
        number:{
            type:Number,
            trim:true,
            require:[true,'number require']
        },

    },{timestamps:true}
);

const video=mongoose.model('video',videoShema);
module.exports=video;