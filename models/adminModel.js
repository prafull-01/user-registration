const mongoose = require('mongoose');
const bcrypt= require('bcryptjs');

const adminSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }


})

adminSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next();
    }
    this.password= bcrypt.hash(this.password,10);
    next();
})

const Admin= mongoose.model('admin',adminSchema);

module.exports=Admin;