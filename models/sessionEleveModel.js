const  mongoose=require('mongoose');

const sessionEleveShema=new mongoose.Schema(
    {
        id_eleve:{
            type:mongoose.Schema.ObjectId,
            trim:true,
            ref:'user',
            require:[true,'id_eleve require']
        },
        full_name:{
            type:String,
            trim:true,
            require:[true,'full_name require']
        },
        id_cour_terminer:[{
            type:mongoose.Schema.ObjectId,
        }],
        id_cour_commencer:[{
            type:mongoose.Schema.ObjectId,
            ref:'cour',
        }],
        quizz_terminer:[
            {
                id_quizz:{
                    type:mongoose.Schema.ObjectId,
                    ref:'quizz'},
                note:{
                    type:Number
                }
            },
        ]
    },{timestamps:true}
);


const sessionEleve=mongoose.model('sessionEleve',sessionEleveShema);
module.exports=sessionEleve;