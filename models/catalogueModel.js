const  mongoose=require('mongoose');
const domainemodel=require('./domaineModel')
const ApiError=require('../utils/apiError')

const catalogueShema=new mongoose.Schema(
    {
        name_catalogue:{
            type:String,
            trim:true,
            require:[true,'name_catalogue require']
        },
        college_year:{
            type:String,
            trim:true,
            require:[true,'college_year require']
        },
        image:{
            type:String,
            trim:true,
            require:[true,'image require']
        }
    },{timestamps:true}
);

catalogueShema.pre('deleteOne',async function(next) {
    console.log('Removing!',this._conditions._id);
   const x=await domainemodel.find({catalogueShema:this._conditions._id})
   if(x)
   {
    return   next(new ApiError(`found domaine with id_catalogue ${this._conditions._id} `,404)); 
   }
     next()
  });

const catalogue=mongoose.model('Catalogue',catalogueShema);
module.exports=catalogue;