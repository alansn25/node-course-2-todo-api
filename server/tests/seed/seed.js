const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    email: 'alan@example.com',
    password: 'userOnePass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()        
    }]
},{
    _id: userTwoId,
    email: 'bruna@example.com',
    password: 'userTwoPass',
    tokens: [{
        access: 'auth',
        token: jwt.sign({_id: userTwoId, access: 'auth'}, 'abc123').toString()        
    }]
}];


const todos = [{
    _id: new ObjectID(),
    text: 'First test todo',
    _creator: userOneId
},{
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 333,
    _creator: userTwoId
}];

const populateTodos = (done) => {
    Todo.remove({}).then(()=> {
        return Todo.insertMany(todos);
    }).then(() => done()).catch((e)=>{
        console.log(e);
        done();
    });
};

const populateUsers = (done) => {
    User.remove({}).then(()=> {
        var userOne = new User(users[0]).save();// it is not possible to use insertmany because it wont call the middleware
        var userTwo = new User(users[1]).save();

       return Promise.all([userOne, userTwo]);// it will wait for both userOne and usertwo to be completed
    }).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};