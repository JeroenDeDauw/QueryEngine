'use strict';

var QueryEngine = require('../../lib/QueryEngine.js');

exports['awesome'] = {
	setUp: function(done) {
		// setup here
		done();
	},
	'no args': function(test) {
		test.expect(1);
		// tests here
		test.equal(QueryEngine.awesome(), 'awesome', 'should be awesome.');
		test.done();
	}
};
