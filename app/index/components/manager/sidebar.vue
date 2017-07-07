<template>
	<div id="sidebar">
		<ul class="nav nav-pills nav-tacked">
			<li><router-link to="/manager/user">用户管理</router-link></li>
			<li><router-link to="/manager/seller">商家管理</router-link></li>
			<li><router-link to="/manager/order">订单管理</router-link></li>
			<li><router-link to="/manager/product">商品管理</router-link></li>
			<li><router-link to="/manager/address">地址管理</router-link></li>
		</ul>
	</div>
</template>

<script>
	export default{
		data (){
			return {

			};
		}
	}
</script>

<style>
	#sidebar{
		text-align: center;
		line-height:40px;
		width:12%;
		font-size:14px;
		background-color:#eef1f6;
		height:93.5%;
		float:left;
	}
	#sidebar ul{
		height:100%;
	}
	#sidebar ul li{
		float:none;
	}
	#sidebar a{
		color:#48576a;
		font-weight:400;
	}
	#sidebar a:hover{
		background-color:#d1dbe5;
	}
	.caret{
		margin-left:30px;
	}

</style>