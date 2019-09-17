const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./user-model.js')

router.get('/users', authorize, async (req, res) => {
    try {
        const users = await User.getUsers()
        res.status(200).json(users)
    }
    catch {
        res.status(500).json({ message: "Could Not Get Users" })
    }
})

router.post('/register', async (req, res) => {
    let user = req.body
    if(user.password && user.username && user.department) {
        try {
            const hash = bcrypt.hashSync(user.password, 10)
            user.password = hash
            const newUser = await User.createUser(user)
            res.status(201).json(newUser)
        }
        catch(error) {
            res.status(400).json({message: "Failed to Create User", error: error })
        }
    } else {
        res.status(400).json({message: "Missing User Info"})
    }  
})

router.post('/login', async (req, res) => {
    let { username, password } = req.body
    try {
        const user = await User.getUserBy(username)
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = createToken(user)
            res.status(200).json({
                message: "Successful Login",
                token
            })
        } else {
            res.status(401).json({ message: "Invalid Credentials" })
        }
    }
    catch(error) {
        res.status(500).json({ message: "Could Not Login", error: error })
    }
})

function createToken(user) {
    const payload = {
        subject: "user",
        username: user.username
    }
    const secret = "blah-blah-blah"
    const options = {
        expiresIn: '1hr'
    }

    return jwt.sign(payload, secret, options)
}

//middlewares

function authorize( req, res, next ) {
 const token = req.headers.authorization
 if(token) {
     jwt.verify(token, 'blah-blah-blah', (error, decodedToken) => {
         if(decodedToken) {
             req.decodedJwt = decodedToken
             next()
         } else {
             res.status(401).json(error)
         }
     })
 } else {
     res.status(401).json({ message: "No Token" })
 }
}

module.exports = router