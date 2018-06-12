let env = process.env.NODE_ENV || 'development';

if (env === 'development') {
  process.env.PORT = 3000;
  process.env.MOGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MOGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
} else {
  process.env.MOGODB_URI = 'mongodb://todouser:iNinja#1@ds113775.mlab.com:13775/todoapp';
}
