const mongoose= require('mongoose');
const bcrypt= require('bcryptjs')

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,

    },
    isVerified:{
        type:Boolean,
        default:false,
    },
    otp:{
        type:String,
    },
    location: String,
    age:Number,
    work:String,
    DOB:Date,
    description:String,
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next();
});

const User= mongoose.model('user',userSchema);

module.exports=User;