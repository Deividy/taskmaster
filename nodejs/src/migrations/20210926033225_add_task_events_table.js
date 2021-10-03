exports.up = function(knex) {
	return knex.raw(`	
		CREATE TYPE task_event AS ENUM ('create', 'delete', 'complete');
		CREATE TABLE task_events (
			user_id INT NOT NULL CONSTRAINT fk_task_events_users REFERENCES users(id),
			task_id UUID NOT NULL CONSTRAINT fk_task_events_tasks REFERENCES tasks(id),
			event task_event NOT NULL,
			metadata jsonb,
			utc_created_on TIMESTAMP
				NOT NULL CONSTRAINT df_task_events_utc_created_on DEFAULT (NOW()),
			CONSTRAINT pk_task_events PRIMARY KEY (user_id, task_id));
	`);  
};

exports.down = function(knex) {
	return knex.raw(`
		DROP TABLE task_events;
		DROP TYPE task_event;
	`); 
};
