import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {type: String, required: true}
})

const userModel = mongoose.Model('user', userSchema);

export default userModel;