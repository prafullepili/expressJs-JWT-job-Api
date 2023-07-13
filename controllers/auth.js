const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')

const register = async (req, res, next) => {
    const user = await User.create({ ...req.body })
    // const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", { expiresIn: '30d' }) //create User model method just like Django in User.js
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    res.send('login user')
}


module.exports = {
    register,
    login
}