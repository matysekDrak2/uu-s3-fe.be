const users = require('../../../data/users');

module.exports = function getAllUsers(req, res) {
    try {
        const usersWithoutPasswords = users.map(user => {
            const { password, ...userWithoutPassword } = user; // Exclude the password field
            return userWithoutPassword;
        });
        res.status(200).json(usersWithoutPasswords);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

