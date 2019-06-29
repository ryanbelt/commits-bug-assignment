var config = require('./config/config');
var server = require('./config/server');
var router = require('./router');
var db = require('./config/db');
var express = require('express');
var request = require('request-promise');
var commitCtrl = require('./app/controllers/commit');
var moment = require('moment');

var app = express();
/*
	DB Connection
*/
db.connect();
db.sync();

/*
	App Config
*/
server.config(app);

/*
	API Routing
*/
router.route(app);

/*
	Public Folder
*/
app.use(express.static('public'))


var startDate = moment().subtract(1,'days').format('YYYY-MM-DD');
var endDate = moment().format('YYYY-MM-DD');

function commitGrabber(){
	startDate = moment().subtract(1,'days').format('YYYY-MM-DD');
	endDate = moment().format('YYYY-MM-DD')

	console.log('grabber------', startDate, endDate)
	request({
		url: `https://api.github.com/search/commits?q=bug+committer-date:${startDate}..${endDate}&sort=committer-date&order=desc&per_page=100`,
		headers: {
			'User-Agent': 'Request-Promise',
			'Accept': 'application/vnd.github.cloak-preview'
		},
		json: true,
	})
	.then(function(data){
		commitCtrl.insertCommit(data.items);
	}).catch(function(err){
		// console.log(err);
		// ignore duplicate
	})
}

commitGrabber();

// frequence grabber 1 fetch per min without exceeding the limit rate
setInterval(function(){
	commitGrabber()
},60000)



/*
	Start server
*/
app.set('port', config.server.port);

app.listen(app.get('port'), function() {
	console.log('Server listenting on ' + process.pid + " and port " + app.get('port'));
});

// export app so we can test it
exports = module.exports = app;
