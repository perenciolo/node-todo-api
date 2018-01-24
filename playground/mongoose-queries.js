let {
  mongoose
} = require('./../server/db/mongoose');
let {
  Todo
} = require('./../server/models/todo');

let id = '6a677bc02a13ecf8118f7009562114ad';

Todo.find({
  _id: id
}).then(todos => console.log('Todos', todos));

Todo.findOne({
  _id: id
}).then(todo => console.log('Todo', todo));

Todo.findById(id).then(todo => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo by id', todo);
}).catch(e => console.log(e));