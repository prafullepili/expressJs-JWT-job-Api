const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')
const { BadRequestError } = require('../errors')
const jwt = require('jsonwebtoken')

const register = async (req, res, next) => {
    const user = await User.create({ ...req.body })
    console.log(user.name)
    const token = jwt.sign({ userId: user._id, name: user.name }, "jwtSecret", { expiresIn: '30d' })

    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })
}

const login = async (req, res) => {
    res.send('login user')
}


module.exports = {
    register,
    login
}