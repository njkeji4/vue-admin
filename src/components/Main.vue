<template>	
		<el-container style="height:100%;min-height:100vh;">

			<el-aside :width="isCollapse?'50px':'200px'"><el-container style="height:100%;"> <!-- this style is very important-->
					
				<el-header 
					style=" background-color: #3c8dbc;
							color: #fff;
							font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
							font-weight: 300; line-height: 50px; height: 50px;">
							
					
					<span v-show="!isCollapse">Add LOGO here</span>
					<span v-show="isCollapse">LO</span>

				</el-header>

				<el-main class="side-menu">
					<el-menu :default-active="$route.path" unique-opened router :collapse="isCollapse"
						style="background-color: transparent; border-right:none; height:100%;">

						<template v-for="(item,index) in sideMenuRouter" 
							v-if="sysUserInfo.role === 'ROLE_ADMIN' 
									|| (sysUserInfo.role !== 'ROLE_ADMIN' && !item.admin)
									|| (sysUserInfo.role === 'ROLE_AD' && item.admin === 2)">
							
							<el-submenu :index="index+''" v-if="item.children">
								<template slot="title" class="test">
									<i :class="item.iconCls"/>
									<span slot="title">{{item.title}}</span>
								</template>
								<el-menu-item v-for="(child, i) in item.children" :index="i+''" v-if="!child.hidden" @click="nav(item.path + '/' + child.path)">
									<i :class="child.iconCls"></i><span>{{child.title}}</span>
								</el-menu-item>
							</el-submenu>
							<el-menu-item v-else :index="index+''" @click.native="nav(item.path)" >
								<i :class="item.iconCls"></i><span>{{item.title}}</span>
							</el-menu-item>

						</template>
					</el-menu>
				</el-main>
				
			</el-container></el-aside>
			
			<el-container>

				<el-header style="background-color: #367fa9;color: #fff;
								 line-height: 50px;height: 50px;">
				
					
					<div style="float:left" >
						<i class="el-icon-s-fold pointer" v-show="!isCollapse" @click="collapse();"/>
						<i class="el-icon-s-unfold pointer" v-show="isCollapse" @click="collapse();"/>
					</div>

					<div style="float:right">
						<el-dropdown trigger="click">
							<span class="el-dropdown-link" style="color:white;">
								user admin<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>menu 1</el-dropdown-item>
								<el-dropdown-item>menu 2</el-dropdown-item>
								<el-dropdown-item>menu 3</el-dropdown-item>
								<el-dropdown-item disabled>menu</el-dropdown-item>
								<el-dropdown-item divided>menu 4</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>

				</el-header>

				<el-main style="background-color: #ecf0f5; box-sizing: border-box;">
					
					<transition name="fade" mode="out-in">
						<router-view/>
					</transition>

				</el-main>

				<el-footer style="line-height: 40px; height: 40px; 
							border-top:1px solid #d2d6de; text-align: left;">
						Copyright © 2014-2016  All rights reserved. 
				</el-footer>

			</el-container>

		</el-container>

</template>

<script>

	import axios from 'axios';
	import Vue from 'vue'
	import { mapGetters, mapActions } from 'vuex';
	import util from '../common/js/util';
	import { AdminAPI } from '../api';
	import { openModal } from '../common/js/modal';
	import SockJs from 'sockjs-client';
	import Stomp from 'stompjs';

	import ChangePassword from './changePassword';
	const openChangePasswordModal = openModal(ChangePassword);

	export default {
		data() {
			return {			
				isCollapse: false,
				sysUserInfo:{name:'demo',role:'ROLE_ADMIN'},
			}
		},
		computed: {

			sideMenuRouter() {
				var children = this.$router.options.routes[1].children;				
				return children;
			},
			//...mapGetters('login', {
			//	sysUserInfo: 'loginInfo'
			//}),
			
		},
		filters: {
			//formatRole
		},
		methods: {	
			...mapActions('login', ['logout', 'loadUserFromSession']),
			collapse(){
				this.isCollapse = !this.isCollapse;
			},
			 
			nav(path) {
				this.$router.push('/' + path);
			},
			
			//退出登录
			handleLogout() {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					AdminAPI.logout().then(({
						data
					}) => {
						_this.logout();
						_this.$router.replace('/login');
					}).catch(() => {});
				}).catch(() => {});
			},
			changePassword(){
				openChangePasswordModal({
					data: {
						username: this.sysUserInfo.name
					}
				}).then((data) => {
					if(data) {
						this.$message({
							type: 'success',
							message: '密码修改成功!'
						});
					}
				}).catch(() => {
					this.$message.error('密码修改异常!');
				});
			},		
			
			handleCommand(command) {				
				if(command === 'logout') {
					this.handleLogout();
				}
				if(command === 'changePwd'){
					this.changePassword();
				}
			},
			connectToWebsocket(){
				var socket = new SockJs(AdminAPI.websocketurl);
				var stompClient = Stomp.over(socket);
				stompClient.connect({}, () => {
					//stompClient.send("/app/hello", {}, 'hello');
					stompClient.subscribe('/topic/greetings/'+this.sysUserInfo.name,(msg) => {
						this.openAlarm(msg);
					});
				}, (err) => {
					console.log("err:" + err);
				});
			},
			openAlarm(msg){
				this.$alert("有新告警",'告警',{confirmButtonText:'确定'});
				document.getElementById("alarmAudio").play();	

				//console.log("get alarm==========");
				this.$router.push({
					path: '/alarm?'+Date.now()
				});		
			},

		},
		created() {
			//this.connectToWebsocket();
		},
		mounted() {
			//if(!this.loadUserFromSession()) {
			//	this.$router.replace('/login');
			//}			
		}
	}
</script>

<style lang="scss">
	.el-aside{
		overflow-x:hidden;
	}
	.el-main{
		height:100%;
	}

	/******** start to define side menu CSS */
	.side-menu{
		background-color: #222d32;
		padding-left:0px;
		padding-right:0px;
	}
	
	/* menu item   */
	.el-menu-item , .el-menu-item.is-active{  /* to fix the issue of elementui*/
		color: #8aa4af;
		text-align:left;
		padding-left:15px !important;
	}
	.el-menu-item:hover{
		color:white;
		background-color: rgb(30, 40, 44);
	}
	.el-menu-item:focus{
		background-color: rgb(30, 40, 44);
		color:white;	
	}

	/* sub menu   */
	.el-submenu{
		text-align:left;
		
		.el-menu--inline{
			margin-left:20px;
		}
	}
	.el-submenu__title{
		color:#8aa4af;
		padding-left:15px !important;
	}
	.el-submenu__title:hover{
		color:white;
		background-color: rgb(30, 40, 44);
	}
	.el-submenu__title:focus{
		color:white;
		background-color: rgb(30, 40, 44);
	}
	.el-menu{
		background-color:transparent;
	}

	.el-menu--collapse{
		width:50px !important;
	}
	.el-menu--popup{
		background-color: #222d32 !important;
		margin-left:0px !important;
	}
	
	/******* end */

	.el-dropdown-link {
		cursor: pointer;		
	}
	.el-icon-arrow-down {
		font-size: 12px;
	}
	.pointer{
		cursor: pointer;
		font-size:30px;
		line-height:50px;
		height:50px;
	}
	
	
</style>