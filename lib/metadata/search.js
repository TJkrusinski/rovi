'use strict';

module.exports = Search;

/**
 *	Our constructor for Search
 *	@class Search
 *
 *	@param {String} type
 */

function Search (type) {
	this.type = type;
	this.baseUrl = baseUrl+type+'/search';
};

/**
 *	Search the given type
 *	@method search
 *
 *	@param {Object} search
 */

Search.prototype.search = function(search, callback) {
	
};

/**
 *	Validate the search object
 *	@method validate
 *
 *	@param {Object} search
 *	@param {Function} callback
 */

Search.prototype.validate = function(search, callback) {
	switch (this.type) {
		case 'video':

		break;
	};
};
