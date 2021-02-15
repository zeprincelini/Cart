const passport =  require('passport');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, doc) => {
        done(err, doc);
    });
});

passport.use('local.signup', new LocalStrategy({
   usernameField: 'email',
   passwordField: 'password',
   passReqToCallback: true
}, function(req, email, password, done){
    User.findOne({'email': email}, (err, doc) => {
        if(err){
            return done(err)
        }
       if(doc){
           return done(null, false, {message: 'Email already in use!'});
       }
       bcrypt.hash(password, 10).then((hash) => {
        let newUser = new User();
        newUser.email = email;
        newUser.password = hash;
        newUser.save((err, doc) => {
            if(err){
                return done(err);
            }
            return done(null, newUser)
        });

       })
    })
}))

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({'email': email}, (err, doc) => {
        if(err){
            return done(err)
        }
       if(!doc){
           return done(null, false, {message: 'No User Found!'});
       }
       bcrypt.compare(password, doc.password, function(err, result){
           if(err || !result){
            return done(null, false, {message: 'Wrong Password'});
           }
            console.log("password: ", password);
            console.log("doc password: ", doc.password);
           return done(null, doc);
       })
    })
}))
