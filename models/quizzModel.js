const  mongoose=require('mongoose');

const quizzShema=new mongoose.Schema(
    {
        question:{
            type:Object,
            require:[true,'question require']
        },
        option:[{
            type:string,
            require:[true,'option require']
        }],
        correctanswer:{
            type:string,
            require:[true,'correctanswer  require']
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