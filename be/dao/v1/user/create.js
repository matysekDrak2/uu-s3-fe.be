const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const hashPassword = require("../../../tools/hashPassword");

const usersFilePath = path.join(__dirname, '../../../data/users.json');


/**
 * @param {Object<name: string, email: string, password: string>} userData
 * @returns {Object<id: uuidv4, name: string, email: string, password: sha512> | null} newUser
 * */
module.exports = function createUser(userData) {
    // Read existing users from the file
    let users = [];
    if (fs.existsSync(usersFilePath)) {
        const fileData = fs.readFileSync(usersFilePath, 'utf-8');
        users = JSON.parse(fileData);
    }

    // Check if the email already exists
    if (users.some(user => user.email === userData.email)) {
        return null
    }
    const newUser = {
        id: uuidv4(), // Generate a unique ID
        ...userData,
        password: hashPassword(userData.password)
    }

    // Add the new user
    users.push(newUser);

    // Save the updated users list to the file
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    return newUser
}