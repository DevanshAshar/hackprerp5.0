/* mongoose is node js library that helps in working with mongodb*/
const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const db=process.env.MONGO_URL
mongoose.connect(db).then(()=>{
    console.log('Connection Succesful');
}).catch((err)=>console.log('no connection'));