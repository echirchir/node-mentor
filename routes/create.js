var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('register', { title: 'CodeMentor - Register' });
});

router.post('/', function(req, res, next){
	
	console.log('User input : ' + req.body.username + " " + req.body.password);
	res.redirect('/');
});

module.exports = router;