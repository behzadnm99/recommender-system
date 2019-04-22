import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import config from './consts';

import bookRouter from './routes/book';
import movieRouter from './routes/movie'
import userRouter from './routes/user'
import connctToDb from './db/connect'

const app = express();

app.use(morgan('tiny'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', bookRouter);
app.use('/api/v1', movieRouter);
app.use('/api/v1', userRouter);

connctToDb()

app.listen(config.PORT, () => {
  console.log(`server running on port ${config.PORT}`);
});

module.exports = app;