const  mongoose=require('mongoose');

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


const chapitre=mongoose.model('chapitre',chapitreShema);
module.exports=chapitre;