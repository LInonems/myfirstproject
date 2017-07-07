<template>
	<div id="manager">
		<topbar></topbar>
		<sidebar></sidebar>
		<showlist></showlist>
	</div>
</template>

<script>
	import topbar from "./manager/topbar.vue";
	import sidebar from "./manager/sidebar.vue";
	import showlist from "./manager/showlist.vue";
	export default{
		components:{
			topbar,sidebar,showlist
		},
		data (){
			return {
			};
		}
	};
</script>

<style>
	#manager{
		width:100%;
		height:100%;
	}
	.fade-enter-active, .fade-leave-active {
	  transition: opacity .5s
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
	  opacity: 0
	}
</style>
