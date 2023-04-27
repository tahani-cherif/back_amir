const  mongoose=require('mongoose');
const ApiError=require('../utils/apiError')
const courmodel=require('./courModel')

const domaineShema=new mongoose.Schema(
    {
        name_domain:{
            type:String,
            trim:true,
            require:[true,'name_domain require']
        },
        certificate:{
            type:String,
            trim:true,
            require:[true,'certificate require']
        },
        id_catalogue:{
            type:mongoose.Schema.ObjectId,
            ref:'Catalogue',
            require:[true,'id_catalogue require']
        },
        image:{
            type:String,
            trim:true,
            require:[true,'image require']
        },
        icon:{
            type:String,
            trim:true,
            require:[true,'icon require']
        }
    },{timestamps:true}
);

domaineShema.pre('deleteOne',async function(next) {
    console.log('Removing!',this._conditions._id);
   const x=await courmodel.find({id_domaine:this._conditions._id})
   if(x)
   {
    return   next(new ApiError(`found cour with id_domaine ${this._conditions._id} `,404)); 
   }
     next()
  });

const domaine=mongoose.model('domaine',domaineShema);
module.exports=domaine;