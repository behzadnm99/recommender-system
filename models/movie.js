import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {type: String, required: true},
    stars: Number,
    genres: [{type: Schema.Types.ObjectId, ref: 'genre'}],
    imdb: Number,
    year: Number,
    description: String,
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}]
})

const movieModel = mongoose.model('movie', movieSchema);

export default movieModel;