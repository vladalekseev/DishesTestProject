import passport from 'passport';
import passportConf from '../middlewares/passport';

export const passportJWT =  passport.authenticate('jwt', { session: false });
export const passportGoogle =  passport.authenticate('google-token', { session: false });
export const passportFacebook =  passport.authenticate('facebook-token', { session: false });
export const passportInstagram =  passport.authenticate('instagram-token', { session: false });
