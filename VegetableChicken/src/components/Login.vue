<template>
	<div id="Login_page_container">
		<img id="Login_logo" src="../assets/logo_blue.png"/>
		<div id="Login_login_container">
			<div id="Login_tilte">登录</div>
			<el-row id="Login_account_container">
					<el-col :span="4" :offset="5" id="Login_account_title">账号</el-col>
					<el-col :span="8">
						<el-input id="Login_account_input" v-model="input_account"></el-input>
					</el-col>
			</el-row>
			<el-row id="Login_password_container">
					<el-col :span="4" :offset="5" id="Login_password_title">密码</el-col>
					<el-col :span="8">
						<el-input id="Login_password_input" v-model="input_password" show-password></el-input>
					</el-col>
			</el-row>
			<el-row id="Login_btn_container">
					<el-button type="primary" id="Login_login_btn">登录</el-button>
					<el-button type="primary" id="Login_register_btn"><router-link tag="div" to="/Register">去注册</router-link></el-button>
			</el-row>
		</div>
	</div>
</template>

<script>
	export default {
    data() {
      return {
        input_account: '',
		input_password: ''
      }
    }
  }
</script>

<style>
	#Login_page_container {
		width: 100%;
		height: 789px;
		background-color: #027AFF;
		text-align: center;
	}

	#Login_login_container {
		margin: auto;
		position: relative;
		width: 35%;
		height: 350px;
		background-color: #FFFFFF;
		text-align: center;
		border-radius: 20px;
	}

	#Login_tilte {
		position: relative;
		top: 30px;
		font-family: "microsoft yahei";
		font-size: 44px;
	}
	
	#Login_account_container {
		position: relative;
		top: 50px;
	}
	
	#Login_password_container {
		position: relative;
		top: 60px;
	}
	
	#Login_btn_container {
		position: relative;
		top: 90px;
	}
	
	#Login_account_title {
		font-family: "microsoft yahei";
		font-size: 20px;
	}
	
	#Login_password_title {
		font-family: "microsoft yahei";
		font-size: 20px;
	}
	
	#Login
	
	.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
	
	.el-col {
	  border-radius: 4px;
	}
	
  }
</style>
