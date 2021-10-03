exports.up = function(knex) {
	return knex.raw(`			
		CREATE TYPE user_role AS ENUM ('admin', 'guest');
		CREATE TABLE users_boards (
			user_id INT NOT NULL CONSTRAINT fk_users_boards_users REFERENCES users(id),
			board_id INT NOT NULL CONSTRAINT fk_users_boards_boards REFERENCES boards(id),
			role user_role NOT NULL,
			utc_created_on TIMESTAMP
				NOT NULL CONSTRAINT df_users_boards_utc_created_on DEFAULT (NOW()),
			CONSTRAINT pk_users_boards PRIMARY KEY (user_id, board_id)
		);
	`); 
};

exports.down = function(knex) {
	return knex.raw(`
		DROP TABLE users_boards;
		DROP TYPE user_role;	
	`); 
};
