import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {type: String, required: true},
    stars: Number,
    genre: String,
    imdb: Number,
    year: Number,
    description: String
})

const movieModel = mongoose.Model('movie', movieSchema);

export default movieModel;