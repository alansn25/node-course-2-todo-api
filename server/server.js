var express = require ('express');
var bodyParser = require ('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port=process.env.PORT || 3000;

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
