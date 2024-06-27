const express= require('express');
const {connectToMongoDb} = require('./config/db');
const bodyParser= require('body-parser');
const userRoutes=require('./routes/userRoutes');
const adminRoutes=require('./routes/adminRoutes');

const app= express();
const PORT=3000;

//mongodb connection
connectToMongoDb('mongodb://127.0.0.1:27017/user-registration');

app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));

//routes 
app.use('/user',userRoutes);
app.use('/admin',adminRoutes);


//app listening 
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})