'use strict';

var key = process.env.ROVI_META_KEY;
var secret = process.env.ROVI_META_SECRET;
var metadata = require('../lib/metadata/index.js');

var assert = require('chai').assert;

metadata = metadata(key, secret);

describe('meta data and search', function(){
	var video = metadata.video;
	var search = metadata.search;

	describe('', function(){
		it('checks for existance', function(){
			assert.ok(metadata.video);
		});
	});

	describe('search#info()', function(){
		it('searches for a show', function(d){
			var query = {
				entitytype: 'tvseries',
				query: 'the office'
			};
			
			search.search('video', query, function(err, data){
				assert.isNull(err);
				assert.isObject(data);
				d();
			});	
		});
	});

	describe('video#info()', function(){
		it('gets info for a show', function(d){
			video.info({video:'the office'}, function(err, data){
				assert.isNull(err);
				assert.isObject(data);
				d();
			});	
		});
	});

	describe('video#schedule()', function(){
		it('gets info for a show', function(d){
			var query = {
				video: 'the office',
				serviceid: '360861'
			};
			video.schedule(query, function(err, data){
				assert.isNull(err);
				assert.isObject(data);
				d();
			});	
		});
	});
	
});
