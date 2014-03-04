'use strict';

var key = process.env.ROVI_TV_KEY;

if (!key) {
	console.log('No key set; please set your API key');
	process.exit();
};

var assert = require('chai').assert;
var client = require('../lib/request.js')(key, null);
var listings = require('../lib/listings.js')(client);


describe('listing', function () {
	describe('listings#services()', function () {
		it('should return okay when given explicit data', function testListingServicesExplicit(done) {
			listings.services(
				'32601', // Postalcode for Downtown Gainesville, FL, US
				'en-US', // Locale
				'US',    // Countrycode
				function(err, data){
					assert.ok(data);
					assert.isNull(err);
					done();
			});
		});
		it('should return okay when given a zip code', function testListingServicesSimple(done) {
			listings.services(
				'32601', // Postalcode for Downtown Gainesville, FL, US
				function(err, data) {
					assert.ok(data);
					assert.isNull(err);
					done();
			});
		});
		it('should return okay when given a zip code as a number', function testListingServicesNumberPostalcode(done) {
			listings.services(
				32601, // Postalcode for Downtown Gainesville, FL, US
				function(err, data) {
					assert.ok(data);
					assert.isNull(err);
					done();
			});
		});
		it('should return an error when given an array as an argument', function testListingServicesFailOnArray(done) {
			listings.services(
				['32601', '32606'], // 'Illegal'
				function(err, data) {
					assert.ok(err);
					done();
			});
		});
		it('should be able to take a an object containing the correct arguments', function (testListingServicesOptionsObject){
			listings.services({
				postalcode: 90210,
				locale: 'en-US',
				countrycode: 'US',
				msoid: 25,
				callback: function(err, data) {
					assert.isNull(err);
					assert.ok(data);
					done();
				}
			});
		});
		it('should return an error when given an invalid object as an argument', function testListingServiceFailOnInvalidOnject(done) {
			listings.services(
				{zipcode: '32601'}, // 'Illegal'
				function(err, data) {
					assert.ok(err);
					done();
			});
		});
		it('should return an error when given an invalid string as an argument', function testListingServicesFailOnInvalidString(done) {
			listings.services(
				'Can I haz service?', // I don't even..
				function(err, data) {
					assert.ok(err);
					done();
			});
		});
	});
	describe('listings#service()', function () {
		it('should return service details when provided a serviceid, locale, options, and a callback', function (done) {
			listings.service(
				20494,
				'en-US',
				{
					imageformatid: 0,
					includechannelimages: true
				},
				function(err, data) {
					assert.isNull(err);
					assert.ok(data);
					dont();
				}
			);
		});
		it('should return service details when provided a serviceid, locale, and a callback', function (done) {
			listings.service(20494, 'en-US', function(err, data){
				assert.isNull(err);
				assert.ok(data);
				dont();
			});
		});
		it('should return service details when provided an options object containing a serviceid, and a callback', function (done) {
			listings.service({
				serviceid: 20494,
				callback: function(err, data) {
					assert.isNull(err);
					assert.ok(data);
					dont();
				}
			});
		});
		it('should return service details when provided an options object and a callback function', function (done) {
			listings.service({serviceid: 20494}, function(err, data){
				assert.isNull(err);
				assert.ok(data);
				dont();
			});
		});
		it('should return an error when provided bad data for serviceid', function (done) {
			listings.service('bad data', 'en-US', function(err, data){
				assert.ok(err);
				done();
			});
		});
		it('should return an error when provided bad data for the locale', function (done) {
			listings.service('20494', 'BADDATA', function(err, data){
				assert.ok(err);
				done();
			});
		});
	});
});
