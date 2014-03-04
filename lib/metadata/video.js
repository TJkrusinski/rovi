'use strict';

var baseUrl = 'http://api.rovicorp.com/data/v1.1/';

module.exports = Video;

/**
 *	Our constructor for Video
 *	@class Video
 *
 *	@param {String} type
 */

function Video (type) {
	this.type = type;
	this.baseUrl = baseUrl+type;
};

/**
 *	Video the given type
 *	@method search
 *
 *	@param {Object} search
 */

Video.prototype.search = function(search, callback) {
	
};

/**
 *	Validate the search object
 *	@method validate
 *
 *	@param {Object} search
 *	@param {Function} callback
 */


