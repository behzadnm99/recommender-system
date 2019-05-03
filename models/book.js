import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    writer: {type: String, required: true},
    stars: {type: Number, required: true},
    translator: String,
    year: Number,
    genres: [{type: Schema.Types.ObjectId, ref: 'genre'}],
});

const bookModel = mongoose.model('book', bookSchema);

export default bookModel;