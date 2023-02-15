var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const userDao = require('./models/user-dao.js');
const passport = require('passport'); // auth middleware
const moment = require('moment');
const LocalStrategy = require('passport-local').Strategy; // username and password for login
const session = require('express-session');

// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
  function(username, password, done) {
    userDao.getUser(username, password).then(({user, check}) => {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!check) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
));

// serialize and de-serialize the user (user object <-> session)
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  userDao.getUserById(id).then(user => {
    done(null, user);
  });
});

var homeRouter = require('./routes/home');
var unipolRentalRouter = require('./routes/unipolrental');
var unipolRentalCollaboratoriRouter = require('./routes/unipolrentalcollaboratori');
var notizieRouter = require('./routes/notizie');
var notizieCollaboratoriRouter = require('./routes/notiziecollaboratori');
var loginRouter = require('./routes/login');

let app = express();

// set up the session
app.use(session({
  secret: 'a secret sentence not to share with anybody and anywhere, used to sign the session ID cookie',
  resave: false,
  saveUninitialized: false 
}));

// init passport
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {
  app.locals.moment = moment;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', homeRouter);
app.use('/unipolrental', unipolRentalRouter);
app.use('/unipolrentalCollaboratori', unipolRentalCollaboratoriRouter);
app.use('/notizie', notizieRouter);
app.use('/notizieCollaboratori', notizieCollaboratoriRouter);
app.use('/loginCollaboratori', loginRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
