'use strict';

var key = process.env.ROVI_AUTO_KEY;
var secret = process.env.ROVI_AUTO_SECRET;
var assert = require('chai').assert;
var autocomplete = require('../lib/autocomplete.js');

if (!key || !secret) {
	console.log('No key or secret set, please set your API key keys');
	process.exit();
};

autocomplete = autocomplete(key, secret);

describe('autocomplete()', function(){
	it('gets related items for a search', function(d){
		this.timeout(5000);
		var obj = {
			entitytype: 'tvseries',
			query: 'the+office',
			size: 20,
		};

		autocomplete(obj, function(err, data){
			assert.isNull(err);
			assert.isObject(data);
			d();
		});
	});
});
