'use strict';
var key = process.env.ROVI_LISTINGS_KEY;
if (!key) {
	console.log('No key set; please set your API key');
	console.log('$ export ROVI_LISTINGS_KEY=yourkey');
	process.exit();
}


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
		it('should return okay when given a zip code.', function testListingServicesSimple(done) {
			listings.services(
				'32601', // Postalcode for Downtown Gainesville, FL, US
				function(err, data) {
					assert.ok(data);
					assert.isNull(err);
					done();
			});
		});
		it('should return okay when given a zip code as a number.', function testListingServicesNumberPostalcode(done) {
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
		// TODO:
		it('should, in the future, be able to take a an object containing the correct arguments');
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
});