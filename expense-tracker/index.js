const express=require('express') //import modules just like u import lib in java
const app=express() // make an instance of the imported module just how u make instance of Scanner class in java to use its fns
const cors=require('cors') //cross-origin-resource sharing
app.use(cors()) //used for fronted-backend integration , basically allowing frontend to access data from backend through the api
app.use(express.json()) //parses/typecastes the input request data in json format to the server 
const expenses=[
    {
        title:'Pizza',
        category:'Food',
        amount:500,
        id:1
    }
]
app.get('/getData',function(req,res){
    res.send(expenses)
})
app.post('/postData',function(req,res){
    const amount=req.body.amount
    const title=req.body.title
    const category=req.body.category
    let nextId
    if(expenses.length>0){
        const latestExpense=expenses[expenses.length-1]
        nextId=latestExpense.id+1
    }else{
        nextId=1
    }
    const finalExpense={
        amount:amount,
        title:title,
        category:category,
        id:nextId
    }
    expenses.push(finalExpense)
    res.send({message:'Added successfully',expenses:expenses})
})
app.put('/updateData',function(req,res){
    let id = req.body.id;
  let exp = expenses.find(function(e) {
    return e.id == id;
  });
  exp.title = req.body.title;
  exp.category=req.body.category;
  exp.amount = req.body.amount;
  res.send({message:'Updated',exp});
})
app.delete('/deleteData',function(req,res){
    let id=req.body.id
    let exp=expenses.find(function(e){
        return e.id==id
    })
    let index=expenses.indexOf(exp)
    expenses.splice(index,1)
    res.send({message:'Deleted',exp})
})
app.get('/try',function getReq(req,res){
    res.send('API is working')
})
app.listen(5000,function serverOn(){
    console.log('Running')
})