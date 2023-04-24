const  mongoose=require('mongoose');
const videoModel=require('../models/videoModel')

const leconShema=new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            require:[true,'name require']
        },
        description:{
            type:String,
            require:[true,'description require']
        },
        id_chapitre:{
            type:mongoose.Schema.ObjectId,
            ref:'chapitre',
            require:[true,'id_chapitre require']
        },
        number:{
            type:Number,
            trim:true,
            require:[true,'number require']
        },

    },{timestamps:true}
);

leconShema.pre('remove', function(next) {
    console.log('Removing!');
    next()
  });
const lecon=mongoose.model('lecons',leconShema);
module.exports=lecon;