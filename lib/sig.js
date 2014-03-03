'use strict';

var md5 = require('MD5');

/**
 *	Compute the sig for a use
 *	
 *	The sig is the following in an md5 hash:
 *	- The API key
 *	- The secret key
 *	- The number of seconds since January 1, 1970 00:00:00 GMT
 *
 *	@param {String} key
 *	@param {String} secret
 *	@return {String}
 */
module.exports = function(key, secret) {
	var utc = Date.parse(new Date().toGMTString()) / 1000;
	return md5(key + secret + utc);
};
