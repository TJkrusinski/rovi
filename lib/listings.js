'use strict';
var queryBuilder = require('querystring').stringify;
var imageFormats = require('./image-formats.json');

module.exports = Listings;

/**
 * Constructor for search
 * @param {Onject} client client reference
 */
function Listings(client) {
	if (!(this instanceof Listings)) return new Listings(client);

	this.client = client;

	return this;
}

Listings.prototype.locales = [
	'da-DK',
	'no-NO',
	'nl-BE',
	'pl-PL',
	'nl-NL',
	'pt-PT',
	'en-BM',
	'es-AR',
	'en-CA',
	'es-BO',
	'en-IE',
	'es-CL',
	'en-JM',
	'es-CO',
	'en-GB',
	'es-CR',
	'en-US',
	'es-DO',
	'fi-FI',
	'es-EC',
	'fl-BE',
	'es-SV',
	'fr-BE',
	'es-GT',
	'fr-CA',
	'es-HN',
	'fr-FR',
	'es-MX',
	'fr-LU',
	'es-NI',
	'fr-CH',
	'es-PA',
	'de-AT',
	'es-PE',
	'de-DE',
	'es-ES',
	'de-LU',
	'es-US',
	'de-CH',
	'es-VE',
	'it-IT',
	'sv-SE',
	'it-CH'
];

Listings.prototype.countrycodes = [
	'AR',
	'SV',
	'NI',
	'AT',
	'FI',
	'NO',
	'BE',
	'FR',
	'PA',
	'BM',
	'DE',
	'PE',
	'BO',
	'GT',
	'PL',
	'CA',
	'HN',
	'PT',
	'CL',
	'IE',
	'ES',
	'CO',
	'IT',
	'SE',
	'CR',
	'JM',
	'CH',
	'DK',
	'LU',
	'GB',
	'DO',
	'MX',
	'US',
	'EC',
	'NL',
	'VE'
];

Listings.prototype.imageFormats = imageFormats;
/**
 * services wraps and impliments the rovi API for getting Services
 *
 * Official API specs can be found here:
 * http://prod-doc.rovicorp.com/mashery/index.php/Data/APIs/Rovi-TV-Listings
 * 
 * Returns a list of the television service offerings for an area. This request provides an optional argument
 * to limit the response to just the services of a single cable or satellite operator.
 *
 * Your application should start with this request to get the service ID of the television service you want.
 *
 *
 * @param {String} [postalcode] (default='0') May be '0' if outside the US
 * @param {String} [locale] (default='en-US') Valid values are stored in Listings.locals
 * @param {String} [countrycode] (default='US') Valid valused are stored in Listings.countrycodes
 * @param {Object} [options] Data here overrides naked arguments
 * @param {Function} callback
 */
Listings.prototype.services = function() {
	var options = {
			postalcode: 0,
			locale: 'en-US',
			countrycode: 'US',
			format: 'json',
			apikey: this.client.key
		},
		postalcode = '0',
		callback = function(){},
		urlBase = '//api.rovicorp.com/TVlistings/v9/listings/services',
		err = null;

	for(var argnum = 0; argnum < arguments.length; argnum++) {
		var arg = arguments[argnum];

		switch (typeof arg) {
			case 'function':
				callback = arg;

				break;
			case 'string':
				if (this.countrycodes.indexOf(arg) >= 0) options.countrycode = arg;
				else if (this.locales.indexOf(arg) >= 0) options.locale = arg;
				else postalcode = arg;

				break;
			case 'number':
				if (arg < 0 || arg > 100000) err = 'Postalcode out of range';
				else if ((arg + '').indexOf('.') >= 0) err = 'Invalid argument recieved';
				else if (arg === 0) postalcode = '0'; 
				else {
					postalcode = arg + '';
					while (postalcode.length <  6) postalcode = "0" + postalcode;
				}
				break;
			case 'object':
				if (arg instanceof Array) 'Multiple selectors are not supported';
				else {
					if (arg.locale) options.locale = arg.locale;
					if (arg.countrycode) options.countrycode = arg.countrycode;
					if (arg.msoid) options.msoid = arg.msoid;
					if (arg.zipcode) postalcode = arg.zipcode;
					if (arg.zip) postalcode = arg.zip;
					if (arg.postalcode) postalcode = arg.postalcode;
					if (arg.callback) callback = arg.callback;
				}
				break;
			default: 
				err = 'Invalid argument type recieved: ' + typeof arg;
				break;
		}

	}

	//If an error was recieved while parsing arguments, bubble up the error.
	if (err) return callback (err, null);


	// Arguments are now parsed and validatated
	// http://api.rovicorp.com/TVlistings/v9/listings/services/postalcode/32606/info?locale=en-US&countrycode=US&format=json&apikey=z9bcps4qnaxhgtut8mrcxa8u

	var url = urlBase + '/postalcode/' + postalcode + '/info';
	var query = queryBuilder(options);

	return this.client.get(url, query, callback);
};

/**
 * Returns the channel lineup offered by a television service, plus information about the source of programming on a channel.
 * This request requires the service ID of the television service. You can get service IDs from responses to a Listings/Services request.
 *
 * Note that the imageformatids can be accessed via Listings.imageFormats array.
 *
 * Official API specs can be found here:
 * http://prod-doc.rovicorp.com/mashery/index.php/TvRest/V1/ServiceDetails
 *
 * @param  {String}   serviceid (Required)
 * @param  {String}   locale (Required)
 * @param  {Object}   options   May include serviceid, locale, includechannelimages, imageverticalresolution, imagehorizontalresolution, imageformatid 
 * @param  {Function} callback  function(err, data)
 *
 * Optionally supports the following pattern:
 * @param {Object} options same as above. May inlcude a callback function.
 * @param {Function} callback optional if included in options
 */
Listings.prototype.service = function(serviceid, locale, options, callback){
	var opt = {
		locale: 'en-US',
		includechannelimages: false,
		imageverticalresolution: null,
		imagehorizontalresolution: null,
		imageformatid: null 
	},
	serviceId = 0,
	obj = options,
	urlBase = '//api.rovicorp.com/TVlistings/v9/listings/servicedetails/serviceid/';

	if (typeof serviceid === 'object') obj = serviceid;
	if (typeof locale === 'function') callback = locale;
	if (typeof options === 'function') callback = options;

	if (obj.serviceid) serviceId = obj.serviceid;
	if (obj.locale) opt.locale = obj.locale;
	if (obj.includechannelimages) opt.includechannelimages = obj.includechannelimages;
	if (obj.imageverticalresolution) opt.imageverticalresolution = obj.imageverticalresolution;
	if (obj.imagehorizontalresolution) opt.imagehorizontalresolution = obj.imagehorizontalresolution;
	if (obj.imageformatid) opt.imageformatid = obj.imageformatid;
	if (obj.callback) callback = obj.callback;

	var url = urlBase + serviceId + '/info';
	var query = queryBuilder(opt);

	return this.client.get(url, query, callback);
};
