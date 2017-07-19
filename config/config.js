module.exports = {
	dir: {
		build: 'build',
		dist: 'dist'
	},
	vendor: {
		name: 'vendor',
		css: ['./src/css/vendor.scss']
	},
	app: {
		entry: {
			app: [ './src/js/main.js', './src/css/main.scss' ]
		},
		common: 'common',
		copy: [
			{ from: './src/img', to: 'img' },
			{ from: './src/index.html' }
		],
		tests: [
			'./tests/main.js'
			//'./src/*.test.js',
			//'./src/**/*.test.js',
			//'./tests/*.test.js',
			//'./tests/**/*.test.js
		]
	}
};
