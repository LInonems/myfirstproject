<template>
	<div id="login" class="login">
		<h3>管理员登录页面</h3>
		<div class="form-group">
			<label for="username">用户名</label>
			<input type="text" class="form-control" id="username" placeholder="请输入管理员账号" v.model.trim="username">
		</div>
		<div class="form-group">
			<label for="password">密码</label>
			<input type="password" class="form-control" id="password" placeholder="请输入密码" v-model.trim="password">
		</div>
		<div class="checkbox">
			<label>
				<input type="checkbox" v-model="remind">记住密码
			</label>
		</div>
		<button class="btn btn-lg btn-primary btn-block" @click="login">登录</button>
	</div>
</template>

<script>
	export default{
		data (){
			return {
				password:"",
				username:"",
				remind:false
			};
		},
		methods:{
			login:function(){
				this.axios.post('/login',{
					"password":this.password,
					"username":this.username
				})
				.then((res)=>{
					if(res.status===200){
						this.$router.push({path:'/manager'});
					}else{
						alert("用户名或者密码错误");
					}
				})
				.catch((err)=>{
					alert(err);
				});
			}
		}
	};
</script>

<style>
	.login{
		margin:200px auto;
		width:400px;
		height:350px;
		padding:50px;
		box-shadow: 0px 0px 15px #0CC;
	}
	.login h3{
		text-align:center;
		margin-bottom:20px;
	}
</style>