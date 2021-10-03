exports.up = function(knex) {
	return knex.raw(`	
		CREATE SEQUENCE seq_boards;
		CREATE TABLE boards (
			id INT NOT NULL
				CONSTRAINT pk_boards PRIMARY KEY DEFAULT NEXTVAL('seq_boards'),
			title TEXT NOT NULL,
			description TEXT,
			link TEXT NOT NULL CONSTRAINT uq_boards_link UNIQUE,
			utc_created_on TIMESTAMP
				NOT NULL CONSTRAINT df_boards_utc_created_on DEFAULT (NOW())
		);
		ALTER SEQUENCE seq_boards OWNED BY boards.id;
	`);	  
};

exports.down = function(knex) {
	return knex.raw(`
		DROP TABLE boards;
	`); 
};
