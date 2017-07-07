<template>
	<div>
		<table class="table table-hover container">
			<thead>
				<tr class="info row" >
					<th>
						<input type="checkbox"  v-model="allChecked" class="check">
						<span>&nbsp;&nbsp;全选</span>
					</th>
					<th>#&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
					<th>用户名</th>
					<th>密码</th>
					<th>昵称</th>
					<th>邮箱</th>
					<th>地址</th>
					<th>创建时间</th>
					<th>操作</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(data,index) in tablelist" class="row" >
					<td>
						<input type="checkbox" :value="data.username" v-model="checkModel">
					</td>
					<td>{{index+1}}</td>
					<td class="col-md-1">{{data.username}}</td>
					<td class="col-md-1">{{data.password}}</td>
					<td class="col-md-1">{{data.name}}</td>
					<td class="col-md-2">{{data.email}}</td>
					<td class="col-md-3">{{data.address}}</td>
					<td class="col-md-2">{{data.time}}</td>
					<td class="col-md-1">
						<button class="btn btn-default btn-sm" @click="editIndex(index)" data-toggle="modal" data-target="#edit">编辑</button>
						<button class="btn btn-danger btn-sm" @click="delIndex(index)"  data-toggle="modal" data-target="#del" >删除</button>
					</td>
				</tr>
			</tbody>
		</table>
		<modal identity="del">
			<h4 slot="title" class="modal-title">删除</h4>
			<span slot="content">是否确定删除？</span>
			<button slot="button" type="button" class="btn btn-danger" data-dismiss="modal" @click="del" >确定</button>
		</modal>
		<modal identity="edit">
			<h4 slot="title" class="modal-title">修改</h4>
			<userupdate slot="content" :data="editData" ref="edit"></userupdate>
			<button slot="button" type="button" class="btn btn-primary" data-dismiss="modal" @click="edit" >确定</button>
		</modal>
	</div>
</template>

<script>
	import modal from './manager/showlist/modal.vue';
	import userupdate from './update/userUpdate.vue';
	export default{
		components:{
			modal,userupdate
		},
		data (){
			return {		
				loading:false,
				post:null,
				error:null,		
				checkModel:[],
				index:null,
				editData:{}
			};
		},
		props:['searchData','datalist'],
		computed:{
			//全选
			allChecked:{
				get:function(){
					return this.checkModel.length==this.tablelist.length;
				},
				set:function(value){
					if(value){
						this.checkModel=this.tablelist.map(function(item){
							return item.username;
						});
					}else{
						this.checkModel=[];
					}
				}
			},
			//判断是查询内容还是显示数据列表
			tablelist:{
				get:function(){
					if(this.searchData!==null){
						return this.searchData;
					}else{
						return this.datalist;
					}
				}
			}
		},
		watch:{
			checkModel(){
				if(this.checkModel.length!==0){
					this.$emit('button',this.checkModel);
				}else{
					this.$emit('button',"disabled");
				}
			},
			datalist(){
				this.checkModel=[];
			}
		},
		methods:{
			//修改
			editIndex:function(index){
				this.editData=this.datalist[index];
			},
			edit:function(){
				var json=this.$refs.edit.json;
				json.table=this.$route.path.slice(9);
				this.axios.post('/edit',json)
					.then((res)=>{
						this.$emit('tips',{show:true,tips:"修改成功"});
					})
					.catch((err)=>{
						alert(err)
					});
			},
			//删除
			delIndex:function(index){
				this.index=index;
			},
			del:function(){
				this.axios.post('/del',{
					"table":"user",
					"filed":"username",
					"content":this.datalist[this.index].username
				})
				.then((res)=>{
					this.datalist.splice(this.index,1);
					this.$emit('tips',{show:true,tips:"删除成功"});
				})
				.catch((err)=>{
					alert(err);
				});
			},
			tips:function(){
			},
			button:function(){
			}
		}
	};
</script>

<style scoped>
	td,th{
		vertical-align:middle !important;
		padding:10px 10px !important;
	}
	.info{
		background-color: #E4FFFF;
	}
	tr{
		border:1px solid #dfe6ec;
	}
	input[type=checkbox]{
		width:15px;
		height:15px;
		margin-left:10px;
	}
	.check{
		background-color:#20a0ff;
		border-color:#0190fe;
		font-color:#FFF;
	}
	table{
		margin:10px 0;
		background-color:#FFF!important;
	}
</style>