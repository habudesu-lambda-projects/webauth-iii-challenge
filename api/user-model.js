const db = require('../data/db-config.js')

module.exports =  {
    getUsers,
    getUserBy,
    createUser
}

function getUsers() {
    db('users')
}

function getUserBy(filter) {
    db('users').where({filter}).first()
}

function createUser(user) {
    db('users').insert(user)
}