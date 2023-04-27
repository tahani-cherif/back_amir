const  mongoose=require('mongoose');
const leconsmodel=require('./leconModel')
const ApiError=require('../utils/apiError')

const chapitreShema=new mongoose.Schema(
    {
        number:{
            type:Number,
            trim:true,
            require:[true,'number require']
        },
        title:{
            type:String,
            trim:true,
            require:[true,'title require']
        },
        contenu:{
            type:String,
            require:[true,'contenu require']
        },
        id_cour:{
            type:mongoose.Schema.ObjectId,
            ref:'cour',
            require:[true,'id_cour require']
        }
    },{timestamps:true}
);

chapitreShema.pre('deleteOne',async function(next) {
    console.log('Removing!2',this._conditions._id);
   const x=await leconsmodel.find({id_chapitre:this._conditions._id})
   if(x)
   {
    return   next(new ApiError(`found lecons with id_chapitre ${this._conditions._id} `,404)); 
   }
     next()
  });

const chapitre=mongoose.model('chapitre',chapitreShema);
module.exports=chapitre;