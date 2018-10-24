import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bluebird from 'bluebird';

import { Mockgoose } from 'mockgoose-fix';
const mockgoose = new Mockgoose(mongoose);

import config from './config';
import authRouter from './routes/auth';
import menuRouter from './routes/dishes';
import orderRouter from './routes/order';
import userRouter from './routes/user';
import errorHandler from './middlewares/errorHandler';

const app = express();

mongoose.Promise = bluebird;

if (process.env.NODE_ENV === 'test') {
    mockgoose.prepareStorage()
        .then(() => {
            mongoose.connect(config.database, { useMongoClient: true });
        });
} else {
    mongoose.connect(config.database, { useMongoClient: true });
}

const server = app.listen(config.port, () => {
   console.log(`server is listening on the port ${config.port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', menuRouter);
app.use('/api', authRouter);
app.use('/api', orderRouter);
app.use('/api', userRouter);

app.use(errorHandler);

export default server;
