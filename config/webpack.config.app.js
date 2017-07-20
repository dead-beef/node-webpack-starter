module.exports = (() => {
	const webpack = require('webpack');
	const ExtractTextPlugin = require('extract-text-webpack-plugin');
	const CopyWebpackPlugin = require('copy-webpack-plugin');

	const path = require('path');
	const common = require('./common');
	const cfg = common.config;

	this.entry = cfg.app.entry;

	let multipleEntries = Object.keys(cfg.app.entry).length > 1
		&& !Array.isArray(cfg.app.entry);
	let library = null;

	if(cfg.app.library === true) {
		library = '[name]';
	}
	else if(cfg.app.library) {
		library = cfg.app.library;
	}

	this.output = {
		path: cfg.path.dist
	};

	if(library !== null) {
		this.output.library = library;
		this.output.libraryTarget = 'umd';

		this.externals = {};
		for(let lib of cfg.vendor.js) {
			this.externals[lib] = {
				commonjs: lib,
				commonjs2: lib,
				amd: lib,
				root: cfg.vendor.external[lib] || lib
			};
		}

		let name = multipleEntries ? library + '.[name].js' : '[name].js';
		this.output.filename = 'js/' + name;
	}
	else {
		this.output.filename = 'js/[name].js';
	}

	this.module = {
		rules: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({
					loader: 'css-loader?importLoaders=1',
				}),
			},
			{
				test: /\.s[ac]ss$/,
				loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader?name=fonts/[name].[ext]&publicPath=../'
			}
		]
	};

	this.plugins = [
		new ExtractTextPlugin({
			filename: 'css/[name].css',
			allChunks: true
		})
	];

	if(cfg.app.copy !== undefined) {
		for(let cp of cfg.app.copy) {
			if(cp.to !== undefined) {
				cp.to = path.resolve(cfg.path.dist, cp.to);
			}
		}
		this.plugins.push(new CopyWebpackPlugin(cfg.app.copy));
	}

	if(library === null) {
		if(cfg.vendor.js) {
			this.plugins.push(new webpack.DllReferencePlugin({
				context: '.',
				manifest: require(cfg.vendor.path)
			}));
		}

		if(multipleEntries) {
			this.plugins.push(new webpack.optimize.CommonsChunkPlugin({
				name: cfg.app.common
			}));
		}
	}

	return this;
})();
