exports.up = function(knex) {
	return knex.raw(`
		CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
	`);  
};

exports.down = function(knex) {
	return knex.raw(`
		DROP EXTENSION "uuid-ossp";
	`); 
};
