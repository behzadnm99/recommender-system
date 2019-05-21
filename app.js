import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import multipart from 'connect-multiparty';
import session from 'express-session';
import cors from 'cors';
import expressValidator from 'express-validator';

import config from './consts';

import connctToDb from './config/connect'

import './models/user';
import './config/passport'
import './config/minio';

const app = express();
const multipartMiddleware = multipart();

// config app
app.use(cors());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use(require('./routes'));

connctToDb()

app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT}`);
});