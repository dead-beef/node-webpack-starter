require('jasmine-jquery');

var requireTest = require.context('.', true, /.test$/);
var tests = requireTest.keys();
tests.forEach(requireTest);
