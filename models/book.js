import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    writer: String,
    translator: String,
    year: Number,
    genres: [{type: Schema.Types.ObjectId, ref: 'genre'}],
    stars: Number,
})

const bookModel = mongoose.model('book', bookSchema);

export default bookModel;