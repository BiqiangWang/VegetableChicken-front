<template>
	<div id="app">
		<div class="navigation">
			<img src="./assets/logo_blue.png" class="logo" />
			<p class="title">VegetableChicken</p>
			<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
			 background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
				<el-menu-item index="1" class="searchProcess">
					<router-link tag="div" to="/SearchExpress">查询快递</router-link>
				</el-menu-item>
				<el-menu-item index="2" class="myProcess">
					<router-link tag="div" to="/MyExpress">我的快递</router-link>
				</el-menu-item>
				<el-menu-item index="3" class="tbProcess">
					<router-link tag="div" to="/TbExpress">某宝快递</router-link>
				</el-menu-item>
				<el-menu-item index="4" class="login" v-if="islogin==false">
					<router-link tag="div" to="/Login">登录</router-link>
				</el-menu-item>
				<el-menu-item index="5" class="register" v-if="islogin==false">
					<router-link tag="div" to="/Register">注册</router-link>
				</el-menu-item>
				<el-menu-item index="6" class="myspace" v-if="islogin==true">
					<router-link tag="div" to="/MySpace">个人中心</router-link>
				</el-menu-item>
			</el-menu>
		</div>
		<router-view></router-view>

	</div>
</template>

<script>
	import HelloWorld from './components/HelloWorld.vue'
	import MyExpress from './components/MyExpress.vue'
	import Register from './components/Register.vue'
	import Push from 'push.js'

	export default {
		name: 'app',
		components: {
			HelloWorld,
			MyExpress,
			Register
		},
		data() {
			return {
				hasNewMessage: false,
				activeIndex: '4',
				islogin:false,
			}
		},
		created: function() {
			this.initWebSocket();
		},
		destroyed: function() {
			this.websocketclose();
		},
		mounted: function() {
			if (this.hasNewMessage) {
				this.pushMessage('单号：XXXXXXX');
				this.hasNewMessage = false;
			}
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			initWebSocket() {
				console.log("WebSocket连接中");
				this.websock = new WebSocket("ws:100.68.230.26:8706/zyf/websocket");
				this.websock.onopen = this.websocketonopen;
				this.websock.onerror = this.websocketonerror;
				this.websock.onmessage = this.websocketonmessage;
				this.websock.onclose = this.websocketclose;
			},
			websocketonopen() {
				console.log("WebSocket连接成功");
			},
			websocketonerror(e) {
				console.log("WebSocket连接发生错误");
			},
			websocketonmessage(e) {
				var da = e.data;
				console.log(da);
				this.hasNewMessage = true;
				this.pushMessage('单号：XXXXXXX');
			},
			websocketclose(e) {
				console.log("connection closed (" + e.code + ")");
			},
			//推送弹框消息
			pushMessage(message) {
				Push.create("快递已送达", {
					body: message,
					requireInteraction: true,
					//icon: '/icon.png',
					timeout: 600000,
				});
			},
		}
	}
</script>

<style>
	#app {
		/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px; */
	}

	.navigation {
		position: fixed;
		width: 100%;
		height: 63px;
		left: 0px;
		top: -1px;
		background: #545c64;
		z-index: 5;
	}

	.logo {
		position: absolute;
		width: 38px;
		height: 38px;
		left: 25px;
		top: 10px;
	}

	.title {
		position: absolute;
		width: 173px;
		height: 33px;
		left: 81px;
		top: 15px;
		margin-top: 0%;
		font-family: Lucida Handwriting;
		font-style: italic;
		font-weight: normal;
		font-size: 24px;
		line-height: 33px;
		color: #ffffff;
	}

	.searchProcess {
		position: absolute;
		width: 112px;
		height: 24px;
		left: 400px;
		font-size: 18px;
		line-height: 24px;
		text-decoration-line: none;
		color: #ffffff;
		cursor: pointer;
	}

	.myProcess {
		position: absolute;
		width: 112px;
		height: 24px;
		left: 550px;
		font-size: 18px;
		line-height: 24px;
		text-decoration-line: none;
		color: #ffffff;
		cursor: pointer;
	}
	
	.tbProcess {
		position: absolute;
		width: 112px;
		height: 24px;
		left: 700px;
		font-size: 18px;
		line-height: 24px;
		text-decoration-line: none;
		color: #ffffff;
		cursor: pointer;
	}

	.login {
		position: absolute;
		width: 78px;
		height: 24px;
		left: 1350px;
		font-size: 18px;
		line-height: 24px;
		text-decoration-line: none;
		color: #ffffff;
		cursor: pointer;
	}

	.register {
		position: absolute;
		width: 78px;
		height: 24px;
		left: 1430px;
		font-size: 18px;
		line-height: 24px;
		text-decoration-line: none;
		color: #ffffff;
		cursor: pointer;
	}
	.myspace{
		position: absolute;
		width: 108px;
		height: 24px;
		left: 1380px;
		font-size: 18px;
		line-height: 24px;
		text-decoration-line: none;
		color: #ffffff;
		cursor: pointer;
	}
</style>
