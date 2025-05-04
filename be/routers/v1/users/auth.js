const fs = require('fs');
const path = require('path');

const sessionsFilePath = path.join(__dirname, '../../../data/sessions.json');

module.exports = (req, res, next) => {
    const sessionId = req.header('Session');

    if (!sessionId) {
        return res.status(400).json({ error: 'Session header is missing' });
    }

    // Read existing sessions from the file
    let sessions = [];
    if (fs.existsSync(sessionsFilePath)) {
        const fileData = fs.readFileSync(sessionsFilePath, 'utf-8');
        sessions = JSON.parse(fileData);
    }

    // Find the session
    const session = sessions.find(s => s.sessionId === sessionId);

    if (!session) {
        return res.status(401).json({ error: 'Invalid session' });
    }

    // Add the user ID to the request
    req.headers.userId = session.userId;
    req.body.additionalData = {userId: session.userId};

    next();
};