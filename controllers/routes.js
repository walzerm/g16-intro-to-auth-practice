var express = require('express');
var router = express.Router();
var knex = require('./../db/knex');
var validator = require('../src/validations')

var Users = function() {
  return knex('users');
}

router.get('/', function(req, res) {
    res.render('signup', {errormessages: []});
})

router.post('/index', function(req, res) {
    var errormessages = validator.error(req.body);
    res.render('signup', {errormessages: errormessages});
})

module.exports = router;
