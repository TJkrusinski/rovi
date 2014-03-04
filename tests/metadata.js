'use strict';

var key = process.env.ROVI_META_KEY;
var secret = process.env.ROVI_META_SECRET;
var metadata = require('../lib/metadata/index.js');

var assert = require('chai').assert;

metadata = metadata(key, secret);

describe('meta data and search', function(){
	describe('', function(){
		it('checks for existance', function(){
			assert.ok(metadata.Search);
			assert.ok(metadata.Video);
		});
	});

	
});
