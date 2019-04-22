import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    name: {type: String, required: true}
})

const movieModel = mongoose.Model('movie', movieSchema);

export default movieModel;