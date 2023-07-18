const { faker } = require('@faker-js/faker');

exports.seed = async function (knex, Promise) {
    // Deletes ALL existing entries for the table
    return knex('user_account').del()
    .then(function () {
        // Generate fake data using Faker
        const numRowsToSeed = 10; // Number of rows you want to insert
        const fakeData = [];
        for (let i = 0; i < numRowsToSeed; i++) {
            let first_name = faker.person.firstName();
            let last_name = faker.person.lastName();
        fakeData.push({
            first_name: `${first_name}`,
            last_name: `${last_name}`,
            user_name: faker.internet.userName({ firstName: `${first_name}`, lastName: `${last_name}`}),
            password: 'password',
        });
        }
        // Insert the fake data into the table
        return knex('user_account').insert(fakeData);
    });
};