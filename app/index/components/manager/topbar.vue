<template>
	<div class="topbar" id="topbar">
		<span class="title">电商网站管理页面</span>
		<div class="managerInfo">
			<img :src="iconPic" alt="隐藏左边的导航栏" class="icon">
			<div class="manager fr" @mouseover="showInfo" @mouseout="hideInfo">
				<span>{{managerName}}</span>
				<img :src="headPic" class="head">
				<ul class="list-unstyled" v-show="show">
					<li><a href="javascript:void(0);">个人设置</a></li>
					<li><a href="javascript:void(0);" @click="loginout">退出登录</a></li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	import headUrl from 'assets/head.jpg';
	import iconUrl from 'assets/icon.png';
	export default{
		data (){
			return {
				headPic:headUrl,
				iconPic:iconUrl,
				show:false,
				managerName:"张泽轩"
			};
		},
		methods:{
			showInfo:function(){
				this.show=true;
			},
			hideInfo:function(){
				this.show=false;
			},
			loginout:function(){

			}
		}
	}
</script>

<style>
	#topbar{
		height:60px;
		line-height:60px;
		background-color:#20a0ff;
		color:#FFF;
	}
	#topbar .title{
		width:12%;
		float:left;
		text-align:center;
		font-size:18px;
		height:60px;
	}
	.managerInfo .icon{
		width:60px;
		height:60px;
		padding:22px;
		display:inline-block;
		cursor: pointer;
	}
	.manager{
		position:relative;

	}
	.manager img{
		width:40px;
		height:40px;
		margin:0 40px 0 20px;
		border-radius:20px;
		cursor:pointer;
	}
	.manager span{
		cursor:pointer;
	}
	.manager ul{
		width:80px;
		height:80px;
		background-color:#fff;
		color:black;
		line-height:40px;
		position:absolute;
		box-shadow: 0px 0px 15px #0CC;
		text-align:center;
		right:30px;
		z-index:100;
	}
	.manager ul li:first-child{
		border-bottom:1px solid #ccc;
	}
	.manager ul li a{
		text-decoration:none;
	}
	#manager{
		width:100%;
		height:100%;
	}
</style>