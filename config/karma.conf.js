module.exports = (config) => {
	let webpack = require('webpack');
	let path = require('path');

	let common = require('./common');
	let cfg = common.config;

	let preprocessors = {};
	for(let path of cfg.app.tests) {
		preprocessors[path] = ['webpack', 'sourcemap'];
	}

	let tests = [{
		pattern: cfg.vendor.distpath,
		watched: false,
		served: true
	}];
	tests.push.apply(tests, cfg.app.tests);

	config.set({
		basePath: '../',

		frameworks: [/*'jquery-jasmine', */'jasmine'],

		reporters: ['spec'],
		specReporter: {
			maxLogLines: 5,
			suppressErrorSummary: true,
			suppressFailed: false,
			suppressPassed: false,
			suppressSkipped: true,
			showSpecTiming: false,
			failFast: false
		},

		files: tests,
		preprocessors: preprocessors,

		port: 9876,

		colors: true,
		logLevel: config.LOG_INFO,

		autoWatch: true,
		singleRun: false,

		browsers: ['Chromium'],

		webpack: {
			devtool: 'inline-source-map',
			resolve: {
				alias: {
					app: path.resolve(cfg.path.root, 'src/js/')
				}
			},
			plugins: [
				new webpack.DllReferencePlugin({
					context: '.',
					manifest: require(cfg.vendor.path)
				})
			]
		},

		webpackMiddleware: {
			stats: 'errors-only'
		}
	});
};
