const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) =>{ // create TodoApp db
    if(err) {
        return console.log('unable to connect to Mongodb Sever');
    }
    console.log('connected to mongodb');

    client.db('TodoApp').collection('Todos').insertOne({
        text:'somthing to do',
        completed: false
    },(err,result)=>{
        if(err){
            return console.log('unable to insert todo \n',err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2)); // result.ops -> to show the result added
    });

    client.db('User').collection('Todos').insertOne({
        text: 'jie',
        age : false,
        location: 'KL'
    },(err,result)=>{
        if(err){
            return console.log('unable to insert user \n',err);
        }

        console.log(JSON.stringify(result.ops, undefined, 2)); // result.ops -> to show the result added
        console.log(result.ops[0]._id.getTimestamp()); // get timestamp from object_id
    });

    client.close();
});