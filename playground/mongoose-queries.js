const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// let id = '5b100707df4d739751df91a2';
// let id = '6b100707df4d739751df91a2';
// let id = '5b100707df4d739751df91a211';
//
// if (!ObjectID.isValid(id)) {
//   console.log('Id not valid');
// }
// Todo
//   .find({
//     _id: id
//   })
//   .then((todo) => {
//     console.log('Todos', todo);
//   });
//
//   Todo
//   .findOne({
//     _id: id
//   })
//   .then((todo) => {
//     console.log('Todo', todo);
//   });

  // Todo
  //   .findById(id)
  //   .then((todo) => {
  //     if (!todo) {
  //       return console.log('Id not found');
  //     }
  //     console.log('Todo by Id', todo);
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //   });

// User.findById
User
  .findById('5b0f1fcf479aac1410a8f3c7')
  .then((user) => {
    if (!user) {
      return console.log('User id not found');
    }
    console.log('User by id', user);
  })
  .catch((err) => {
    console.log(err);
  });
