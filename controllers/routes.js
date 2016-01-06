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
                    password: hashedPassword}, 'id').then(function(id) {
                    	res.cookie('userID', id[0], { signed: true });
                        //console.log(id[0]);
                        res.redirect('/user/'+id[0]);
                });
            }
        });
    }
});

router.get('/user/:id', function(req, res) {
    //console.log(res.cookie);
    Users().where('id', req.params.id).first().then(function(user) {
        res.render('user', {user: user});
    })

})

router.get('/signin', function(req, res) {
    res.render('signin');
})

router.get('/:id', function(req, res){
    //res.render('signin');
    // console.log('i made it here?');
    // if(req.signedCookies.userID === req.params.id) {
    //   Users().where('id', req.params.id).first().then(function(user){
    //     if(user) {
    //       //delete user.password;
    //       //res.json(user);
    //       console.log(user);
    //       console.log('i made it here');
    //     } else {
    //       res.status(404);
    //       res.json({ message: 'not found' });
    //     }
    //   }).catch(function(error){
    //     res.status(404);
    //     res.json({ message: error.message });
    //   })
    // } else {
    //   res.status(401);
    //   res.json({ message: 'not allowed' });
    // }
});

module.exports = router;
