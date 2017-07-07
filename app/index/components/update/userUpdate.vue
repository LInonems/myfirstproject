<template>
	<form class="form-horizontal">
		<inputcom>
			<span slot="label">用户名:</span>
			<input  type="text" class="form-control" placeholder="请输入用户名" :value="username" readonly="readonly">
		</inputcom>
		<inputcom>
			<span slot="label">密码:</span>
			<input type="text" class="form-control" placeholder="请输入8-16位密码" v-model.trim="password" >
		</inputcom>
		<inputcom>
			<span slot="label">昵称:</span>
			<input type="text" class="form-control" placeholder="请输入昵称" v-model.trim="name">
		</inputcom>
		<inputcom>
			<span slot="label">邮箱:</span>
			<input type="email" class="form-control" placeholder="请输入邮箱" v-model.trim="email">
		</inputcom>
		<inputcom>
			<span slot="label">地址:</span>
			<input type="text" class="form-control" placeholder="请输入地址" v-model.trim="address">
		</inputcom>
	</form>
</template>

<script>
	import inputcom from './input.vue';
	export default{
		components:{
			inputcom
		},
		props:['data'],
		data(){
			return {
				username:"",
				password:"",
				name:"",
				email:"",
				address:"",
			};
		},
		watch:{
			data(value){
				this.username=value.username;
				this.password=value.password;
				this.name=value.name;
				this.email=value.email;
				this.address=value.address;
			}
		},
		computed:{
			json:function(){
				return {
					"username":this.username,
					"password":this.password,
					"name":this.name,
					"email":this.email,
					"address":this.address
				};
			}
		}

	}
</script>

<style scoped>
	input{
		width:450px;
	}
	span{
		font-weight:lighter;
	}
</style>