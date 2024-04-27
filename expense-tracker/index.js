//npm i -g nodemon
//without db

const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');

app.use(cors());
const expenses = [
  {
    title: 'Pav Bhaji',
    amount: 200,
    category: 'Food',
    id: 1
  }
];


app.get('/expenses', (req, res) => {
  res.send(expenses);
});

app.post('/expenses', (req, res) => {
  const amount = req.body.amount;
  const title = req.body.title;
  const date = req.body.date;
  let nextId
  if(expenses.length>0){
    const latestExpense= expenses[expenses.length - 1]
    nextId=latestExpense.id+1
  }else{
    nextId=1
  }
  const expense = {
    amount: amount,
    title: title,
    id: nextId,
  };
  expenses.push(expense);
  res.send({message:'expense added!',expenses});
});


app.get('/', (req, res) => {
  res.send('API is working!');
});


app.put('/expenses', (req, res) => {
  let id = req.body.id;
  let exp = expenses.find(function(e) {
    return e.id === id;
  });
  exp.title = req.body.title;
  exp.date = req.body.date;
  exp.amount = req.body.amount;
  res.send({message:'Updated',exp});
});


app.delete('/expenses', (req, res) => {
  let id = req.body.id;
  let exp = expenses.find(function(e) {
    return e.id === id;
  });
  let index = expenses.indexOf(exp);
  expenses.splice(index,1);
  res.send({message:'Deleted',exp});
});

app.listen(3001, () => {
  console.log('Server is running!!');
});