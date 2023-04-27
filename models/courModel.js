const  mongoose=require('mongoose');
const chapitremodel=require('../models/chapitreModel')
const ApiError=require('../utils/apiError')

const courShema=new mongoose.Schema(
    {
        name_cour:{
            type:String,
            trim:true,
            require:[true,'name_cour require']
        },
        description_cour:{
            type:String,
            trim:true,
            require:[true,'description_cour require']
        },
        id_domaine:{
            type:mongoose.Schema.ObjectId,
            ref:'domaine',
            require:[true,'id_domaine require']
        },
        image:{
            type:String,
            trim:true,
            require:[true,'image require']
        },

    },{timestamps:true}
);

courShema.pre('deleteOne',async function(next) {
    console.log('Removing!',this._conditions._id);
   const x=await chapitremodel.find({id_cour:this._conditions._id})
   if(x)
   {
    return   next(new ApiError(`found chapitre with id_cour${this._conditions._id} `,404)); 
   }
     next()
})
const cour=mongoose.model('cour',courShema);
module.exports=cour;