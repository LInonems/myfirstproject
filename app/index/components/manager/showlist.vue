<template>
	<div id="showlist">
		<h5>{{tableName}}</h5>
		<searchbox @search="searchData" @tips="tipsShow"></searchbox>
		<transition name="fade">
			<router-view :searchData="data" :datalist="showdatalist" @tips="tipsShow"  @button="buttonShow"></router-view>
		</transition>
		<foot :datalist="datalist" :disabled="disabled" :dellist="delList" @showData="showData" ></foot>
		<transition name="fade">
			<div v-if="show" class="tips">{{tips}}</div>
		</transition>
	</div>
</template>

<script>
	import searchbox from "./showlist/searchBox.vue";
	import foot from "./showlist/foot.vue";
	export default{
		components:{
			searchbox,foot
		},
		data (){
			return {
				tableName:"用户列表",
				data:null,
				tablelist:{
					"user":"用户列表",
					"seller":"商家列表",
					"order":"订单列表",
					"product":"商品列表",
					"address":"地址列表"
				},
				show:false,
				tips:"",
				datalist:[],
				showdatalist:[],
				disabled:"disabled",
				delList:[]
			};
		},
		mounted(){
			this.table();
		},
		methods:{
			searchData:function(data){
				this.data=data;
				console.log(this.data);
			},
			table:function(){
				this.tableName=this.tablelist[this.$route.path.slice(9)];
				this.axios.get('/user')
					.then((res)=>{
						this.datalist=res.data.reverse();
					})
					.catch((err)=>{
						alert(err);
					});
			},
			tipsShow:function(data){
				this.show=data.show;
				this.tips=data.tips;
			},
			buttonShow:function(data){
				if(data!="disabled"){
					this.disabled=null;
					this.delList=data;
				}else{
					this.disabled="disabled";
				}
			},
			showData:function(data){
				this.showdatalist=data;
			}
		},
		watch:{
			'$route':'table'
		}
	}
</script>

<style>
	#showlist{
		width:88%;
		float:right;
		padding:15px;
		padding-right:25px;
		height:93.5%;
		overflow:auto;
		position:relative;
	}
	h5{
		padding-left:5px;
	}
	.tips{
		background-color:#f40;
		color:#FFF;	
		padding:3px;
		position:absolute;
		text-align:center;
		top:20px;
		left:50%;
		z-index:100;
	}
</style>