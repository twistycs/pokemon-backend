const express = require("express")
const Trainer = require("../../models/trainer");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;


router.post('/insert', (req, res, next) => {
    Trainer.findOne({
        'fkUser': req.body.fkUser,
        'fkPokemon': req.body.fkPokemon
    }).exec()
        .then(trainer => {
            if (trainer) {
                return res.status(409).json({
                    status: 409,
                    message: "Pokemon was in your pokedex."
                })
            } else {
                const trainer = new Trainer({
                    fkUser: req.body.fkUser,
                    fkPokemon: req.body.fkPokemon
                })
                trainer
                    .save()
                    .then(result => {
                        res.status(200).json({
                            status: 200,
                            message: "Success"
                        })
                    })
                    .catch(err => console.log(err));
            }
        })
});

router.post('/:userId', (req, res, next) => {
    console.log(req.params.userId);
    Trainer.aggregate(
        [{
            $match: {
                fkUser: req.params.userId
            },
        },
        {
            $lookup: {
                from: "pokemons",
                localField: "fkPokemon",
                foreignField: "id",
                "as": "result"
            }
        },
        {
            $unwind: "$result"
        }])
        .exec()
        .then(trainer => {
            console.log(trainer);
            if (!trainer) {
                return res.status(404).json({
                    message: "No Trainer."
                })
            }
            res.status(200).json(trainer)
        })
});

module.exports = router;