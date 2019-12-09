const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const logger = require("morgan")
const mongoose = require("mongoose");

const Pokemon = require("../../models/pokemon");
const router = express.Router();


router.post('/insert', (req, res, next) => {
    console.log(req.body);
    const pokemon = new Pokemon({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        imageUrlHiRes: req.body.imageUrlHiRes,
        hp: req.body.hp
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

module.exports = router;