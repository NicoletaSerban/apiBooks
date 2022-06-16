// Required dependencies

const express = require('express')
const app = express()
const PORT = 8900
const MongoClient = require('mongodb').MongoClient
const cors = require('cors')
app.use(cors())
require('dotenv').config()

// Create books objects/ local db MongoDB
let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'books'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true})
    .then(client =>{
        console.log(`Connected to ${dbName} Database` )
        db = client.db(dbName)
})

//Middleware
app.set('view engine', 'ejs') //ejs e viewport
app.use(express.static('public')) //public folder servit clientului
app.use(express.urlencoded({ extended: true })) // nu stiu
app.use(express.json()) // permite express sa parse json


// set up homepage
app.get('/', (request, response)=>{
    db.collection('booksInfo').find().toArray()
    .then(data=>{
        console.log(data);

        response.render('index.ejs', {info: data})
    })
    .catch(error => console.error(error))
})

//Show all objects
app.get('/api', (request, response)=>{
    db.collection('booksInfo').find().toArray()
    .then(data=>{

        response.send(data)
    })
    .catch(error => console.error(error))
})

//Show up individual object
app.get('/api/:bookName', (request, response)=>{
    const bookName = request.params.bookName.toLowerCase()
    db.collection('booksInfo').find({name:bookName}).toArray()
    .then(result=>{
      
        if(result[0]){
            response.json(result[0]);
        } else{
            response.json('The book is not in our database!')
        }
        
    })
})

// set up Localhost on PORT
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on ${PORT}`);
})
