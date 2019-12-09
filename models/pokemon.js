const mongoose = require('mongoose');

const pokemonSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    imageUrl: String,
    imageUrlHiRes: String,
    hp: String
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
