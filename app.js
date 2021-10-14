const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const config = require('./src/config/config')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerSpec = require('./src/swagger/swagger-main');
const fs = require('fs');
require('dotenv').config();
const fileUrl = require('./src/config/config').fileUrl;


//console.log(config);

// data 최상위 폴더 생성
if (!fs.existsSync(config.filePath.root)) {
  fs.mkdirSync(config.filePath.root);
}
// item 폴더 생성
if (!fs.existsSync(config.filePath.item)) {
  fs.mkdirSync(config.filePath.item);
}

// session 폴더 생성
if (!fs.existsSync(config.filePath.session)) {
  fs.mkdirSync(config.filePath.session);
}


const indexRouter = require('./routes/index');
const usersRouter = require('./src/routes/user-router');
const ItemRouter = require('./src/routes/item-router');
const cartRouter = require('./src/routes/cart-router');
const OrderRouter = require('./src/routes/order-router');
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
app.use('/data/item', express.static(path.join(__dirname, 'data/item'))); 

// fileUrl 설정 (ㅡ.ㅡ URL 이쁘게 구해주는건 없나???? ...)
app.all("*", (req, res, next) => {
  //console.log(req.get('host'));
  fileUrl.root = req.protocol+'://'+req.get('host')+'/data';
  fileUrl.item = req.protocol+'://'+req.get('host')+'/data/item';
  fileUrl.session = req.protocol+'://'+req.get('host')+'/data/session';
  next();
});
app.use(cors(config.corsOptions));
const sessionConfig = config.ConfigSession;
const ConfigFileStore = config.ConfigFileStore;

app.use(session({
  secret : sessionConfig.secret,
  resave : sessionConfig.resave,
  saveUninitialized : sessionConfig.saveUninitialized,
  store : new FileStore({
    path: ConfigFileStore.path
  })
}))

app.use('/', indexRouter);
app.use('/api/user', usersRouter);
app.use('/api/item', ItemRouter);
app.use('/api/cart', cartRouter); 
app.use('/api/order', OrderRouter);



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
