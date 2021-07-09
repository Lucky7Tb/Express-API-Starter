const knex = require('../config/knex');
const { Model } = require('objection');

Model.knex(knex);

module.exports = Model;
