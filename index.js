const express= require('express');
const {connectToMongoDb} = require('./config/db');


const app= express();
const PORT=3000;

//mongodb connection
connectToMongoDb('mongodb://127.0.0.1:27017/user-registration');




//app listening 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})