const { faker } = require('@faker-js/faker');

exports.seed = async function (knex, Promise) {
    return knex('item').del()
    .then(function () {
        const numRowsToSeed = 100;
        const fakeData = [];
        for (let i = 0; i < numRowsToSeed; i++) {
        fakeData.push({
            item_name: faker.commerce.productName(),
            description: faker.commerce.productDescription(),
            quantity: faker.finance.amount({ min: 0, max: 100, dec: 0 }),
        });
        }
        return knex('item').insert(fakeData);
    });
};