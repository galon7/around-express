const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const cards = require('./routes/cards');
const users = require('./routes/users');

const app = express();
mongoose.connect('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use('/', cards);
app.use('/', users);

const checker = (req, res) => {
  res.status(404).send('Requested resource not found');
};

app.use(checker);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
