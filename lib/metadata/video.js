'use strict';

var baseUrl = 'http://api.rovicorp.com/data/v1.1/video';
var sig = require('../../lib/sig.js');

module.exports = Video;

/**
 *	Our constructor for Video
 *	@class Video
 */

function Video () {
	this.baseUrl = baseUrl;

	this.sig = function() {
		return sig(this.client.key, this.client.secret);
	};

	this.key = this.client.key;
};

/**
 *	Get info for a show
 *	@method info
 *
 *	@param {Object} obj
 */

Video.prototype.info = function(obj, callback) {
	if (!obj.video && !obj.cosmoid && !iguideid) {
		return callback('Invalid object, must inclue video, cosmoid or iduigeid', null);
	};

	obj.sig = this.sig();
	obj.apikey = this.key;

	this.client.get(this.baseUrl+'/info', obj, callback);
};

/**
 *	Get schedule for a show
 *	@method info
 *
 *	@param {Object} obj
 */

Video.prototype.schedule = function(obj, callback) {
	if (!obj.video && !obj.cosmoid && !iguideid) {
		return callback('Invalid object, must inclue video, cosmoid or iduigeid', null);
	};
	
	if (!obj.serviceid) {
		return callback('Must include `serviceid` value', null);
	};

	obj.sig = this.sig();
	obj.apikey = this.key;

	this.client.get(this.baseUrl+'/schedule', obj, callback);
};
