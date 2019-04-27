import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {type: String, required: true},
    username: String
})

const bookModel = mongoose.model('book', bookSchema);

export default bookModel;