var $ = require('jquery');

describe('environment', function() {

	describe('document', function() {
		it('should be defined', function() {
			expect(document).toBeDefined();
		});
	});

	describe('window', function() {
		it('should be defined', function() {
			expect(window).toBeDefined();
		});

		it('should update globals', function() {
			window.globalTest = 0;
			// eslint-disable-next-line no-undef
			expect(globalTest).toEqual(0);
		});
	});
});

describe('app', function() {
	var main = require('app/main');

	beforeEach(function() {
		$('<div/>')
			.attr('id', 'test-container')
			.appendTo(document.body);
	});

	afterEach(function() {
		$('#test-container').remove();
	});

	it('should work', function() {
		expect($('#test-container')).toExist();

		main('#test-container');
		var el = $('#test-container > span');
		expect(el).toExist();
		expect(el.html()).toEqual('test');
	});
});
