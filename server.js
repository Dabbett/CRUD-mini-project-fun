require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
const connectionString = process.env.CONNECTION_STRING;

MongoClient.connect(connectionString)
    .then(client => {
        console.log('Connected to Database');
        const db = client.db('Quotes')
        const quotesCollection = db.collection('quotes')

        app.use(bodyParser.urlencoded({extended:true}))
        app.get('/', (req,res) => {
            res.sendFile(__dirname + '/index.html')
        })
        
        app.post('/quotes',(req,res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.error(error)
            })
        })
        app.listen(3000, function() {
            console.log('listening on port 3000')
        })


    })
    .catch(error => console.error(err))

    

