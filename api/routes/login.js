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
                                expiresIn: "30s"
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

router.get('/username', verifyToken, (req, res, next) => {
    return res.status(200).json(decodedToken.userName);
})

let decodedToken = '';
const verifyToken = (req, res, next) => {
    let token = req.query.token;

    jwt.verify(token, 'secret', (err, tokendata) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized Request"
            });
        }
        if (tokendata) {
            decodedToken = tokendata;
            next();
        }
    })

}


module.exports = router;