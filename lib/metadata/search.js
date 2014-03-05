'use strict';

module.exports = Search;

var baseUrl = 'http://api.rovicorp.com/search/v2.1/';
var sig = require('../../lib/sig.js');

/**
 *	Our constructor for Search
 *	@class Search
 *
 *	@param {String} type
 */

function Search () {
	this.baseUrl = baseUrl;

	this.sig = function() {
		return sig(this.client.key, this.client.secret);
	};

	this.key = this.client.key;
};

/**
 *	Search the given type
 *	@method search
 *
 *	@param {String} type
 *	@param {Object} search
 *	@param {Function} callback
 */

Search.prototype.search = function(type, search, callback) {
	if (!type) return callback('Must declare a type to search for', null);
	if (!search.entitytype) return callback('Must declare an entity type', null);
	if (!search.query) return callback('Must provide a search query', null);

	search.apikey = this.key;
	search.sig = this.sig();
	
	var url = this.baseUrl+type+'/search';
	this.client.get(url, search, callback);
};
