const express = require('express');
const router = express.Router();

// Route for login
const login = require("./login");
router.post('/', (req, res) =>{
    console.log("Login route hit");
    login(req, res);
});

// Route for signin
const signin = require("./signin");
router.put('/', (req, res) =>{
    console.log("Signin route hit");
    signin(req, res);
});

const getAllUsers = require("./getAllUsers");
router.get('/', (req, res) =>{
    console.log("Get all users route hit");
    getAllUsers(req, res);
});

module.exports = router;