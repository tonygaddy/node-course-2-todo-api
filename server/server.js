require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const bcrypt = require('bcryptjs');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');
const {authenticate} = require('./middleware/authenticate');

const app = express();
const port = process.env.PORT;

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
      res.send({todo});
    })
    // error
    .catch((err) => {
      // 400 with empty body
      res.status(400).send();
    });

});

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id;
  let body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true})
    .then((todo) => {
      if (!todo) {
        res.status(400).send();
      }
      res.send({todo});
    })
    .catch((e) => {
      res.status(400).send();
    });



});

// POST /users
app.post('/users', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  let user = new User(body);

  user.save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then((token) => {
      res.header('x-auth', token).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
  // let token = req.header('x-auth');
  //
  // User.findByToken(token)
  //   .then((user) => {
  //     if (!user) {
  //       return Promise.reject();
  //     }
  //     res.send(user);
  //   })
  //   .catch((e) => {
  //     res.status(401).send();
  //   });
});

// POST /users/login {email, password}
app.post('/users/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password)
    .then((user) => {
      user.generateAuthToken()
        .then((token) => {
          res.header('x-auth', token).send(user);
        });
    })
    .catch((e) => {
      res.status(400).send();
    });


});

// DELETE
app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token)
    .then(() => {
      res.status(200).send();
    })
    .catch((e) => {
      res.status(400).send();
    });
});

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

module.exports = {app};
