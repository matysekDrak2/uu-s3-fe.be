const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const { v4: uuidv4 } = require('uuid');
const hashPassword = require('../../../tools/hashPassword');

const ajv = new Ajv();

// Define the schema for user validation
const userSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 1 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }
    },
    required: ['name', 'email', 'password'],
    additionalProperties: false
};
const validate = ajv.compile(userSchema);

// Path to the users data file
const usersFilePath = path.join(__dirname, '../../../data/users.json');

// Exported function to handle user creation
module.exports = (req, res) => {
    const userData = req.body;

    // Validate the user data
    const valid = validate(userData);

    if (!valid) {
        return res.status(400).json({ errors: validate.errors });
    }

    // Read existing users from the file
    let users = [];
    if (fs.existsSync(usersFilePath)) {
        const fileData = fs.readFileSync(usersFilePath, 'utf-8');
        users = JSON.parse(fileData);
    }

    // Check if the email already exists
    if (users.some(user => user.email === userData.email)) {
        return res.status(400).json({ error: 'Email already exists' });
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

    const {password, ...userWithoutPassword} = newUser;

    res.status(201).json(userWithoutPassword);
};