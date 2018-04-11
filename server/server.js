require ('./config/config');

const _ = require ('lodash');
const express = require ('express');
const bodyParser = require ('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port=process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
    //console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);        
    }, (e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos)=> {
        res.send({todos});
    },(e) =>{
        res.status(400).send(e);
    });
});


app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        return res.status(200).send({todo});

    }).catch((e)=>{
        return res.status(400).send();
    });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        res.status(200).send({todo});

    }).catch((e)=>{
        res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if(!ObjectID.isValid(id)){
        return res.status(404).send();
    }

    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }

        res.send({todo});
    }).catch((e) => {
        res.status(400).send();
    })
});


app.post('/users', (req, res)=>{
    //console.log(req.body);
    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);
    
    user.save().then(()=>{
       return user.generateAuthToken();        
    }).then((token) => {
        res.header('x-auth', token).send(user);
    }).catch((e)=>{
        res.status(400).send(e);
    });
});



app.get('/users/me', authenticate, (req, res) => {// private route
    // var token = req.header('x-auth');

    // User.findByToken(token).then((user) => {
    //     if(!user){
    //         return Promise.reject(); // the function is going to stop and it will enter the catch and it will hadle the erro there
    //     }
    // it is not necessary with the authenticate middleware

    res.send(req.user);    
});


app.post('/users/login', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);
    
     
    User.findByCredentials(body.email, body.password).then((user) => {
        return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send(user);    
        });
        res.send(user);
    }).catch((e) => {
        res.status(400).send(e);
    });  
});

app.delete('/users/me/token', authenticate, (req, res) => {//private route, you have to be authenticated to access this route
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});


app.listen(port, ()=>{
    console.log(`Started up at port ${port}`);
});

module.exports = {app};



//C:\Program Files\MongoDB\Server\3.6\bin> mongod.exe --dbpath /Users/alans/mongo-data
























// var newUser = new User({
//     email:'alansn@gmail.com'
// });

// newUser.save().then((doc)=>{
//     console.log('Saved User', doc); 
// },(e)=>{
//     console.log('Unable to save User'); 
// });
//  var newTodo = new Todo({
//      text: 'Sing a song',     
//  });

//  newTodo.save().then((doc)=>{
//     console.log('Saved todo', doc); 
//  }, (e) =>{
//     console.log('Unable to save todo'); 
//  });

//  var otherTodo = new Todo({
//     text: 'Edit this video',
//     //completed: false,
//     //completedAt: 1234
// });

// otherTodo.save().then((doc)=>{
//    console.log('Saved todo', doc); 
// }, (e) =>{
//    console.log('Unable to save todo'); 
// });
