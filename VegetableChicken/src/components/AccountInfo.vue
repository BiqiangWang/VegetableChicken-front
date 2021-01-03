<template>
	<div>
		<el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="150" :class="['avator']">
		</el-avatar>
		<p style="position: absolute; left: 320px; top: 40px" :class="['word']">
			用户名：
		</p>
		<p v-text="account" v-if="isEditable == false" style="position: absolute; left: 400px; top: 35px; font-size: 25px"></p>
		<el-input size="mini" id="modifyAccount" v-model="input" placeholder="请输入新用户名" v-if="isEditable == true" style="width: 200px; position: absolute; left: 400px; top: 60px">
		</el-input>
		<el-button size="mini" type="success" style="position: absolute; left: 620px; top: 60px" v-on:click="changeAccount()"
		 v-if="isEditable == true">确认</el-button>
		<el-button type="primary" icon="el-icon-edit" size="small" circle v-show="isEditable == false" v-on:click="editName()"
		 style="position: absolute; left: 470px; top: 59px"></el-button>
		<p style="position: absolute; left: 320px; top: 80px" :class="['word']">
			密码：
		</p>
		<el-button type="warning" v-show="isPSWChange == false" style="position: absolute; left: 380px; top: 100px" size="mini"
		 v-on:click="editPassword()">点击修改密码</el-button>
		<el-input type="password" size="mini" v-model="input2" placeholder="请输入原密码" v-if="isPSWChange == true" style="width: 150px; position: absolute; left: 380px; top: 100px"></el-input>
		<el-button size="mini" type="success" style="position: absolute; left: 500px; top: 100px" v-on:click="validateOriginPSW()"
		 v-if="isPSWChange == true">确认</el-button>
		<el-input type="password" size="mini" v-model="input3" placeholder="请输入新密码" v-if="isChangePSWAvailable == true" style="width: 150px; position: absolute; left: 380px; top: 100px"></el-input>
		<el-button size="mini" type="success" style="position: absolute; left: 500px; top: 100px" v-on:click="changePSW()"
		 v-if="isChangePSWAvailable == true">确认</el-button>
		<p style="position: absolute; left: 320px; top: 120px" :class="['word']">
			编辑个人信息
		</p>
		<el-switch v-model="changeBasicInfo" @change="summitInfo" active-color="#13ce66" inactive-color="#ff4949" style="position: absolute; left: 450px; top: 143px"></el-switch>
		<p style="position: absolute; left: 320px; top: 160px" :class="['word']">
			手机号：
		</p>
		<el-input size="mini" v-model="telephone" style="width: 150px; position: absolute; left: 400px; top: 180px" :disabled="!changeBasicInfo"></el-input>
	</div>
</template>

<script>
	export default {
		name: "AccountInfo",
		data: function() {
			return {
				id: 1,
				times: 0,
				account: "haha",
				psw: "",
				isEditable: false,
				input: "",
				input2: "",
				input3: "",
				isPSWChange: false,
				isChangePSWAvailable: false,
				changeBasicInfo: false,
				telephone: "asd",
				status: 0,
				success: false,
			};
		},
		methods: {
			editName: function() {
				this.isEditable = true;
			},
			changeAccount: function() {
				this.account = this.input;
				console.log("after modify" + this.account);
				this.changeInfo("name");
			},
			editPassword: function() {
				this.isPSWChange = true;
			},
			validateOriginPSW: function() {
				if (this.psw == this.input2) {
					this.isPSWChange = false;
					this.isChangePSWAvailable = true;
				} else {
					this.$alert("请输入正确的原密码！", "密码输入错误", {
						confirmButtonText: "确定",
						callback: (action) => {
							this.isPSWChange = false;
						},
					});
				}
			},
			changePSW: function() {
				this.changeInfo("password");
				this.isChangePSWAvailable = false;
			},

			summitInfo(callback) {
				if (callback == false && this.times !== 0) {
					this.changeInfo("info");
				}
				this.times++;
			},

			getInfo() {
				var url = "http://localhost:8701/user/viewinfo";
				this.$http
					.get(
						url, {
							params: {
								userid: this.id,
							},
						}, {
							emulateJSON: true,
						}
					)
					.then((response) => {
						this.account = response.data.data.items[0].username;
						this.psw = response.data.data.items[0].userpwd;
						this.telephone = response.data.data.items[0].userphone;
						this.status = response.data.data.items[0].userstatus;
					});
			},

			changeInfo(type) {
				var url = "http://localhost:8701/user/changeinfo";
				this.$http
					.get(
						url, {
							params: {
								userid: this.id,
								username: this.account,
								userphone: this.telephone,
								userpwd: this.psw,
							},
						}, {
							emulateJSON: true,
						}
					)
					.then((response) => {
						if (type == "name") {
							if (response.data == 1) {
								this.$alert("您已成功修改个人信息！", "修改成功", {
									confirmButtonText: "确定",
									callback: (action) => {},
								});
							} else {
								this.$alert("请检查修改的个人信息格式是否正确！", "修改失败", {
									confirmButtonText: "确定",
									callback: (action) => {},
								});
							}
							this.isEditable=false;
						}
						if (type == "info") {
							if (response.data == 1) {
								this.$alert("您已成功修改个人信息！", "修改成功", {
									confirmButtonText: "确定",
									callback: (action) => {},
								});
							} else {
								this.$alert("请检查修改的个人信息格式是否正确！", "修改失败", {
									confirmButtonText: "确定",
									callback: (action) => {},
								});
							}
						}
						if (type == "password") {
							var temp = this.psw;
							this.psw = this.input3;
							if (response.data == 1) {
								this.$alert("修改密码成功！", "修改成功", {
									confirmButtonText: "确定",
									callback: (action) => {},
								});
							} else {
								this.psw = temp;
								this.$alert("修改密码失败！", "修改失败", {
									confirmButtonText: "确定",
									callback: (action) => {},
								});
							}
							this.input3 = "";
						}
					});
			},
		},

		mounted() {
			this.getInfo();
		},
	};
</script>
