var express = require('express');
var router = express.Router();
const async = require("async")
const assert = require("assert")

var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints : ['127.0.0.1'], keyspace: 'mentor'});

router.get('/', function(req, res, next) {
  res.render('register', { title: 'CodeMentor - Register' });
});

client.connect(function(err, result){
    console.log('cassandra connected');
});

router.post('/', function(req, res, next){
	
	const username = req.body.username;
	const email = req.body.email;
	const password = req.body.password;

	console.log(username + " " + email + " " + password);

	const id = cassandra.types.Uuid;

	const queryString = [{
		query: 'insert into mentor.users (id, username, email, password) values(?, ?, ?, ?)',
		param : [id, username, email, password]
	}]

	client.batch(queryString, { prepare: true }, (err, results) => {
		assert.ifError(err)
		if (!err){
			console.log("the user was updated to the cluster successfully")
		} else{
			console.log(err)
		}
		
		client.shutdown()
		process.exit()
	});

	res.redirect('/');
});

module.exports = router;