const express = require("express")
const User = require("../../models/user");
const router = express.Router();

router.get('/', (req, res, next) => {
    User.find({
        'userName': req.body.userName,
        'password': req.body.password
    })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "No User."
                })
            }
            res.status(200).json({
                status: "200"
            })
        })
});

module.exports = router;