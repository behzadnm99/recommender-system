import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: {type: String, required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    movieId: {type: Schema.Types.ObjectId, ref: 'movie'},
    bookId: {type: Schema.Types.ObjectId, ref: 'book'}
})

const commentModel = mongoose.model('comment', commentSchema);

export default commentModel;