import jwt from 'jsonwebtoken';
import config from '../config';
import User from '../models/user';

const signToken = _id => {
    return jwt.sign({
        sub: _id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, config.secret);
};

export const logIn = (req, res, next) => {
    const { login, password } = req.body;

    User.findOne({ login: login })
        .then((user) => {
            if(!user)
                throw { status: 404, message: 'User not found' };

            if(!user.comparePasswords(password))
                throw { status: 400, message: 'Bad credentials' };

            res.json({ login: user.login, token: signToken(user._id) });
        })
        .catch(err => next(err));
};

export const signUp = async (req, res, next) => {
    const credentials = req.body;

    const existingUser = await User.findOne({ login: credentials.login });

    if (existingUser)
        return next({ status: 400, message: 'User with the same login already exists' });

    User.create({
        method: 'local',
        login: credentials.login,
        password: credentials.password
    })
        .then(user => {
            res.json(signToken(user));
        })
        .catch(err => next(err))
};

export const socialAuth = (req, res) => {
    const user = req.user;

    const token = signToken(user._id);
    res.json({ login: user.displayName, token });
};
