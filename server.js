const express = require('express')//access express modules
const app = express() // app is telling us to run express function 
const bodyParser = require('body-parser')// breaks up a string into an object
const MongoClient = require('mongodb').MongoClient

var db, collection; //declaring variables waiting to be assigned 

const url = "mongodb+srv://Meccay:Password@cluster0.qedze.mongodb.net/?retryWrites=true&w=majority";
const dbName = "all-projects";

app.listen(3001, () => {// listening to port waiting for server to be run 
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });//lets us know we have successfully connected to the database 
});
app.set('view engine', 'ejs')// has to come first so HTML will be rendered 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {messages: result})
  })
})
app.post('/addList', (req, res) => {
  db.collection('messages').insertOne({task: req.body.task, crossout: false}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
app.put('/crossOut', (req, res) => {
  console.log('req.body', req.body)
  db.collection('messages')
  .findOneAndUpdate({task: req.body.task,}, { 
    $set: {
      crossout: true
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})
app.delete('/deleteTasks', (req, res) => {
  console.log('delete', req.body.task)
  db.collection('messages').findOneAndDelete({task: req.body.task,}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })
})
