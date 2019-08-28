const db = require('../data/db-config.js')

module.exports =  {
    getUsers,
    getUserBy,
    createUser
}

function getUsers() {
    return db('users')
}

function getUserBy(filter) {
    return db('users').where('username', filter).first()
}

function createUser(user) {
    return db('users').insert(user)
}