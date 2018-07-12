// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  const db = client.db('TodoApp');

  // delete many
  db.collection('Todos').deleteMany({text: 'somthing to do'}).then((result) => {
    console.log(result);
  });

  // delete one
  db.collection('Todos').deleteOne({text: 'eat lunch'}).then((result) => {
    console.log(result);
  });

  // find one and delete
  db.collection('Todos').findOneAndDelete({_id: new ObjectID('5b46f41e8e7356484bcf1a84')}).then((result) => {
    console.log(result);
  });


  // db.close();
});
