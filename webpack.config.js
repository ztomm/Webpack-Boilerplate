const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var isProd = process.env.NODE_ENV === 'production';

module.exports = {
	entry: './src/js/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: isProd ? '[name].[hash].js' : '[name].js',
		publicPath: '/dist/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						}
					}
				]
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(png|svg|jpe?g|gif)$/,
				include: /images/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'images/',
						publicPath: 'images/'
					}
				}
				]
			},
			{
				test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				include: /fonts/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'fonts/',
						publicPath: 'fonts/',
					}
				}]
			},
			{
				test: /\.pug$/,
				include: path.join(__dirname, 'src'),
				use: ['pug-loader']
			},
		]
	},
	optimization: {	
		minimizer: isProd ? [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})] : [],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: isProd ? '[name].[hash].css' : '[name].css',
			chunkFilename: isProd ? '[id].[hash].css' : '[id].css',
		}),
		new HtmlWebpackPlugin({
			template: './views/layout.pug',
			filename: 'layout.pug'
		}),
		// new webpack.ProvidePlugin({
		// 	$: 'jquery',
		// 	jQuery: 'jquery'
		// }),
		new HtmlWebpackPugPlugin(),
		new CleanWebpackPlugin()
	]
};