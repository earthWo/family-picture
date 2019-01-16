var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var picturegroupRouter = require('./routes/picturegroup');
var usersRouter = require('./routes/users');
var picturesRouter = require('./routes/picture');

var app = express();


var db=require('./public/javascripts/db/db_connection.js');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/picturegroup', picturegroupRouter);
app.use('/users', usersRouter);
app.use('/picture', picturesRouter);

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



//监听端口
var server = app.listen(8081, function () {

    console.log('开始服务');
    db.connect();
})

module.exports = app;
