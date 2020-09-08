// framework
const express = require('express')
const router = express.Router()

// library
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// model
const User = require('../models/user')

router.use(express.json())

router.post('/register', async (req, res) => {
    try{
        const emailExists = await User.findOne({email: req.body.email})
        if (emailExists) return res.status(400).send('email already exists')
    }catch(err){
        return res.status(500).send(err.message)
    }
    
    // hasing password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const user = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        // YYYY-MM-DD
        dateOfBirth: new Date(req.body.dateOfBirth),
    })

    try{
        user_data = await user.save()
        return res.status(200).json(user_data)
    }catch(err) {
        res.status(400).json({
            'message': err
        })
    }
})


// router.post('/login', async (req, res) => {

//     // when you need to compare you can use 
//     // after password and email id validation

//     const user = await User.findOne({email: req.body.email})

//     const validPassword = await bcrypt.compare(req.body.password, user.password)
//     if (!validPassword) {return res.status(400).send('invalid username or password')}

//     const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
//     return res.header('auth-token', token).send("logged in successfully")

// })

module.exports = router

