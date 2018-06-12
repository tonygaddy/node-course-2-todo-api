const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MOGODB_URI);
// mongoose.connect('mongodb://todouser:iNinja#1@ds113775.mlab.com:13775/todoapp');

module.exports= {
  mongoose
};
