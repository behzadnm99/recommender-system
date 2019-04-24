import mongoose from 'mongoose';
import config from '../consts';

mongoose.Promise = global.Promise;

const connectToDb = async () => {
    try {
        await mongoose.connect(config.mongoUrl, { useNewUrlParser: true });
        console.log('connected to db')
    }
    catch (err) {
      console.log(err);
    }
}

export default connectToDb;