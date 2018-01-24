// const MongoClient = require('mongodb').MongoClient;
const {
  MongoClient,
  ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    console.log('Unable to connect to MongoDB server');
  }

  console.log('Connected to MongoDB server');

  // deleteMany
  // db
  //   .collection('Todos')
  //   .deleteMany({
  //     text: 'Defecar'
  //   })
  //   .then(result => {
  //     console.log(result);
  //   }, err => console.log('Unable to remove', err));

  // deleteOne
  // db
  //   .collection('Todods')
  //   .deleteOne({
  //     text: 'Defecar'
  //   })
  //   .then(result => {
  //     console.log(result);
  //   }, err => console.log('Unable to remove', err));

  // findOneAndDelete
  // db
  //   .collection('Todos')
  //   .findOneAndDelete({
  //     completede: false
  //   })
  //   .then(result => {
  //     console.log(result);
  //   }, err => console.log('Unable to remove', err));

  // db.close();
});