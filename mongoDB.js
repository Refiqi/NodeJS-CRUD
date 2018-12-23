var {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017', function (err, client) {
  if (err) throw err;
  const db = client.db('animals');
  console.log('Connected');

  // Create DATA
  //   db.collection('mamals').insertMany([{
  //     name: 'Dog',
  //     age: 8
  // }, {
  //     name: 'Cat',
  //     age: 1
  // }], (err, result) => {
  //   if (err) { return console.log(err)}
  //   console.log('INSERTED')
  // })

  // READ DATA
  // db.collection('mamals').find().toArray(function (err, result) {
  //   if (err) throw err

  //   console.log(result)
  // })

  // Update DATA
  // db.collection('mamals').findOneAndUpdate({
  //   _id: new ObjectId('5c1f31d8f7a0c91eb6d70e04')
  // }, {
  //   $set: {name: 'Nine-Tailed-Fox', age: 5}
  // })
  // console.log('Updated')

  // DELETE DATA
  // db.collection('mamals').findOneAndDelete({
  //   _id: new ObjectId('5c1f316ffa9d281e8f5ed202')
  // });
  // console.log('DELETED')

});