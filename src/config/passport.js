var LocalStrategy   = require('passport-local').Strategy;
var User       		= require('../models/user');
var common          = require('../libs/common');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        User.findOne({ '_id' :  user._id }, function(err, user) {
            done(err, user);
        });
    });

    passport.use('local-login-admin', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        
        User.findOne({ 'local.email' :  email }, function(err, user) {

            if (err)
                return done(common.getErrorObj("query_failed"));

            if (!user)
                return done(null, false, common.getErrorObj("user_not_found"));

            if (!user.validPassword(password))
                return done(null, false, common.getErrorObj("invalid_password"));

            return done(null, user);
        });

    }));

    passport.use('local-login-client', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'cpf',
            passReqToCallback : true
        },
        function(req, email, cpf, done) {

            User.findOne({ 'local.email' :  email }, function(err, user) {

                if (err)
                    return done(common.getErrorObj("query_failed"));

                if (!user)
                    return done(null, false, common.getErrorObj("user_not_found"));

                if (!user.validCpf(cpf))
                    return done(null, false, common.getErrorObj("invalid_cpf"));

                return done(null, user);
            });

        }));
};
