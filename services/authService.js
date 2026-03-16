// services/authService.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config/constants');

const registerUser = async (username, password) => {
    const user = new User({ username, password });
    return await user.save();
};

const loginUser = async (username, password) => {
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
        return jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    }
    throw new Error('Invalid credentials');
};

module.exports = { registerUser, loginUser };