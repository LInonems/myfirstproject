var path=require('path');
var HtmlWebpackPlugin=require('html-webpack-plugin');


module.exports={
	//入口文件,path.resolve()方法,可以结合我们给定的两个参数最后生成绝对路径,最终指向的就是我们的index.js文件
	entry:{
		index:path.resolve(__dirname,'../app/index/index.js')
	},
	//输出配置
	output:{
		//输出路径是../output/static
		path:path.resolve(__dirname,'../output/static'),
		publicPath:'/',
		filename:'[name].[hash].js',
		chunkFilename:'[id].[chunkhash].js',
	},
	resolve:{
		extensions:['.js','.vue'],
		alias:{
			'vue':'vue/dist/vue.js',
			'assets':path.resolve(__dirname,'../app/index/assets')
		}
	},
	module:{
		loaders:[
			//使用vue-loader加载.vue结尾的文件
			{
				test:/\.vue$/,
				loader:'vue-loader'
			},
			{
				test:/\.js$/,
				loader:'babel-loader',
				query:{
					presets:'es2015'
				},
				exclude:/node_modules/
			},
			{
				test:/\.css$/,
				loader:'style-loader!css-loader'
			},
			{ 
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, 
				loader: "file-loader" 
			},
			{
				test:/\.(svg|ttf|woff|woff2)$/,
				loader:"url-loader"
			},
			{
				test:/\.(png|jpg|gif|svg)$/,
				loader:'url-loader',
				query:{
					limit:10000,
					name:'[name].[ext]?[hash:7]'
				}
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			filename:'/',
			template:path.resolve(__dirname,'../app/index/index.html'),
			inject:true
		}),
	]
};