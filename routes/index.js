var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'CodeMentor - Login' });
});

router.post('/', function(req, res){
	res.redirect('/create');
});

module.exports = router;
