//npm i -g nodemon
const express = require('express');
const app = express();
app.use(express.json());
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
  const expense = {
    amount: amount,
    title: title,
    date: date,
    id: 2
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
  expenses.splice(index);
  res.send({message:'Deleted',expenses});
});
// app.listen(3001)
app.listen(3001, () => {
  console.log('Server is running!!');
});