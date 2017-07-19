var $ = require('jquery');

module.exports = function(el) {
	$('<span/>').text('test').appendTo(el);
};
