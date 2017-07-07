import Vue from 'vue';
import VueRouter from 'vue-router';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Login from './components/login.vue';
import Manager from './components/manager.vue';
import User from './components/user.vue';
import Seller from './components/seller.vue';
import Order from './components/order.vue';
import Product from './components/product.vue';
import Address from './components/address.vue';

Vue.use(VueRouter);
Vue.use(VueAxios,axios);

const router=new VueRouter({
	routes:[
			{
				path:'/',
				component:Login
			},
			{
				path:"/manager",
				component:Manager,
				children:[
					{
						path:"/manager",
						redirect:"/manager/user"
					},
					{
						path:"/manager/user",
						component:User,
					},
					{
						path:"/manager/seller",
						component:Seller,
					},
					{
						path:"/manager/order",
						component:Order,
					},
					{
						path:"/manager/product",
						component:Product,
					},
					{
						path:"/manager/address",
						component:Address,
					},

				]
			}	
		]
});


new Vue({
	el:'#app',
	data:{},
	methods:{},
	router
});