var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
//mongodb://alansn:alansncemig31@ds233769.mlab.com:33769/todo-mongodb
//mongoose.connect('mongodb://alansn:cemig31@ds233769.mlab.com:33769/todo-mongodb');
module.exports = {mongoose};

