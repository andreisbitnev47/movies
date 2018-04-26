const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    actors: [{type: Schema.Types.ObjectId, ref: 'Actor'}]
});

module.exports = mongoose.model('Movie', MovieSchema);