require('dotenv').config({ path: '../../.env' });

const Knex = require('knex');
const config = require('../../knexfile');
const env = process.env.NODE_ENV;

const knex = Knex(config[env]);

module.exports = knex;
