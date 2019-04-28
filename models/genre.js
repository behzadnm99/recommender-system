import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const genreSchema = new Schema({
    context: {type: String, required: true},
})

const genreModel = mongoose.model('genre', genreSchema);

export default genreModel;