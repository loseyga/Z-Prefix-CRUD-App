/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('user_account', table => {
        table.increments('id');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('user_name').notNullable();
        table.string('password').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user_account');
};
