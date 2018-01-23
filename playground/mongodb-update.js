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

  db
    .collection('Todos')
    .findOneAndUpdate({
      _id: new ObjectID('5a676d2f72b27447b0d2b039')
    }, {
      $set: {
        text: "Masturbar novamente"
      }
    }, {
      returnOriginal: false
    })
    .then(result => console.log(result), err => 'Unable to update', err);

  // db.close();
});