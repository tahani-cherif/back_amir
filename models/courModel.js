const  mongoose=require('mongoose');

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
        }

    },{timestamps:true}
);


const cour=mongoose.model('cour',courShema);
module.exports=cour;