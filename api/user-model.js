const db = require('../data/db-config.js')

module.exports =  {
    getUsers,
    createUser
}

function getUsers() {
    db('users')
}

function createUser(user) {
    db('users').insert(user)
}