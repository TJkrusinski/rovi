'use strict';

var sig = require('./sig.js');
var http = require('http');
var querystring = require('querystring');
var parseUrl = require('url').parse;

/**
 *	Expose the client
 */
module.exports = Client;

/**
 *	Constructor to give context to users
 *
 *	@class Client
 *
 *	@class {String} key
 *	@class {String} secret
 */
function Client (key, secret) {
	this.key = key;
	this.secret = secret;

	return this;
};

/**
 *	Perform the reqest
 *
 *	@param {String} verb
 *	@param {String} url
 *	@param {Object} query
 *	@param {Object} data
 *	@param {Function} callback
 */
Client.prototype._request = function(verb, url, query, data, callback) {
	var url = parseUrl(url);
	
	query.apikey = this.key;
	query.sig = sig(this.key, this.secret);
	query.format = 'json';
	query.country = 'US';
	query.language = 'en';

	query = querystring.stringify(query);

	var options = {
			host: url.host,
			path: url.path+'?'+query,
			method: verb
		};
	
	var request = http.request(options);

	request.on('response', function(response) {
		var body = '';

		response.on('data', function(data){
			body += data;
		});

		response.on('end', function(){
			console.log(body);
			console.log(response.statusCode);
			var status = response.statusCode;

			try {
				body = JSON.parse(body);
			} catch (e) {
				return callback('Invalid JSON', null);
			};

			if (status < 200 || status > 299) {
				return callback(body, null);
			};

			callback(null, body);
		});
	});

	request.on('error', function(err){
		callback(err, 'Github refused connection');
	});

	if (data) {
		data = JSON.stringify(data);
		request.write(data);
	};

	request.end();
};

/**
 *	perform a GET request
 *
 *	@param {String} url
 *	@param {Object} query
 *	@param {Function} callback
 */
Client.prototype.get = function(url, query, callback) {
	this._request('GET', url, query, null, callback);
};

/**
 *	perform a POST request
 *
 *	@param {String} url
 *	@param {Object} query
 *	@param {Object} obj
 *	@param {Function} callback
 */
Client.prototype.post = function(url, query, obj, callback) {
	this._request('POST', url, query, obj, callback);
};
