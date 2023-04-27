const  mongoose=require('mongoose');
const videoModel=require('../models/videoModel')
const ApiError=require('../utils/apiError')

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

leconShema.pre('deleteOne',async function(next) {
    console.log('Removing!2',this._conditions._id);
   const x=await videoModel.find({id_lecons:this._conditions._id})
   if(x)
   {
    return   next(new ApiError(`found video with id_lecons ${this._conditions._id} `,404)); 
   }
     next()
  });

const lecon=mongoose.model('lecons',leconShema);
module.exports=lecon;