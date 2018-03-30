const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
       return console.log('Unable to connect to MogoDb server');
    }
    console.log('Connected to MogoDb server');
    
    // db.collection('Todos').find({
    //     _id: new ObjectID('5abe6fd98f812518dafd10ee')
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));

    // },(err)=>{
    //     console.log('Unable to fetch todos', err);
    // });

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count:${count}`);
     
    // },(err)=>{
    //     console.log('Unable to fetch todos', err);
    // });

    db.collection('Users').find({name:'Alan'}).toArray().then((docs)=>{
        console.log(JSON.stringify(docs,undefined,2));
    })





    //db.close();    
});




