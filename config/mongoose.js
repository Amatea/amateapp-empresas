'use strict';

var	config = require('./config'),
	mongoose = require('mongoose');


module.exports = function() {
	
	mongoose.Promise = global.Promise;
	var db = mongoose.connect(config.db);

	require('../dbconection/userConection');

	return db;
};