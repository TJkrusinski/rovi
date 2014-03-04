'use strict';
var url = 'http://api.rovicorp.com/search/v2.1/';
/**
 * Expose the search functionality
 */
module.exports = Search;

/**
 * Constructor for search
 * @param {Onject} client client reference
 */
function Search(client) {
	this.client = client;

	return this;
}

var endpoint = [
	'music',
	'amgvideo',
	'video'
];

var entitytype = [
	'song',
	'album',
	'artist',
	'onetimeonly',
	'movie',
	'credit',
	'tvseries'
]

Search.prototype.music = function(query) {


}