var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


router.post('/signup', (req, res) => {
    
    var firstName = req.body.user.firstName;
    var lastName = req.body.user.lastName;
    var username = req.body.user.username;
    var email = req.body.user.email;
    var pass = req.body.user.password;

    User.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        passwordhash: bcrypt.hashSync(pass,10)
    })
    .then(
        createSuccess = (user) => {
            var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
            res.json({
                user: user,
                message: "user created",
                sessionToken: token
            });
        },
        createError = err => res.send(500, err)
    )
});
router.post('/signin', (req, res) => {
    User.findOne( { where: { username: req.body.user.username}})
        .then((user) => {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches) {
                    if(matches) {
                        var token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                        res.json({
                            user: user,
                            message: "successfully authenticated",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({error: "Authentication failed"});
                    }
                });
            } else {
                res.status(500).send({ error: "Failed to authenticate" });
            }
        },
        function(err) {
            res.status(501).send({error: Failed});
        }
    );
});
module.exports = router;