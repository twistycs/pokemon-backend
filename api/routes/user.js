const express = require("express")
const User = require("../../models/user");
const router = express.Router();


router.post('/insert', (req, res, next) => {
    console.log(req.body);
    User.findOne({
        'userName': req.body.userName
    })
        .exec()
        .then(user => {
            if (user) {
                return res.status(409).json({
                    message: "Username was duplicated. Please change your username."
                })
            } else {
                const user = new User({
                    userName: req.body.userName,
                    password: req.body.password
                })
                user
                    .save()
                    .then(result => {
                        console.log(result)
                    })
                    .catch(err => console.log(err));
                res.status(200).json({
                    createdUser: user
                })
            }
        })
});

module.exports = router;