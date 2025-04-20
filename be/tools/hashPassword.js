const crypto = require("crypto");

module.exports = function hashPassword(password) {
    return crypto.createHash('sha512').update(password).digest('hex');
}