const {
  ObjectID
} = require('mongodb');

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

app.get('/todos', (req, res) => {
  Todo.find().then(todos => {
    res
      .status(200)
      .json({
        todos
      });
  }, e => res.status(400).json({
    error: e
  }));
});

app.get('/todos/:id', (req, res) => {
  let id = req.params.id;
  if (!ObjectID.isValid(id)) {
    return res.status(404).json({
      error: {
        message: "Invalid Id."
      }
    });
  }
  Todo.findById(id).then(todo => {
    if (!todo) {
      return res.status(404).json({});
    }
    res
      .status(200)
      .json({
        result: todo
      });
  }, e => res.status(400).json({}));
});

app.listen(3000, () => console.log('Server running on port', port));

module.exports = {
  app
};