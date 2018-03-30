const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
    if(err){
       return console.log('Unable to connect to MogoDb server');
    }
    console.log('Connected to MogoDb server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5abeae7c4ffc3d44fff1400f')
    // }, {
    //     $set:{
    //         completed: true
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) =>{
    //     console.log(result);
    // });
    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5abe6de37a037513349c79f0')
    }, {
            $set:{
                name: 'Alan'
            },
            $inc:{
                    age: 1
            }
        }
    , {
        returnOriginal: false
    }).then((result) =>{
        
        console.log(result);
    });
    

    //db.close();    
});




