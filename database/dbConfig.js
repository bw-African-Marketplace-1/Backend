const knex = require('knex');

const knexConfig = require('../knexfile.js');

const environment = DB_ENV || 'development'

module.exports = knex(knexConfig[environment]);