const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name: { type: String, required: true },
    age: { type: String },
    movies: [{type: Schema.Types.ObjectId, ref: 'Movie'}]
});

module.exports = mongoose.model('Actor', MovieSchema);