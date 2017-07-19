module.exports = (() => {
	let webpack = require('webpack');
	let ExtractTextPlugin = require('extract-text-webpack-plugin');

	let path = require('path');
	let common = require('./common');
	let cfg = common.config;

	this.entry = {};
	this.entry[cfg.vendor.name] = cfg.vendor.files;

	this.output =  {
		filename: 'js/[name].js',
		path: cfg.path.dist,
		library: '[name]'
	};

	this.module = {
		rules: [
			{
				test: require.resolve('jquery'),
				loader: 'expose-loader?jQuery!expose-loader?$'
			},
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
		new webpack.DllPlugin({
			path: path.resolve(cfg.path.build, '[name].json'),
			name: '[name]'
		})
	];

	return this;
})();
