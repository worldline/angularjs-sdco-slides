var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/views')));

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err);
    res.render('pages/error', {
        message: err.message,
        error: err
    });
});



/*app.get('/partials/:name', routes.partials);*/
var port= 3000;
app.listen(port);
console.log('listen port ' + port);

module.exports = app;

