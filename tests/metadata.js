'use strict';

var key = process.env.ROVI_META_KEY;
var secret = process.env.ROVI_META_SECRET;
var metadata = require('../lib/metadata/index.js');

var assert = require('chai').assert;

metadata = metadata(key, secret);

describe('meta data and search', function(){
	var video = metadata.video;

	describe('', function(){
		it('checks for existance', function(){
			assert.ok(metadata.video);
		});
	});

	describe('video#info()', function(){
		it('gets info for a show', function(d){
			video.info({video:'the office'}, function(err, data){
				console.log(data);
				assert.isNull(err);
				assert.isObject(data);
				d();
			});	
		});
	});
	
});
