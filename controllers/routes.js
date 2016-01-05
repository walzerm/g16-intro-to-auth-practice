var express = require('express');
var router = express.Router();
var knex = require('./../db/knex');
var validator = require('../src/validations')

var Users = function() {
  return knex('users');
}

router.get('/', function(req, res) {
    res.render('signup', {errormessages: []});
});

router.post('/index', function(req, res) {
    var errormessages = [];
    errormessages = validator.error(req.body);


    if(errormessages.length > 0){
        res.render('signup', {errormessages: errormessages});
    }
    else{
        console.log('alllllll the else, come at me bro');

        Users().where({email: req.body.email}).first().then(function(user) {
            if (user) {
                errormessages.push('You already exist.');
            } else {
                Users().insert({
                    email: req.body.email,
                    password: req.body.password}).then(function() {
                        res.redirect('/');
                });
            }
        });
    }




})

module.exports = router;
