var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var fs = require('fs');
var session = require('express-session')
const cheerio = require('cheerio');
var html = require("express-handlebars");
var cors = require('cors')
var productRouter = require('./server/routes/productRoute');
var shoppingCartRouter = require('./server/routes/shoppingcartRoute');
var userRouter = require('./server/routes/userRoute');
var contactRouter = require('./server/routes/contactRoute');
var passport = require('passport');
var BearerStrategy = require('passport-http-bearer').Strategy;
var DBSERVICES = require('./server/services/db.services');

var app = express();
// var pathViews = path.join(__dirname, 'server', 'views')
app.engine('html', html({
  extname: 'html',
  defaultLayout: 'layout',
}));
app.set('view engine', 'html');

var sess = {
  secret: 'YZ5MQGYRCpe5mtGy',
  resave: false,
  saveUninitialized: true,
  name: 'loco',
  cookie: {
    maxAge: 3600000 * 12
  }
}

app.set('port', (process.env.PORT || 5000));


if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sess.cookie.secure = true // serve secure cookies
}

function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

if (app.get('env') === 'production') {
  app.use(requireHTTPS);
}

var corsOptions = {
  origin: true,
  credentials: true

}

passport.use(new BearerStrategy(
  function (token, done) {
    DBSERVICES.checkToken(token)
      .then(results => {
        if (results) {
          return done(null, results, {
            scope: 'all'
          });
        } else {
          return done(null, false);
        }
      })
      .catch(err => {
        if (err) {
          return done(err);
        }
      });

  }
));

// app.use(forceSSL());
app.set('trust proxy', true)
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist'), {
  index: false
})); 
app.use(session(sess))
app.disable('x-powered-by')

app.use('/product/api',productRouter);
app.use('/shoppingcart/api',shoppingCartRouter);
app.use('/users/api',userRouter);
app.use('/contact/api',contactRouter);

app.get('/*', function (req, res) {
  req.session.token = req.session.cookie;
 // var flavorData = modules.checkFlavor(req);
  var html = fs.readFileSync(path.join(__dirname, 'dist/index.html'), 'utf8');

  var $ = cheerio.load(html);

  res.send($.html());
});


app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

module.exports = app;