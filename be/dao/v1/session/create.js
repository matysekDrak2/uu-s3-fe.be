const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');

const sessionsFilePath = path.join(__dirname, '../../../data/sessions.json');

/**
 * @param {uuidv4} userId
 * @returns {Object<id: uuidv4, userId: uuidv4, createdAt: ISOString>} session
 * */
module.exports = function createSessionByUserId(userId){
    // Generate a session token (for simplicity, using user ID as the token)
    const sessionId = uuidv4();
    const session = {
        sessionId,
        userId: userId,
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
    return session;
}