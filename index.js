'use strict';

/**
 *	Export the autocomplete api
 *
 *	@param {String} key
 *	@param {String} secret
 */
exports.autocomplete = function(key, secret) {
	return require('./lib/autocomplete.js')(key, secret);
};

/**
 *	Export the listings api
 *
 *	@param {String} key
 *	@param {String} secret
 */
exports.listings = function(key, secret) {
	return require('./lib/listings.js')(key, secret);
};

/**
 *	Export the metadata api
 *
 *	@param {String} key
 *	@param {String} secret
 */
exports.metadata = function(key, secret) {
	return require('./lib/metadata/index.js')(key, secret);
};
