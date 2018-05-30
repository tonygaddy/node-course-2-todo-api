// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // findOneAndUpdate
  // db.collection('Todos')
  //   .findOneAndUpdate({_id: new ObjectID('5b0ef245b2e13151f36d11f5')}, {
  //     $set: {
  //       completed: true
  //     }
  //   }, {
  //     returnOriginal: false
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   });

  db.collection('Users')
    .findOneAndUpdate({_id: new ObjectID('5b0ef911b2e13151f36d13e3')},{
      $set: {
        name: 'Jen'
      },
      $inc: {
        age: 1
      }
    }, {
      returnOriginal: false
    })
    .then((result) => {
      console.log(result);
    });

  // db.collection('Users')
  //   .findOneAndUpdate({_id: new ObjectID('5b0ef911b2e13151f36d13e3')},{
  //     $inc: {
  //       age: 1
  //     }
  //   }, {
  //     returnOriginal: false
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   });

  // db.close();
});
