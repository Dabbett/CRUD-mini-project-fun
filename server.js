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
        app.use(express.static('public'))
        app.use(bodyParser.json())

        app.get('/', (req,res) => {
            quotesCollection.find().toArray()
                .then(result => {
                    console.log(result)
                    res.render('index.ejs', {quotes:result})
                })
                .catch(error => console.error(error))
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

        app.put('/quotes', (req,res) => {
            quotesCollection.findOneAndUpdate(
                { species: 'red drum'},
                {
                    $set: {
                        species: req.body.species,
                        tip: req.body.tip
                    }
                },
                {
                    upsert: true
                }
            )
            .then(result => {
                console.log(result)
                res.json('Success')
            })
            .catch(err => {
                console.error(err)
            })
        })

        app.delete('/quotes', (req,res) => {
            quotesCollection.deleteOne(
            {species: req.body.species },
            )
            .then(result => {
                if(result.deletedCount === 0) {
                    return res.json('No tip to delete') 
                } res.json('Deleted tip')
            })
            .catch(error => console.error(error))
        })



        app.listen(3000, function() {
            console.log('listening on port 3000')
        })


    })
    .catch(error => console.error(err))

    

