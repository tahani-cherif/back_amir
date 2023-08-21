const  mongoose=require('mongoose');

const quizzShema=new mongoose.Schema(
    {
        nom_quiz:{
            type:String,
            require:[true,'nom_quiz require']
        },
        question:{
            type:Object,
            require:[true,'question require']
        },
        id_cour:{
            type:mongoose.Schema.ObjectId,
            trim:true,
            ref:'cour',
            require:[true,'id_cour require']
        }
    },{timestamps:true}
);


const quizz=mongoose.model('quizz',quizzShema);
module.exports=quizz;