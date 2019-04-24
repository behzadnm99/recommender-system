import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: false},
    genre: String,
    wriiter: String,
    description: String,
    hash: String,
    salt: String,
    email: String
})

userSchema.methods.setPassword = function(password) {
    console.log("this ", this)
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
    expirationDate.setDate(today.getDate() + 60);
  
    return jwt.sign({
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
}

userSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
    };
}


const userModel = mongoose.model('user', userSchema);
export default userModel;