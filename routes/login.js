var express = require('express');
var router = express.Router();
const passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'login dipendenti'});
});

router.post('/sessions', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err) }
      if (!user) {
          // display wrong login messages
          return res.status(401).json(info);
      }
      // success, perform the login
      req.login(user, function(err) {
        if (err) { return next(err); }
        if(user.tipo == "N")
          res.redirect('/notiziecollaboratori');
        else if(user.tipo == "U")
          res.redirect('/unipolrentalcollaboratori');
      });
  })(req, res, next);
});

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;