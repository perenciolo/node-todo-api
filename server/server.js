let {
  mongoose
} = require('./db/mongoose');

const express = require('express');
const bodyParser = require('body-parser');

let {
  Todo
} = require('./models/todo');
let {
  User
} = require('./models/user');

let app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  console.log(req.body);
  
  let todo = new Todo({
    text: req.body.text
  });

  todo
    .save()
    .then(doc => {
      res
        .status(200)
        .json(doc)
    }, e => res.status(400).json(e));
});

app.listen(3000, () => console.log('Server running on port', port));