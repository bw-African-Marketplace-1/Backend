const db = require('../database/dbConfig.js');

module.exports = {
    find,
    findBy,
    findById,
    add,
    findUser
}

function find() {
    return db('users');
}
function findUser(username) {
    return db('users').where(username)
}

function findBy(filter) {
    return db('users')
        .where(filter)
        .orderBy('id');
}

function findById(id) {
    return db('users').where({id}).first();
}

function add(user) {
    return db('users')
        .insert(user);
};