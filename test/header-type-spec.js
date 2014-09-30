var assert     = require('assert');
var mocha    = require('mocha');
var headerType = require('../header-type.js');

describe('headerType', function(){
	it('returns the html header type of a html request', function(){
		assert.equal('html', headerType("text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"));
	});

	it('returns the json header type of a json request', function(){
    assert.equal('json', headerType("application/json,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"));
	});
});