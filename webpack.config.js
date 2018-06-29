const path = require('path');
const webpack = require('webpack');

module.exports = {
	context: path.resolve(__dirname),
	entry: {
		'react-neuropsych-imgrecog': path.join(__dirname, 'src/index.js'),
		'test/main': path.join(__dirname, 'src/main.jsx')
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'dist'),
		library: '[name]',
		libraryTarget: 'umd'
	},
	resolve: {
		modules: ['node_modules', 'src'],
		extensions: ['.js', '.jsx'],
		symlinks: false,
	},
	module: {
		loaders: [{
			test: /\.(js|jsx)$/,
			include: /src/,
			exclude: /node_modules/,
			loader: 'babel-loader'
		}]
	},
	plugins: [
		/*new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production'),
			},
		}),
		new webpack.optimize.UglifyJsPlugin()*/
	],
};