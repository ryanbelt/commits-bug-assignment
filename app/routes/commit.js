var express = require('express');
var router = express.Router();
var commitCtrl = require('../controllers/commit');

/*
	Users routes (host:port/users/)
*/

router.get('/', commitCtrl.getCommits);

module.exports = router;