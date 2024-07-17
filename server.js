require('dotenv').config();


console.log('may the node be with you');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = process.env.CONNECTION_STRING;

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to Database');
    })
    .catch(error => console.error(err))


app.use(bodyParser.urlencoded({extended:true}))

app.listen(3000, function() {
    console.log('listening on port 3000')
})
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html')
})
app.post('/quotes',(req,res) => {
    console.log(req.body)
})

