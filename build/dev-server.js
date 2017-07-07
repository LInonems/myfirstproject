//开发模式的服务器

const express=require('express');
const webpack=require('webpack');
const config=require('./webpack.dev.conf');
const db=require('./db');
const bodyParser=require('body-parser');
const router=express.Router();
const app=express();
//调用webpack并把配置传递过去
const compiler=webpack(config);

//使用webpack-dev-middleware中间件
var devMiddleware=require('webpack-dev-middleware')(compiler,{
	publicPath:config.output.publicPath,
	stats:{
		colors:true,
		chunks:false
	}
});

var hotMiddleware=require('webpack-hot-middleware')(compiler);

//webpack插件,监听html文件改变事件
compiler.plugin('compilation',function(compilation){
	compilation.plugin('html-webpack-plugin-after-emit',function(data,cb){
		hotMiddleware.publish({action:'reload'});
		cb();
	});
});

app.use(devMiddleware);

app.use(hotMiddleware);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//管理员登录
app.post('/login',function(req,res){
	db.query("select * from user where username='"+req.body.username+"' and password='"+req.body.password+"'",function(err,rows){
		if(err){
			res.writeHead(500);
			res.end(err.toString());
		}
		res.end();
	});
});

//获取用户列表
app.get('/user',function(req,res){
	db.query("select * from user",function(err,rows){
		if(err){
			res.writeHead(500);
			res.end(err.toString());
		}else{
			var json=rows;
			res.writeHead(200,{"Content-Type":"application/json"});
			res.end(JSON.stringify(json));
		}
	});
});


//添加
app.post('/add',function(req,res){
	db.query("insert into "+req.body.table+" values('"+
		req.body.username+"','"+req.body.password+"','"+
		req.body.email+"','"+req.body.address+"','"+
		req.body.name+"','images/head.jpg','"+(new Date()).toLocaleString()+"')",function(err){
			if(err){
				res.writeHead(500);
				res.end(err.toString());
			}else{
				res.end("添加成功");
			}
		});
});

//删除
app.post('/del',function(req,res){
	db.query("delete from "+req.body.table+" where "+req.body.filed+"='"+req.body.content+"'",function(err){
		if(err){
			res.writeHead(500);
			res.end(err.toString());
		}else{
			res.end("删除成功");
		}
	});
});

//修改
app.post('/edit',function(req,res){
	db.query("update "+req.body.table+" set password='"+req.body.password+
		"',name='"+req.body.name+"',email='"+req.body.email+
		"',address='"+req.body.address+
		"' where username='"+req.body.username+"'",
		function(err){
			if(err){
				res.writeHead(500);
				res.end(err.toString());
			}else{
				res.end("修改成功");
			}
	});
});

//查询
app.post('/search',function(req,res){
	db.query("select * from "+req.body.table+" where "+req.body.field+"='"+req.body.searchText+"'",function(err,rows){
		if(err){
			res.writeHead(500);
			res.end(err.toString());
		}else{
			if(rows.length===0){
				res.end("查询不到此数据");
			}else{
				res.writeHead(200,{"Content-Type":"application/json"});
				res.end(JSON.stringify(rows));
			}
		}
		
	});
});

app.listen(8888,function(err){
	if(err){
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:8888');
});


