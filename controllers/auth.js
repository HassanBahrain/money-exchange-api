
const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('../lib/passportConfig')





exports.auth_signin_get = (req, res) => {
    res.render('auth/signin');
}

exports.auth_signup_post = (req, res) => {
    let user = new User(req.body);
     
    let hash = bcrypt.hashSync(req.body.password, 10)
    

    user.password = hash;

    user.save()
    .then(() => {
        res.redirect('/auth/signin')
    })
    .catch(err => {
        console.log(err)
        res.send('Something went wrong')
    })
}



exports.auth_signin_post = passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect: '/auth/signin'
})

exports.auth_signout_get =(req, res) => {
    req.logout(function(err){
      if(err){
          return next(err)
      }
      res.redirect('/auth/signin');
    }) 
  
}