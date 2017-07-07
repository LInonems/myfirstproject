<template>
	<div class="searchBox">
		<input type="text" placeholder="姓名" v-model.trim="searchText">
		<button class="btn btn-primary"  @click="search">查询</button>
		<button class="btn btn-primary"  data-toggle="modal" data-target="#add" >新增</button>
		<modal identity="add">
			<h4 slot="title" class="modal-title">新增</h4>
			<useradd slot="content" ref="addData"></useradd>
			<button slot="button" type="button" class="btn btn-primary" data-dismiss="modal" @click="add">确定</button>
		</modal>
	</div>
</template>

<script>
	import modal from './modal.vue';
	import useradd from './add/userAdd.vue';
	export default{
		components:{
			modal,useradd
		},
		data (){
			return {
				searchText:"",
				searchFiled:{
					"user":"username",
					"seller":"",
					"order":"",
					"product":"",
					"address":""
				}
			};
		},
		methods:{
			search:function(){
				this.axios.post('/search',{
					"table":this.$route.path.slice(9),
					"field":this.searchFiled[this.$route.path.slice(9)],
					"searchText":this.searchText
				})
				.then((res)=>{
					if(res.data==="查询不到此数据"){
						alert(res.data);
					}else{
						this.$emit('search',res.data);
					}
				})
				.catch((err)=>{
					alert(err);
				});
			},
			add:function(){
				var json=(this.$refs.addData.json);
				json.table=this.$route.path.slice(9);
				this.axios.post('/add',json)
					.then((res)=>{
						this.$router.go(0);
						this.$emit('tips',{show:true,tips:"添加成功"});
					})
					.catch((err)=>{
						alert("添加失败");
					});
			},
			tips:function(){
			}
		}
	};
</script>

<style>
	.searchBox{
		width:100%;
		padding:10px;
		background-color:#f2f2f2;
		margin-bottom:10px;
	}
	.searchBox input{
		width:200px;
		padding:2px 5px;
	}
	.searchBox button{
		margin-left:15px;
	}
</style>