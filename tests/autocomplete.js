'use strict';

var key = process.env.ROVI_KEY;
var secret = process.env.ROVI_SECRET;
var assert = require('chai').assert;
var autocomplete = require('../lib/autocomplete.js');

if (!key) {
	console.log('No key or secret set, please set your API key keys');
	console.log('$ export ROVI_KEY=yourkey');
	console.log('$ export ROVI_SECRET=yoursecret');
	process.exit();
};

autocomplete = autocomplete(key, secret);

describe('autocomplete()', function(){
	it('gets related items for a search', function(d){
		var obj = {
			endpoint: 'video',
			entitytype: 'tvseries',
			query: 'the+office'
		};

		autocomplete(obj, function(err, data){
			assert.isNull(err);
			assert.isObject(data);
			d();
		});
	});
});
