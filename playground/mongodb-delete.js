const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
       return console.log('Unable to connect to MogoDb server');
    }
    console.log('Connected to MogoDb server');
    
    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) =>{
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) =>{
    //     console.log(result);
    // });

    //findAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) =>{
    //     console.log(result);
    // });

    // db.collection('Users').findOneAndDelete({_id: new ObjectID('5abe6d354f830a357c15823a')}).then((result) =>{
    //      console.log(result);
    //  });

    db.collection('Users').deleteMany({name: 'Alan'}).then((result) =>{
        console.log(result);
    });

    //db.close();    
});




