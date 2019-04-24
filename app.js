import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';

import config from './consts';

// import bookRouter from './routes/book';
// import movieRouter from './routes/movie'
// import userRouter from './routes/user'
import connctToDb from './config/connect'

import './models/user';
import './config/passport'

const app = express();

app.use(cors());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/api/v1', bookRouter);
// app.use('/api/v1', movieRouter);
app.use(require('./routes'));

connctToDb()

app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT}`);
});

module.exports = app;