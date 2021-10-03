exports.up = function(knex) {
	return knex.raw(`	
		CREATE TABLE tasks (
			id UUID NOT NULL
				CONSTRAINT pk_tasks PRIMARY KEY DEFAULT (UUID_GENERATE_V4()),
			board_id INT NOT NULL CONSTRAINT fk_tasks_boards REFERENCES boards(id),
			title TEXT NOT NULL,
			description TEXT,
			utc_deleted_on TIMESTAMP,
			utc_completed_on TIMESTAMP,
			utc_created_on TIMESTAMP
				NOT NULL CONSTRAINT df_tasks_utc_created_on DEFAULT (NOW())
		);
	`);
};

exports.down = function(knex) {
	return knex.raw(`
		DROP TABLE tasks;
	`); 
};
