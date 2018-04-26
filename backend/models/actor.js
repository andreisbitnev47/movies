const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    name: { type: String, required: true },
    age: { type: String }
});

module.exports = mongoose.model('Actor', MovieSchema);