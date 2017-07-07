<template>
	<div id="foot">
		<button class="btn btn-danger" :disabled="disabled"  data-toggle="modal" data-target="#delAll" >批量删除</button>
		<ul class="pagination">
			<li><a href="javascript:void(0);" @click="pageUp" >&laquo</a></li>
			<li v-for="n in totalPage" @click="toPage(n)" :class="{active:activePage==n}"><a href="javascript:void(0);">{{n}}</a></li>
			<li><a href="javascript:void(0);" @click="pageDown" >&raquo;</a></li>
		</ul>
		<modal identity="delAll">
			<h4 slot="title" class="modal-title">删除</h4>
			<span slot="content">是否确定删除选中的数据？</span>
			<button slot="button" type="button" class="btn btn-danger" data-dismiss="modal" @click="del" >确定</button>
		</modal>
	</div>
</template>

<script>
	import modal from './modal.vue';
	export default{
		components:{
			modal
		},
		data (){
			return {
				totalPage:null,			//总页数
				activePage:null,			//当前页
				pageNum:20,				//每页显示多少个数据
				showdatalist:[]
			};
		},
		props:['datalist','disabled','dellist'],
		watch:{
			datalist(value){
				this.totalPage=Math.ceil(this.datalist.length/this.pageNum);
				if(this.totalPage==1){
					this.pageNum=this.datalist.length;
				}
				for(let i=0;i<this.totalPage;i++){
					this.showdatalist[i]=[];
					if(i==this.totalPage-1){
						this.pageNum=this.datalist.length%this.pageNum;
					}
					for(let j=0;j<this.pageNum;j++){
						this.showdatalist[i][j]=this.datalist[(i*20)+j];
					}
					if(i==this.totalPage-1){
						this.pageNum=20;
					}
				}
				this.activePage=1;
			},
			activePage(value){
				this.$emit('showData',this.showdatalist[this.activePage-1]);
			}
		},
		methods:{
			pageUp:function(){
				if(this.activePage!=1){
					this.activePage=this.activePage-1;
				}
			},
			toPage:function(index){
				this.activePage=index;
			},
			pageDown:function(){
				if(this.activePage!=this.totalPage){
					this.activePage=this.activePage+1;
				}
			},
			showData:function(){
			},
			del:function(){
				
			}
		}
	}
</script>

<style>
	#foot{
		background-color:#f2f2f2;
		text-align:center;
		width:100%;
		padding:10px;
		position:relative;
	}
	#foot ul{
		margin:0px;
	}
	#foot button{
		position:absolute;
		left:20px;
	}
	.on{
		background-color:#d1dbe5!important;
	}
</style>