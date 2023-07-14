const User = require('../models/User');
const jwt = require('jsonwebtoken')
const { UnauthenticatedError } = require('../errors')


const auth = async (req, res, next) => {
    //check header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthenticatedError("auth token missing..")
    }
    const token = authHeader.split(" ")[1];
    if (!token.trim()) {
        throw new UnauthenticatedError('auth token missing..');
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    //attach the user to the job routes
    const user = await User.findById(payload.userId).select('-password')
    if (!user) {
        throw new UnauthenticatedError('Authentication invalid or token expired');
    }
    req.user = { userId: user._id, name: user.name }
    next();
}

module.exports = auth