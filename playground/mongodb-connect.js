// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // insert new doc into Users (name, age location)

  db.collection('Users').insertOne({
    name: 'Tony Gaddy',
    age: 43,
    location: 'Hamlet, NC'
  }, (err, result) => {
    if (err) {
      return console.log('Unable to inser user');
    }
    console.log(JSON.stringify(result.ops, undefined, 2));
  });

  db.close();
});
