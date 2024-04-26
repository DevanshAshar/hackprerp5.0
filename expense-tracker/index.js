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
    date: '27-04-24',
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
  const nextId = expenses.length > 0 ? expenses[expenses.length - 1].id + 1 : 1;
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
  let expense = expenses.find((expense) => expense.id == id);
  expense.title = req.body.title;
  expense.date = req.body.date;
  expense.amount = req.body.amount;
  res.send({message:'Updated',expense});
});


app.delete('/expenses', (req, res) => {
  let id = req.body.id;
  let expense = expenses.find((expense) => expense.id == id);
  let index = expenses.indexOf(expense);
  expenses.splice(index,1);
  res.send({message:'Deleted',expenses});
});

app.listen(3001, () => {
  console.log('Server is running!!');
});