const express = require('express');
const router = express.Router();

// Route for login
const login = require("./login");
router.get('/', (req, res) =>{
    console.log("Login route hit");
    login(req, res);
});

// Route for signin
const signin = require("./signin");
router.put('/', (req, res) =>{
    console.log("Signin route hit");
    signin(req, res);
});

module.exports = router;