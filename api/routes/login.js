const express = require("express")
const User = require("../../models/user");
const router = express.Router();

router.get('/', (req, res, next) => {
    console.log(req.body.userName);
    console.log(req.body.password);
    User.findOne({
        'userName': req.body.userName,
        'password': req.body.password
    })
        .exec()
        .then(user => {
            console.log(user);
            if (!user) {
                return res.status(404).json({
                    message: "No User. "
                })
            }
            res.status(200).json({
                status: 200,
                message: "Success."
            })
        })
});

module.exports = router;