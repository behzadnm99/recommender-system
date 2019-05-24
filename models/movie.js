import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {type: String, required: true},
    stars: {type:Number, required: true},
    description: {type: String, required: true},
    imdb: Number,
    year: Number,
    genres: [{type: Schema.Types.ObjectId, ref: 'genre'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'comment'}],
    coverName: String
}, {timestamps: true})

const movieModel = mongoose.model('movie', movieSchema);

export default movieModel;