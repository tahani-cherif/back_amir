const  mongoose=require('mongoose');

const pdfShema=new mongoose.Schema(
    {
        file:{
            type:String,
            trim:true,
            require:[true,'file require']
        },
        id_lecons:{
            type:mongoose.Schema.ObjectId,
            ref:'lecons',
            require:[true,'id_lecons require']
        },
        number:{
            type:Number,
            trim:true,
            require:[true,'number require']
        },

    },{timestamps:true}
);

const pdf=mongoose.model('pdf',pdfShema);
module.exports=pdf;