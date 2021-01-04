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
				<el-menu-item index="2" class="myProcess" v-if="islogin==true">
					<router-link tag="div" to="/MyExpress">我的快递</router-link>
				</el-menu-item>
				<el-menu-item index="3" class="tbProcess" v-if="istaobao==true">
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
		<router-view @changestate="change()" @getuserid="getid" @changetaobao="changetaobao()"></router-view>
	</div>
</template>

<script>
	import HelloWorld from './components/HelloWorld.vue'
	import MyExpress from './components/MyExpress.vue'
	import Register from './components/Register.vue'
	import ExpressInfo from './components/ExpressInfo.vue'
	import Push from 'push.js'

	export default {
		name: 'app',
		components: {
			HelloWorld,
			'MyExpress': MyExpress,
			Register
		},
		data() {
			return {
				hasNewMessage: false,
				activeIndex: '4',
				islogin: true,
				userid: 1,
				istaobao: false,
			}
		},
		created: function() {
			this.initWebSocket();
			this.heartbeat();
		},
		destroyed: function() {
			this.websocketclose();
		},

		methods: {
			heartbeat() {
				setInterval(this.getExpressList, 30000);
			},
			getExpressList() {
				var userid = this.user_id;
				this.GELajax = new XMLHttpRequest();
				this.GELajax.open("GET", "http://localhost:8705/express/myexpresslist?userid=" + "1", true);
				this.GELajax.setRequestHeader('Authorization', 'Bearer ');
				this.GELajax.onreadystatechange = this.GELsuccessfully;
				this.GELajax.send();
			},
			GELsuccessfully() {
				if (this.GELajax.readyState == 4 && this.GELajax.status == 200) {
					// console.log(this.GELajax.responseText);	
					// console.log(JSON.parse(this.GELajax.responseText));
					if (JSON.parse(this.GELajax.responseText).code == 20000) {
						//console.log(JSON.parse(this.GELajax.responseText).data);
						this.express = JSON.parse(this.GELajax.responseText).data.items;
						length = JSON.parse(this.GELajax.responseText).data.items.length;
						for (var i = 0; i < length; i++) {
							if (JSON.parse(this.GELajax.responseText).data.items[i].expressstatus == "运输中") {
								// 								this.pushMessage("YT5078273557325");
								// 								this.updateExpressInfo(1, "YT5078273557325", "已签收", "客户签收人: 刘 已签收  感谢使用圆通速递，期待再次为您服务 如有疑问请联系：15186831728，投诉电话：0855-6230546");
								// 								//this.$refs.MyExpress.getExpressList;
								//console.log(JSON.parse(this.GELajax.responseText).data.items[i].expressid);
								this.getExpressInfo(JSON.parse(this.GELajax.responseText).data.items[i].expressid);
							}
						}
					}
				}
			},
			getExpressInfo(num) {
				this.GEIajax = new XMLHttpRequest();
				console.log(1);
				console.log(num);
				this.GEIajax.open("GET", "http://localhost:8020/search/search?num=" + num + "&cid=YTO", true);
				this.GEIajax.setRequestHeader('Authorization', 'Bearer ');
				this.GEIajax.onreadystatechange = this.GEIsuccessfully;
				this.GEIajax.send();
			},
			GEIsuccessfully() {
				if (this.GEIajax.readyState == 4 && this.GEIajax.status == 200) {
					console.log(JSON.parse(this.GEIajax.responseText).LogisticCode);
					if (JSON.parse(this.GEIajax.responseText).State == '3') {
						var uid = 1;
						var expressid = JSON.parse(this.GEIajax.responseText).LogisticCode;
						var status = "已签收";
						var list = JSON.parse(this.GEIajax.responseText).Traces;
						var info = list[list.length - 1].AcceptStation;
						var str = "";
						for (var j = 0; j < info.length; j++) {
							if (
								info[j] !== "【" &&
								info[j] !== "】"
							) {
								str += info[j];
							}
							if (info[j] === "【") {
								break;
							}
						}
						this.updateExpressInfo(uid, expressid, status, str);
						this.pushMessage(JSON.parse(this.GEIajax.responseText).LogisticCode);
					}

				}
			},
			updateExpressInfo(uid, expressid, status, detail) {
				this.UEIajax = new XMLHttpRequest();
				this.UEIajax.open("GET", "http://localhost:8705/express/updateexpress?userid=" + uid + "&expressid=" + expressid +
					"&expressstatus=" + status + "&expressdetail=" + detail, true);
				//this.UEIajax.setRequestHeader('Authorization', 'Bearer ');
				this.UEIajax.onreadystatechange = this.UELsuccessfully;
				this.UEIajax.send();
			},
			UEIsuccessfully() {
				if (this.UEIajax.readyState == 4 && this.UEIajax.status == 200) {

				}
			},
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			initWebSocket() {
				console.log("WebSocket连接中");
				this.websock = new WebSocket("ws:192.168.3.2:8706/zyf/websocket");
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
				this.pushMessage('单号：' + da);
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
			change: function() {
				this.islogin = true;
			},
			getid: function(evtValue) {
				this.userid = evtValue;
			},
			changetaobao: function() {
				if (this.istaobao == true) {
					this.istaobao = false;
				} else {
					this.istaobao = true;
				}
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

	.myspace {
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
