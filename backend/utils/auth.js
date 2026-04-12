const jwt = require('jsonwebtoken');

const getUser = (token) => {
    if (!token) return null;

    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return null;
    }
};

module.exports = getUser;