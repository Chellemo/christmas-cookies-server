var express = require('express')
var router = express.Router();
var sequelize = require('../db');
var Cookie = sequelize.import('../models/cookie');
const validateSession = require('../middleware/validate-session');

router.post("/create", (req, res) => {

    var cookiename = req.body.cookie.cookiename;
    var owner_id = req.userid;
    var description = req.body.cookie.description;
    var ingredients = req.body.cookie.ingredients;
    var instructions = req.body.cookie.instructions;

Cookie.create({
    cookiename: cookiename,
    owner_id: req.userid,
    description: description,
    ingredients: ingredients,
    instructions: instructions
})
    .then( cookie => res.status(200).json(cookie))
    .catch( err => res.status(500).json({ err: err}));
})

router.get ("/", (req, res) => {
    Cookie.findAll()
        .then( cookies =>  res.status(200).json(cookies) )
        .catch(err => res.status(500).json({err: err}))
})

router.get('/', validateSession, (req, res) => {
    Cookie.findAll({ where: { owner_id: req.userid }
    })
        .then(cookies => res.status(200).json(cookies))
        .catch(err => res.status(500).json({ error: err}))
    })

router.put('/update/:id', validateSession, (req,res) => {
    Cookie.update(req.body.cookie, { where: { id: req.params.id, owner_id: req.userid }, returning: true
})
    .then(cookie => res.status(200).json(cookie))
    .catch(err => res.status(500).json({err: err}))
})

router.delete('/delete/:id', validateSession, (req,res) => {
    Cookie.destroy({ where: { id: req.params.id, owner_id: req.userid}
})
    .then(cookie => res.status(200).json(cookie))
    .catch(err => res.status(500).json({err: err}))
})

module.exports = router;