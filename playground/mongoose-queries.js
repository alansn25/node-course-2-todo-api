const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var userID = '5abec51ef3b087982e071179';

// var id = '5ac103a388cfcd9c2d461d3e11';

// if(!ObjectID.isValid(id)){
//     console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('Id not found!');
//     }
//     console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

User.findById(userID).then((user) => {
        if(!user){
            return console.log('Id not found!');
        }
        console.log('User by ID', user);
    }, (e)=>{
        console.log(e);
    });