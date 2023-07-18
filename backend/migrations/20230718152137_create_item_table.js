/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('item', table => {
        table.increments('id');
        table.integer('user_account_id');
        table.foreign('user_account_id').references('user_account.id');
        table.string('item_name').notNullable();
        table.string('description');
        table.integer('quantity');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('item', table => {
        table.dropForeign('user_account_id')
    })
    .then(function() {
        return knex.schema.dropTableIfExists('item')
    });
};
