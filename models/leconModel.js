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

leconShema.pre('deleteOne',async function(next) {
    console.log('Removing!',this._conditions._id);
   const x=await videoModel.deleteMany({id_lecons:this._conditions._id})
   console.log(x)
     next()
  });
const lecon=mongoose.model('lecons',leconShema);
module.exports=lecon;