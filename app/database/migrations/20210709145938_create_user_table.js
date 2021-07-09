exports.up = (knex) => {
	return knex.schema.createTable('users', (table) => {
			table.increments('id');
			table.string('name', 100).notNullable();
			table.string('email', 100).notNullable().unique();
			table.string('password', 255).notNullable();
			table.timestamps();
		});
};

exports.down = (knex) => {
	return knex.schema.dropTable('users')
};
