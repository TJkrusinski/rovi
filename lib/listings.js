'use strict';
var queryBuilder = require('querystring').stringify;

module.exports = Listings;

/**
 * Constructor for search
 * @param {Onject} client client reference
 */
function Listings(client) {
	this.client = client;

	return this;
}

var urlBase = 'http://api.rovicorp.com/TVlistings/v9/listings/services';

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

Listings.prototype.countycodes = 
[
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
 * @param {Function} callback
 */
Listings.prototype.services = function() {
	var options = {
			postalcode: '0',
			locale: 'en-US',
			countrycode: 'US',
			format: json,
			apikey: client.key
		},
		callback = function(){},
		err = null;

	for(var argnum = 0; argnum < arguments.length; argnum++) {
		var arg = argument[argnum];
		switch (arg) {
			case 'function':
				callback = arg;
				break;
			case 'string':
				if (this.countrycodes.indexOf(arg) >= 0) countrycode = arg;
				else if (this.locales.indexOf(arg) >= 0) locale = arg;
				else postalcode = arg;
				break;
			case 'number':
				if (arg < 0 || arg > 100000) err = 'Postalcode out of range';
				else if ((arg + '').indexOf('.') >= 0) err = 'Invalid argument recieved';
				else if (arg === 0) postalcode = '0'; 
				else {
					arg += '';
					while (arg.length <  6) {
						arg = "0" + arg;
					}
					postalcode = arg;
				}
				break;
			default: 
				err = 'Invalid argument recieved.';
				break;
		}

		if (err) return callback (err, null);
	}

	// Arguments are now parsed and validatated
	// http://api.rovicorp.com/TVlistings/v9/listings/services/postalcode/32606/info?locale=en-US&countrycode=US&format=json&apikey=z9bcps4qnaxhgtut8mrcxa8u

	var url = baseUrl + '/postalcode/' + postalcode + '/info';
	var query = queryBuilder(options);

	return this.client.get(url, query, callback);
};