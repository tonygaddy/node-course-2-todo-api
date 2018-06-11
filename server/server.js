const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });

  todo.save()
    .then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then((todos) => {
      res.send({todos});
    }, (e) => {
      res.status(400).send(e);
    });
});

// GET /todos/1234567
app.get('/todos/:id', (req, res) => {
  let id = req.params.id
// Valid id using isValid
// send empty with 404 status
  if (!ObjectID.isValid(id)) {
    res.status(404).send();
  }

  // if todo send it back
  // else send 400 empty
  Todo
    .findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.send({todo});

    })
    // error: 400
    .catch((err) => {
      res.status(400).send();
    });

});

app.delete('/todos/:id', (req, res) => {
  // get the id
  let id = req.params.id;

  // validate the id -> not valid? return 404
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  // remove todo by id
  Todo.findByIdAndRemove(id)
    // success
    .then((todo) => {
      // if no doc, send 404
      if (!todo) {
        return res.status(404).send();
      }
      //if doc, send doc back with 200
      res.send(todo);
    })
    // error
    .catch((err) => {
      // 400 with empty body
      res.status(400).send();
    });

});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

module.exports = {app};
