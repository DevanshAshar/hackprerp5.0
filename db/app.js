const express = require('express');
const app = express(); //make the imported module in executable state
app.use(express.json()); //parses the input request data in json format to the server
/* When a client sends data to your server in JSON format, 
this middleware will parse that JSON data and make it accessible in your server-side code.*/
const mongoose=require('mongoose') // mongoose is node js library that helps in working with mongodb
const dotenv=require('dotenv').config()
const db=process.env.MONGO_URL
async function connectToDb(){
    try {
        await mongoose.connect(db)
        console.log('Db Connected')
    } catch (error) {
        console.log(error)
    }
}
connectToDb()
const expenseSchema=new mongoose.Schema({
    title:{
        type:String
    },
    category:{
        type:String
    },
    amount:{
        type:Number
    }
})
const Expense=mongoose.model("Expense",expenseSchema)
app.get('/expenses', async function getExpenses(req, res){
    try {
        const expenses=await Expense.find()
        res.status(200).send(expenses)
    } catch (error) {
        res.status(500).send(error)
    }
});
app.post('/expenses', async function addExpense(req, res){
    try {
        const expense=await Expense.create(req.body)
        res.status(200).send(expense)
    } catch (error) {
        res.status(500).send(error)
    }
});
app.put('/expenses',async function updateExpense(req,res){
    try {
        const id=req.body.id
        const expense=await Expense.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send({Updated:'true',expense})
    } catch (error) {
        res.status(500).send(error)
    }
})
app.delete('/expenses',async function deleteExpense(req,res){
    try {
        const id=req.body.id
        const expense=await Expense.findByIdAndDelete(id)
        res.status(200).send({Deleted:'true',expense})
    } catch (error) {
        res.status(500).send(error)
    }
})
app.listen(5000,function serverOn(){
    console.log('Server running...')
})