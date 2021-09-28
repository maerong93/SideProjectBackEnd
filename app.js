const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpec = require('./src/swagger/swagger-main');
const fs = require('fs');
require('dotenv').config();

const dir = process.env.FILE_PATH; // 내컴 폴더 경로
const dirItem = process.env.FILE_ITEM_PATH; // 내컴 item 폴더 경로

// data 최상위 폴더 생성
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}
// item 폴더 생성
if (!fs.existsSync(dirItem)) {
  fs.mkdirSync(dirItem);
}


const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const usersRouter = require('./src/routes/user-router');
const cors = require('cors');


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(cors());
app.use('/', indexRouter);
app.use('/api/user', usersRouter);



const swaggerUISetup = swaggerJsdoc(swaggerSpec.swaggerOption);
app.use('/api-docs/', swaggerUI.serve, swaggerUI.setup(swaggerUISetup));


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
