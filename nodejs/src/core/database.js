const knex = require('knex')(require('../../knexfile'))

class Database {
    get knex() {
        return knex
    }
};

module.exports = {
    Database
};
