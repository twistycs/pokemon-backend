const express = require("express")
const User = require("../../models/user");
const router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    User.findOne({
        'userName': req.body.userName,
    })
        .exec()
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "No User. "
                })
            } else {
                bcrypt.compare(req.body.password, user.password, function (err, result) {
                    if (err) {
                        res.status(401).json({
                            status: 401,
                            message: "Auth Fail."
                        })
                    }
                    if (result) {
                        const token = jwt.sign({
                            userName: user.userName
                        },
                            "secret",
                            {
                                expiresIn: "1h"
                            }
                        )
                        return res.status(200).json({
                            status: 200,
                            message: "Success.",
                            token: token
                        })
                    }
                    res.status(401).json({
                        status: 401,
                        message: "Auth Fail."
                    })
                });
            }

        })
});

const verifyToken = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized Request');
    }
    let token = req.headers.authorization.split(' ')[1];
    if (token === null) {
        return res.status(401).send('Unauthorized Request');
    }
    let payload = jwt.verify(token, 'secretKey');
    if (!payload) {
        return res.status(401).send('Unauthorized Request');
    }
    req.userId = payload.subject;
    next();
}


module.exports = router;