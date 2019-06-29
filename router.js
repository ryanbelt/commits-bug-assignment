var commitRoutes 	= require('./app/routes/commit');


/*
	API routes resources
*/
exports.route = function(app) {

	// app.use(userCtrl.validateSession);

	app.use('/commits', commitRoutes);

};
