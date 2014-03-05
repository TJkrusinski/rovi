'use strict';

var sig = require('../sig.js');
var Client = require('../request.js');

var Search = require('./search.js');
var Video = require('./video.js');

module.exports = function(key, secret) {
	Search.prototype.client = new Client(key, secret);
	Video.prototype.client = new Client(key, secret);

	return {
		video: new Video,
		search: new Search,
	};
};
