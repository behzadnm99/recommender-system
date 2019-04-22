import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {type: String, required: true}
})

const bookModel = mongoose.Model('book', bookSchema);

export default bookModel;