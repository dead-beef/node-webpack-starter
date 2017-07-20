module.exports = {
	dir: {
		build: 'build',
		dist: 'dist'
	},
	vendor: {
		name: 'vendor',
		css: ['./src/css/vendor.scss'],
		external: {
			'jquery': '$'
		}
	},
	app: {
		library: false,
		entry: {
			app: [ './src/css/main.scss', './src/js/main.js' ]
		},
		common: 'common',
		copy: [
			{ from: './src/img', to: 'img' },
			{ from: './src/index.html' }
		],
		tests: [
			'./tests/main.js'
			//'./src/*.test.js',
			//'./src/**/*.test.js'
			//'./tests/*.test.js',
			//'./tests/**/*.test.js
			//'./tests/*-test.js',
			//'./tests/**/*-test.js'
		]
	}
};
