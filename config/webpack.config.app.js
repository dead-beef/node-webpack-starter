module.exports = (() => {
	let webpack = require('webpack');
	let ExtractTextPlugin = require('extract-text-webpack-plugin');
	let CopyWebpackPlugin = require('copy-webpack-plugin');

	let path = require('path');
	let common = require('./common');
	let cfg = common.config;

	this.entry = cfg.app.entry;

	this.output = {
		filename: 'js/[name].js',
		path: cfg.path.dist
	};

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
		}),
		new webpack.DllReferencePlugin({
			context: '.',
			manifest: require(cfg.vendor.path)
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

	if(Object.keys(this.entry).length > 1) {
		this.plugins.push(new webpack.optimize.CommonsChunkPlugin({
			name: cfg.app.common
		}));
	}

	return this;
})();
