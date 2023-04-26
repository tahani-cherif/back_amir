const  mongoose=require('mongoose');

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


const domaine=mongoose.model('domaine',domaineShema);
module.exports=domaine;