## rovi

Rovi Cloud Services API Client

This is a WIP

## API

### Video

````javascript

var rovi = require('rovi');

var metadata = rovi.metadata(key, secret);

metadata.video.info({video: 'The office'}, function(err, data){
	// err == null
	// data == object
});

````

#### Video Methods

* `metadata.video.info(searchObj, callback)`
	* Get info about a show
	* Accepts a search Object

## Running Tests

To run the test suite, you'll want to add your keys to the `keys.sh.example` and then move it to `keys.sh`, then run:

````
$ npm test
````

## License

(The MIT License)

````
Copyright (c) 2014 TJ Krusinski <tjkrus@gmail.com>;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
````
