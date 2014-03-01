'use strict';

var Client = require('./request.js');
var baseUrl = 'http://api.rovicorp.com/search/v2.1/amgvideo/autocomplete';

/**
 *	Expose the API interface
 *	Take in the keys, give back a function
 *
 *	@param {String} key
 *	@param {String} secret
 */
module.exports = function(key, secret) {
	var client = new Client(key, secret);

	/**
	 *	Return a function for autocomplete
	 *
	 *	The Rovi API doesn't have permalinks to their docs, so it kind of sucks
	 *	Otherwise I would give you a link to describe this object
	 *
	 *	@param {Object} object
	 */
	return function(object, callback) {
		client.get(baseUrl, object, callback);
	};
};
