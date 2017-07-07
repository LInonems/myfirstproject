var HtmlWebpackPlugin=require('html-webpack-plugin');
var path=require('path');
var webpack=require('webpack');


var config=require('./webpack.config');

config.output.publicPath='/';

config.plugins=[
	new webpack.optimize.OccurrenceOrderPlugin(),
	new webpack.HotModuleReplacementPlugin(),
	new webpack.NoErrorsPlugin(),

	new HtmlWebpackPlugin({
		filename:'index.html',
		template: path.resolve(__dirname,'../app/index/index.html'),
		inject:true
	}),
	new webpack.ProvidePlugin({
		$:"jquery",
		jQuery:"jquery"
	}),
];

//动态向入口配置注入 webpack-hot-middleware/client
var devClient='./build/dev-client';
Object.keys(config.entry).forEach(function(name,i){
	var extras=[devClient];
	config.entry[name]=extras.concat(config.entry[name]);
});
module.exports=config;