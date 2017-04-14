var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var busboyBodyParser = require('busboy-body-parser');
var hbs = require('express-handlebars');
//////////// pic upload /////////////////////////////////////////////
/*
var multer = require('multer');
var upload = multer({
    dest: 'uploads/'
});
var storage = multer.diskStorage({
  destination: function(req,file,cb){
    cb(null,'public/uploads/')
  },
  filename: function(req, res ,cb){
    cb(null,Date.now() + file.originalname);
  }
});
*/
//////////////////////////////////////////////////////////////////////
/*
app.post('/photos/upload', upload.array('photos', 12), function(req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
})

/////////////////////////////////////////////////////////////////////
//////////////////////////// multer gridFs //////////////////////////
/////////////////////////////////////////////////////////////////////
var Grid = require('gridfs-stream');
var mongo = require('mongodb');
var GridFsStorage = require('multer-gridfs-storage');
*/

/////////////////////////////////////////////////////////////////////
var dbConfig = require('./db');
var mongoose = require('mongoose');
// Connect to DB
mongoose.connect(dbConfig.url);

var app = express();
app.use(busboyBodyParser());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
    );
    if ('OPTIONS' === req.method) {
        res.status(200).end();
    } else {
        next();
    }
});

// view engine setup
/*app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');*/
// hbs engine
app.engine('hbs', hbs({
    extname: 'hbs',
    layoutsDir: __dirname + '/views'
}));
app.set('views', 'views');
app.set('view engine', 'hbs');
//html engine
//app.engine('html', path.join(__dirname, 'views');
//app.set('view engine', 'html');
/*es6Renderer*/
/*app.engine('html', es6Renderer);
app.set('views', 'views');
app.set('view engine', 'html');*/

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring Passport
var passport = require('passport');
var expressSession = require('express-session');
// TODO - Why Do we need this key ?
app.use(expressSession({
    secret: 'mySecretKey'
}));
app.use(passport.initialize());
app.use(passport.session());

// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
var flash = require('connect-flash');
app.use(flash());

// Initialize Passport
var initPassport = require('./passport/init');
initPassport(passport);

var routes = require('./routes/index')(passport);
app.use('/', routes);

require('./routes/addUser.route')(app);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

module.exports = app;
app.listen(3000);
console.log('server running on port 3000....');
