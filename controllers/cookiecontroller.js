var express = require('express')
var router = express.Router();
var sequelize = require('../db');
var Cookie = sequelize.import('../models/cookie');
const validateSession = require('../middleware/validate-session');

router.post("/create", validateSession, (req, res) => {

    var cookiename = req.body.cookie.cookiename;
    var owner_id = req.user.id;
    var description = req.body.cookie.description;
    var ingredients = req.body.cookie.ingredients;
    var instructions = req.body.cookie.instructions;
    var submittedBy = req.body.cookie.submittedBy;

Cookie.create({
    cookiename: cookiename,
    owner_id: owner_id,
    description: description,
    ingredients: ingredients,
    instructions: instructions,
    submittedBy: submittedBy,
})
    .then( cookie => res.status(200).json(cookie))
    .catch( err => res.status(500).json({ err: err}));
})

router.get ("/", (req, res) => {
    Cookie.findAll()
        .then( cookies =>  res.status(200).json(cookies) )
        .catch(err => res.status(500).json({err: err}))
})

router.get('/mycookies', validateSession, (req, res) => {
    Cookie.findAll({ where: { owner_id: req.user.id }
    })
        .then(cookies => res.status(200).json(cookies))
        .catch(err => res.status(500).json({ error: err}))
    })

router.put('/update/:id', validateSession, (req,res) => {
    Cookie.update(req.body.cookie, { where: { id: req.params.id, owner_id: req.user.id }, returning: true
})
    .then(cookie => res.status(200).json(cookie))
    .catch(err => res.status(500).json({err: err}))
})

router.delete('/delete/:id', validateSession, (req,res) => {
    Cookie.destroy( { where: { id: req.params.id, owner_id: req.user.id}
})
    .then(cookie => res.status(200).json(cookie))
    .catch(err => res.status(500).json({err: err}))
})

module.exports = router;