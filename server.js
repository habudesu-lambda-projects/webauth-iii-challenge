const express = require('express')

const server = express()
const apiRouter = require('./api/api-router.js')

server.use(express.json())
server.use('/api', apiRouter)

server.get('/', (req, res) => {
    res.send('<h1>WebAuth Challenge 3</h1>')
})

module.exports = server