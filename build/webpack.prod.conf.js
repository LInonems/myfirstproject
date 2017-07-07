var HtmlWebpackPlugin=require('html-webpack-plugin');
var ExtractTextPlugin=require('extract-text-webpack-plugin');
var path=require('path');
var webpack=require('webpack');

var config=require('./webpack.config');
config.module.loaders.push({
			test:/\.css$/,
			loader:ExtractTextPlugin.extract({
				fallback:'style',
				use:'css',
				publicPath:'.../',
			})
		});

config.plugins=[
	new ExtractTextPlugin("../[name].[contenthash].css"),
	new HtmlWebpackPlugin({
		filename:'../index.html',
		template:path.resolve(__dirname,'../app/index/index.html'),
		inject:true
	}),
	new webpack.ProvidePlugin({
		$:"jquery",
		jQuery:"jquery"
	})
];
module.exports=config;
