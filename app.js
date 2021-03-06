var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const assert = require("assert")

var hbs = require('express-handlebars');

var cassandra = require('cassandra-driver');

var routes = require('./routes/index');
var create = require('./routes/create');

var app = express();

var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'mentor' });

client.connect(function(err, result) {
    console.log('cassandra connected');
});

app.listen(5000);

app.engine('hbs', hbs({ extname: 'hbs', defaultLayout: 'layout', layoutDir: __dirname + '/views/layouts/' }))
    // view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/create', create);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const port = 5001

app.listen(port, (err) => {
    assert.ifError(err)
    console.log("server started on port " + port)
});
