//MongoDb module v2
//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

// var user = {name: 'Alan', age: 30};
// var {name} = user;

// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
       return console.log('Unable to connect to MogoDb server');
    }
    console.log('Connected to MogoDb server');
    
    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert todo');
    //      }

    //      console.log(JSON.stringify(result.ops, undefined, 2));

    // });

    // db.collection('Users').insertOne({
    //         name: 'Alan',
    //         age: 30,
    //         location: 'Belo Horizonte'
    //     }, (err,result)=>{
    //         if(err){
    //             return console.log('Unable to insert user', err);
    //          }
    
    //          console.log(result.ops[0]._id.getTimestamp());
    
    //     });

    db.close();    
});




//MongoDb module v3
// const MongoClient = require('mongodb').MongoClient;

// MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, client)=>{
//     if(err){
//        return console.log('Unable to connect to MogoDb server');
//     }
//     console.log('Connected to MogoDb server');
//     const db = client.db('TodoApp');

//     db.collection('Todos').insertOne({
//         text: 'Something to do',
//         completed: false
//     }, (err,result)=>{
//         if(err){
//             return console.log('Unable to insert todo');
//          }

//          console.log(JSON.stringify(result.ops, undefined, 2));

//     });

//     client.close();    
// });