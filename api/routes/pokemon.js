const express = require("express")
const Pokemon = require("../../models/pokemon");
const router = express.Router();


router.post('/insert', (req, res, next) => {
    console.log(req.body);
    const pokemon = new Pokemon({
        id: req.body.id,
        name: req.body.name,
        nationalPokedexNumber: req.body.nationalPokedexNumber,
        imageUrl: req.body.imageUrl,
        imageUrlHiRes: req.body.imageUrlHiRes,
        supertype: req.body.supertype,
        subtype: req.body.subtype,
        ability: req.body.ability,
        hp: req.body.hp,
        retreatCost: req.body.retreatCost,
        convertedRetreatCost: req.body.convertedRetreatCost,
        number: req.body.number,
        artist: req.body.artist,
        rarity: req.body.rarity,
        series: req.body.series,
        set: req.body.set,
        setCode: req.body.setCode,
        text: req.body.text,
        artist: req.body.artist,
        attacks: req.body.attacks,
        weaknesses: req.body.weaknesses,
        type: req.body.type,
    })
    pokemon
        .save()
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err));
    res.status(200).json({
        createdPokemon: pokemon
    })
});

router.get('/findAll', (req, res, next) => {
    Pokemon.find()
        .exec()
        .then(pokemon => {
            if (!pokemon) {
                return res.status(404).json({
                    message: "No Pokemon."
                })
            }
            res.status(200).json(pokemon)
        })
});

router.get('/:id', (req, res, next) => {
    Pokemon.findOne({ _id: req.params.id })
        .exec()
        .then(pokemon => {
            if (!pokemon) {
                return res.status(404).json({
                    message: "No Pokemon."
                })
            }
            res.status(200).json(pokemon)
        })
});

module.exports = router;