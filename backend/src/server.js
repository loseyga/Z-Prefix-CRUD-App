const express = require('express');

const app = express();
const cors =require('cors');
const PORT = process.env.PORT || 3001;
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV||'development']);

app.use(express.json());
app.use(cors());

app.post('/users', function(req, res) {
    const { first_name, last_name, user_name, password } = req.body;
    knex('user_account')
        .select('id')
        .where('user_name', user_name)
        .then((existingUsers) => {
            if (existingUsers.length > 0) {
                return res.status(409).json({ error: 'User name is already taken' });
            }
            return knex('user_account')
                .insert({ first_name, last_name, user_name, password })
                .returning('id')
                .then((ids) =>
                    res.status(201).json({
                        message: 'Account created successfully',
                        user_account_id: ids[0]
                    })
                );
        })
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while creating the account',
                error: err,
            })
        );
});

app.get('/users', function(req, res) {
    knex('user_account')
        .select('*')
        .then(data => res.status(200).json(data))
        .catch(err =>
        res.status(404).json({
            message:
            'An error occurred while fetching the accounts'
        })
        );
});

app.post('/authenticate', (req, res) => {
    const { user_name, password } = req.body;
    knex('user_account')
    .select()
    .where('user_name', user_name)
    .where('password', password)
    .then((data) => {
        if (data.length === 0) {
            res.status(401).json({ error: "Invalid sign in credentials" });
        }
        res.status(200).json(data);
    })
    .catch((err) =>
        res.status(500).json({
        message: 'An error occurred while fetching the authentication credentials',
        error: err,
        })
    );
});

app.post('/items', function(req, res) {
    const { user_account_id, item_name, description, quantity } = req.body;
    knex('item')
        .insert({ user_account_id, item_name, description, quantity })
        .returning('id')
        .then((ids) =>
            res.status(201).json({
            message: 'Item created successfully',
            item_id: ids[0].id
            })
        )
        .catch((err) =>
            res.status(500).json({
            message: 'An error occurred while creating the item',
            error: err,
            })
            
        );
});

app.get('/items', function(req, res) {
    const user_account_id = parseInt(req.query.user_account_id);
    if (isNaN(user_account_id)) {
        return res.status(400).json({
            message: 'Invalid user_account_id provided',
        });
    }
    knex('item')
        .where('user_account_id', user_account_id)
        .select()
        .then((data) => res.status(200).json(data))
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while fetching the items',
                error: err,
            })
        );
});

app.get('/inventory', function(req, res) {
    knex('item')
        .select()
        .then((data) => res.status(200).json(data)
        )
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while fetching the item',
                error: err,
            })
        );
});

app.get('/items/:item_id', function(req, res) {
    const item_id = req.params.item_id;
    knex('item')
        .join('user_account', 'item.user_account_id', 'user_account.id')
        .where('item.id', item_id)
        .select('item.id', 'item.item_name', 'item.description', 'item.quantity', 'user_account.user_name')
        .then((data) => res.status(200).json(data))
        .catch((err) =>
            res.status(500).json({
                message: 'An error occurred while fetching the item',
                error: err,
            })
        );
});

app.patch('/items/:item_id', function(req, res) {
    const item_id = req.params.item_id;
    const { user_account_id, item_name, description, quantity } = req.body;
    knex('item')
        .where('id', item_id)
        .update({
            user_account_id,
            item_name,
            description,
            quantity
        })
        .then(() => {
            res.status(200).json({ message: 'Item updated successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'An error occurred while updating the item' });
        });
});

app.delete('/items/:item_id', function(req, res) {
    const item_id = req.params.item_id;
    knex('item')
        .where('id', item_id)
        .del()
        .then((rowCount) => {
            if (rowCount === 0) {
            return res.status(404).json({
                message: 'Item not found',
            });
            }
            res.status(200).json({
            message: 'Item deleted successfully',
            });
        })
        .catch((err) =>
            res.status(500).json({
            message: 'An error occurred while deleting the item',
            error: err,
            })
        );
});

app.listen(PORT, () => {
console.log(`The server is running on ${PORT}`);
});