const mongoose = require('mongoose');

const pokemonSchema = mongoose.Schema({
    id: { type: String, require: true },
    name: String,
    nationalPokedexNumber: Number,
    imageUrl: String,
    imageUrlHiRes: String,
    supertype: String,
    subtype: String,
    ability: {
        name: { type: String },
        text: { type: String },
        type: { type: String }
    },
    hp: String,
    retreatCost: [String],
    convertedRetreatCost: Number,
    number: String,
    artist: String,
    rarity: String,
    series: String,
    set: String,
    setCode: String,
    text: [String],
    artist: String,
    attacks: [{
        cost: [String],
        name: String,
        text: String,
        damage: String,
        convertedEnergyCost: Number
    }],
    weaknesses: [{
        type: { type: String },
        value: { type: String }
    }],
    type: String
});

module.exports = mongoose.model('Pokemon', pokemonSchema);
