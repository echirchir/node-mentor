var express = require('express');
var router = express.Router();
const async = require("async")
const assert = require("assert")

var cassandra = require('cassandra-driver');
var timeId = cassandra.types.TimeUuid;

var client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'mentor' });

router.get('/', function(req, res, next) {
    res.render('register', { title: 'CodeMentor - Register' });
});

client.connect(function(err, result) {
    console.log('cassandra connected');
});

router.post('/', function(req, res, next) {

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    console.log(username + " " + email + " " + password);

    var id = timeId.now()

    /* switch to an array of queries */

    const query = 'insert into mentor.users (id, username, email, password) values(?, ?, ?, ?)'

    client.execute(query, [id, username, email, password], { prepared: true }, (err, results) => {
        assert.ifError(err)
        if (!err) {
            console.log("the user was updated to the cluster successfully")
        }

    });

    res.redirect('back')

});

module.exports = router;
