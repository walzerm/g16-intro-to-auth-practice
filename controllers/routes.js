var express = require('express');
var router = express.Router();
var knex = require('./../db/knex');
var validator = require('../src/validations')
var bcrypt = require('bcrypt');

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
            	var hashedPassword = bcrypt.hashSync(req.body.password, 8);
                Users().insert({
                    email: req.body.email,
                    password: hashedPassword}).then(function(id) {
                    	res.cookie('userID', id[0], { signed: true });
                        res.redirect('/'+id[0]);
                });
            }
        });
    }
});

router.get('/:id', function(req, res){
	if(req.signedCookies.userID === req.params.id) {
	}
});

module.exports = router;
