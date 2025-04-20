const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const { v4: uuidv4 } = require('uuid');
const hashPassword = require('../../../tools/hashPassword');

const ajv = new Ajv();

// Define the schema for login validation
const loginSchema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }
    },
    required: ['email', 'password'],
    additionalProperties: false
};
const validate = ajv.compile(loginSchema);

// Path to the users data file
const usersFilePath = path.join(__dirname, '../../../data/users.json');
const sessionsFilePath = path.join(__dirname, '../../../data/sessions.json');

// Exported function to handle user login
module.exports = (req, res) => {
    const loginData = req.body;

    // Validate the login data
    const valid = validate(loginData);

    if (!valid) {
        return res.status(400).json({ errors: validate.errors });
    }

    // Read existing users from the file
    let users = [];
    if (fs.existsSync(usersFilePath)) {
        const fileData = fs.readFileSync(usersFilePath, 'utf-8');
        users = JSON.parse(fileData);
    }

    // Find the user with the provided email
    const user = users.find(u => u.email === loginData.email);

    if (!user || user.password !== hashPassword(loginData.password)) {
        return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate a session token (for simplicity, using user ID as the token)
    const sessionId = uuidv4();
    const session = {
        sessionId,
        userId: user.id,
        createdAt: new Date().toISOString()
    };

    // Read existing sessions from the file
    let sessions = [];
    if (fs.existsSync(sessionsFilePath)) {
        const fileData = fs.readFileSync(sessionsFilePath, 'utf-8');
        sessions = JSON.parse(fileData);
    }
    // Add the new session
    sessions.push(session);

    // Save the updated sessions list to the file
    fs.writeFileSync(sessionsFilePath, JSON.stringify(sessions, null, 2));

    // Exclude the password from the response
    const { password, ...userWithoutPassword } = user;

    res.status(200).json({user: userWithoutPassword, session: session});
};