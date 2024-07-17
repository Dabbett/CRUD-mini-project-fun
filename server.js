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

        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({extended:true}))
        app.get('/', (req,res) => {
            quotesCollection.find().toArray()
                .then(results => {
                    console.log(results)
                })
                .catch(error => console.error(error))
            res.render('index.ejs',{})
        })
        
        app.post('/quotes',(req,res) => {
            quotesCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect('/')
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

    

