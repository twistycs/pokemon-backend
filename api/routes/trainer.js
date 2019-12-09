const express = require("express")
const Trainer = require("../../models/trainer");
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;


router.post('/insert', (req, res, next) => {
    console.log(req.body);
    const trainer = new Trainer({
        fkUser: req.body.fkUser,
        fkPokemon: req.body.fkPokemon
    })
    trainer
        .save()
        .then(result => {
            console.log(result)
        })
        .catch(err => console.log(err));
    res.status(200).json({
        createdTrainer: trainer
    })
});

router.get('/:userId', (req, res, next) => {
    console.log(req.params.userId);
    Trainer.find({ 'fkUser': req.params.userId })
        .exec()
        .then(trainer => {
            if (!trainer) {
                return res.status(404).json({
                    message: "No Trainer."
                })
            }
            res.status(200).json(trainer)
        })
});

module.exports = router;