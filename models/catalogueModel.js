const  mongoose=require('mongoose');

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
    },{timestamps:true}
);


const catalogue=mongoose.model('catalogue',catalogueShema);
module.exports=catalogue;