const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const createSessionByUserId = require('../../../dao/v1/session/create');
const createUser = require('../../../dao/v1/user/create');

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

// Exported function to handle user creation
module.exports = (req, res) => {
    const userData = req.body;

    // Validate the user data
    const valid = validate(userData);

    if (!valid) {
        return res.status(400).json({ error: validate.errors });
    }

    const newUser = createUser(userData);
    if (!newUser) {
        return res.status(409).json({ error: 'User with this email already exists' });
    }

    const session = createSessionByUserId(newUser.id);

    const {password, ...userWithoutPassword} = newUser;

    res.status(200).json({user: userWithoutPassword, session: session});
};