const express = require('express'); /*Express.js is primarily used as a web server framework for Node.js. 
It simplifies the process of handling HTTP requests and responses by providing a set of powerful features 
and middleware that can be easily integrated into your Node.js applications*/
const app = express(); //make the imported module in executable state
app.use(express.json());
require('./dbConnect')
const Expense=require('./expenseModel')
app.get('/expenses', async (req, res) => {
    try {
        const expenses=await Expense.find()
        res.status(200).send(expenses)
    } catch (error) {
        res.status(500).send(error)
    }
});
app.post('/expenses', async(req, res) => {
    try {
        const expense=await Expense.create(req.body)
        res.status(200).send(expense)
    } catch (error) {
        res.status(500).send(error)
    }
});
app.put('/expenses',async(req,res)=>{
    try {
        const id=req.body.id
        const expense=await Expense.findByIdAndUpdate(id,req.body,{new:true})
        res.status(200).send({Updated:'true',expense})
    } catch (error) {
        res.status(500).send(error)
    }
})
app.delete('/expenses',async(req,res)=>{
    try {
        const id=req.body.id
        const expense=await Expense.findByIdAndDelete(id)
        res.status(200).send({Deleted:'true',expense})
    } catch (error) {
        res.status(500).send(error)
    }
})
app.listen(5000,()=>{
    console.log('Server running...')
})