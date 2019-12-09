const mongoose = require('mongoose');

const trainerSchema = mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    fkUser: String,
    fkPokemon: String,
});

module.exports = mongoose.model('Trainer', trainerSchema);
