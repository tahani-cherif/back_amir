const  mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userShema=new mongoose.Schema(
    {
        last_name:{
            type:String,
            trim:true,
            require:[true,'last_name require']
        },
        first_name:
        {
            type:String,
            trim:true,
            require:[true,'first_name require']
        },
        email:
        {
             type:String,
             require:[true,'email require'],
             unique:true,
        },
        password:
        {
            type:String,
            require:[true,'password require'],
            minlength:[8,'too short password']
        },
        role:
        {
            type:String,
            enum:['eleve','admin','enseigne']
        }
    },{timestamps:true}
);

userShema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    //hashing the password
    this.password = await bcrypt.hash(this.password,12);
    next();
})
const User=mongoose.model('user',userShema);
module.exports=User;