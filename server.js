// MODULES
const express  = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')



// FILES
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')



// CONNECT TO THE DATABASE
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',   // 127.0.0.1 = localhost
      user : 'postgres',
      password : 'Parola1',
      database : 'smartbrain'
    }
})



// INITIATE EXPRESS APP
const app = express()

// Parse received JSON data
app.use(bodyParser.json())

//?????
app.use(cors())


app.get('/', (req, res) => {
   res.send('Hello there!')
})


// DEPENDENCY INJECTION
// ENDPOINTS
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })
//ADVANCED: app.put('/image', image.handleImage(db) )
//req, res are automatically passed as paramaeters












app.listen(3000, () => {
    //Function - run right after listen
    console.log("App is running on port 3000")
})

/*
/ --> res = this is working
/signin --> POST = success/fail
//Password is sent as a POST request to make sure it's hidden
/register --> POST ( add data to the DB / Server ) = user
/profile/:userId --> GET ( get the user info ) = user
/image --> PUT ( user exist, make sure there is a update on user profile) = user ( updated profile - counter)

*/