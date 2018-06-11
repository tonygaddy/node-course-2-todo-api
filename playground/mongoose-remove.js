const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });
//

// Todo.findOneAndRemove({_id: '5b1e773e801945bea362766e'}).then((todo) => {
//   console.log(todo);
// });

Todo.findByIdAndRemove("5b1e7699801945bea362764e").then((todo) => {
  console.log(todo);
});
