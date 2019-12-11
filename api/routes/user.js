const express = require("express")
const User = require("../../models/user");
const router = express.Router();
var bcrypt = require('bcrypt');

router.post('/insert', (req, res, next) => {
    User.findOne({
        'userName': req.body.userName
    })
        .exec()
        .then(user => {
            if (user) {
                return res.status(409).json({
                    status: 409,
                    message: "Username was duplicated. Please change your username."
                })
            } else {
                bcrypt.hash(req.body.password, 12, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            userName: req.body.userName,
                            password: hash
                        })
                        user
                            .save()
                        res.status(200).json({
                            status: 200,
                            message: "Success."
                        })
                    }
                })
            }
        })
});

router.post('/searchAll', (req, res, next) => {
    User.find({})
        .select('-__v')
        .select('-password')
        .exec()
        .then(user => {
            res.status(200).json({
                status: 200,
                message: "Success.",
                listUser: user
            })

        })
});

module.exports = router;