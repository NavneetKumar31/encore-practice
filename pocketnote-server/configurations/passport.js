const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user-model');
const dbConfig = require('./database');
const decryptJS = require('../encdec/decrypt');

module.exports = function (passport) {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = dbConfig.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.find({
            _id: jwt_payload.data._id
        }).exec().then(docs => {
            if (docs.length < 1) {
                return done(err, false);
            }
            return done(null, docs[0]);
        });
    }));
}