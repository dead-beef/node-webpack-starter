module.exports = (config) => {
	const webpack = require('webpack');
	const path = require('path');

	const common = require('./common');
	const cfg = common.config;

	let files;

	if(cfg.app.library) {
		let library = './' + path.join(cfg.dir.dist, 'js/*.js');

		files = cfg.vendor.js.map((name) => ({
			pattern: require.resolve(name),
			watched: false,
			served: true
		}));
		files.push({
			pattern: require.resolve('jasmine-jquery'),
			watched: false,
			served: true
		});
		files.push(library);

		let preprocessors = {};
		preprocessors[library] = 'sourcemap';

		config.set({
			preprocessors: preprocessors
		});
	}
	else {
		let preprocessors = {};
		for(let path of cfg.app.tests) {
			preprocessors[path] = ['webpack', 'sourcemap'];
		}

		files = [{
			pattern: cfg.vendor.distpath,
			watched: false,
			served: true
		}];

		config.set({
			preprocessors: preprocessors,

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
	}

	files.push.apply(files, cfg.app.tests);

	config.set({
		basePath: '../',

		frameworks: ['jasmine'],

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

		files: files,

		port: 9876,

		colors: true,
		logLevel: config.LOG_INFO,

		autoWatch: true,
		singleRun: false,

		browsers: ['Chromium']
	});
};
