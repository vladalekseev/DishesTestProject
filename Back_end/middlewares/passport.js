import passport from 'passport';
import JStrategy, { ExtractJwt } from 'passport-jwt';
import GooglePlusTokenStrategy from 'passport-google-plus-token';
import FacebookTokenStrategy from 'passport-facebook-token';
import InstagramTokenStrategy from 'passport-instagram-token';
import User from '../models/user';
import config from '../config';

const JwtStrategy = JStrategy.Strategy;

const options = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

// JWT Strategy
passport.use(new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);

        if(!user)
            return done(null, false);

        done(null, user);

    } catch(err) {
        done(err, false)
    }
}));

// Google OAuth Strategy
passport.use('google-token', new GooglePlusTokenStrategy(config.oauth.google, async (accessToken, refreshToken, profile, done) => {
    await socialConf('google', accessToken, refreshToken, profile, done);
}));

// Facebook OAuth Strategy
passport.use(new FacebookTokenStrategy(config.oauth.facebook, async (accessToken, refreshToken, profile, done) => {
    await socialConf('facebook', accessToken, refreshToken, profile, done);
}));

//Instagram OAuth Strategy
passport.use('instagram-token', new InstagramTokenStrategy(config.oauth.instagram, async (accessToken, refreshToken, profile, done) => {
    await socialConf('instagram', accessToken, refreshToken, profile, done);
}));

// Common social config
const socialConf = async (network, accessToken, refreshToken, profile, done) => {
    try {
        const existingUser = await User.findOne({ socialID: profile.id });

        if (existingUser)
            return done(null, existingUser);

        const newUser = await User.create({
            method: network,
            displayName: profile.username || profile.emails[0].value,
            socialID: profile.id
        });

        done(null, newUser);
    } catch(err) {
        done(err, false, err.message);
    }
};
