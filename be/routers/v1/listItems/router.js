const express = require('express');
const router = express.Router();

const auth = require('../users/auth')

router.use(auth);

// Get list by ID
const get = require('./get')
router.get('/:id', (req, res)=>{
    get(req, res)
})

// Get all lists for user
const getAll = require('./getAll')
router.get('/', (req, res)=>{
    getAll(req, res)
})

// Create a new list
const create = require("./create")
router.post('/:id', (req, res) => {
    create(req, res)
});

// Delete a list by ID
const remove = require("./remove")
router.delete('/:id', (req, res) => {
    remove(req, res)
});

// Update a  by ID
const update = require("./update")
router.put('/:id', (req, res) => {
    update(req, res)
});

module.exports = router;