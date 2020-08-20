//ENVIROINTMENTAL VARIABLES
const PORT = process.env.PORT || 3000


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
        connectionString: process.env.DATABASE_URL,
        ssl: true,
    /*  host : '127.0.0.1',   // 127.0.0.1 = localhost
      user : 'postgres',
      password : 'Parola1',
      database : 'smartbrain'
    */
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








app.listen(PORT, () => {
    console.log("App is running on port 3000")
})