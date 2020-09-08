// expire the jwt token and break the code into modules

// require('express') will return a function 
const express = require('express')

// function returns object of type express and by convention we call that app
const app = express()

require('dotenv/config')
const cors = require('cors')


// importing routes
const authRoutes = require('./routes/auth')

// creating middleware
app.use('/user', authRoutes)
app.use(cors)

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true }, () => console.log("conected to DB..."))


// the payload in the put/post request will be automatically parsed as JSON
// express.json() returns a middleware which we use using app.use in request processing pipeline
app.use(express.json());


app.get('/', (req, res) => {
    return res.send("I am root!")
})

const port = process.env.PORT || 8000
app.listen(port, () => console.log(`listening to port ${port}...`))

