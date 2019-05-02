import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, required: true},
    bio: String,
    hash: String,
    salt: String,
    email: String,
    books: [{type: Schema.Types.ObjectId, ref: 'book' }],
    movies: [{type: Schema.Types.ObjectId, ref: 'movie'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
})

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 90);
  
    return jwt.sign({
      username: this.username,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

userSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        username: this.username,
        token: this.generateJWT(),
    };
}


const userModel = mongoose.model('user', userSchema);
export default userModel;