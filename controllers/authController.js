// controllers/authController.js
const authService = require('../services/authService');

exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await authService.registerUser(username, password);
        res.status(201).json({ message: "User registered", userId: user._id });
    } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const token = await authService.loginUser(username, password);
        res.json({ token });
    } catch (err) {
        res.status(401);
        next(err);
    }
};