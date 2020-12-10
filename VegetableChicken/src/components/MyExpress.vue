<template>
	<div id="myExpress_page">
		<el-col :span="16">
			<div id="myExpress_left">
				<div id="myExpress_user_info">
					<div id="myExpress_info_up">
						<el-col :span="8" :push="1">
							<p id="myExpress_id">{{nick_name}}({{user_id}})</p>
						</el-col>
						<el-col :span="6" :push="9">
							<el-button id="myExpress_personal">个人中心</el-button>
						</el-col>
					</div>
					<div id="myExpress_info_down">
						<el-col :span="8">
							<p id="myExpress_to_be_shipped">待发货</p>
							<p id="myExpress_to_be_shipped_num" v-if="shipped>0">{{shipped}}</p>
						</el-col>
						<el-col :span="8">
							<p id="myExpress_to_be_received">待收货</p>
							<p id="myExpress_to_be_received_num" v-if="received>0">{{received}}</p>
						</el-col>
						<el-col :span="8">
						    <p id="myExpress_to_be_evaluate">待评价</p>
							<p id="myExpress_to_be_evaluate_num" v-if="evaluate>0">{{evaluate}}</p>
						</el-col>
					</div>
				</div>
				<div id="myExpress_good_info">
					<div id="myExpress_good_up">
						<el-col :span="1" :push="1">
							<img id="myExpress_good_logo" src="../assets/good.png"/>
						</el-col>
						<el-col :span="3" :push="1">
							<p id="myExpress_good_title">我的快递</p>
						</el-col>
					</div>
					<div id="myExpress_express_list">
						<div class="express_item" v-for="item in express" :key="item.id">
							<el-col :span="4">
								<img class="express_photo" src='../assets/logo_blue.png' />
							</el-col>
							<div class="express_right">
								<div class="express_state">{{item.state}}</div>
								<div class="express_commodity">{{item.commodity}}</div>
								<div class="express_position">{{item.position}}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</el-col>
		<el-col :span="8">
			<div id="myExpress_right">
				<div id="myExpress_advertising">
					<a href="https://www.taobao.com/">
					<img id="myExpress_advertising_photo" border="0" src="../assets/taobao.jpg" />
					</a>
				</div>
			</div>
		</el-col>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				user_id:"cn1234567",
				nick_name:"panpan",
				shipped:0,
				received:1,
				evaluate:0,
				express:[
					{
						id:1,
						photo:"",
						state:"已签收",
						commodity:"淘宝|学术英语与论文写作xxxxxxxxxxxxx",
						position:"【百世快递】:客户已取件"
					},
					{
						id:2,
						photo:"",
						state:"运输中",
						commodity:"天猫|专营店c++巴拉巴拉巴拉巴拉巴拉巴拉",
						position:"【申通快递】:上海转运中心"
					}
				]
			}
		}
	}
</script>

<style>
	#myExpress_page{
		width: 100%;
		height: 1000px;
		background-color: white;
		text-align: center;
	}
	#myExpress_left{
		width:756px ;
		margin-left:200px;
		margin-top: 80px;
	}
	#myExpress_user_info{
		width:756px ;
		height: 126px;
	    border: 1px solid #e4eaee;
	    font-size: 12px;
	    color: #4b4b4b;
	}
	#myExpress_info_up{
		width: 756px;
		height: 72px;
		background: #f5f8fa;
		border-bottom: 1px solid #e4eaee;
	}
	#myExpress_id{
		margin-top: 25px;
	}
	#myExpress_personal{
		margin-top: 15px;
	}
	#myExpress_info_down{
		width: 756px;
		height: 40px;
	}
	#myExpress_to_be_shipped{
		margin-top: 16px;
		border-left: 1px solid #e4eaee
	}
	#myExpress_to_be_shipped_num{
		margin-top: -28px;
		margin-left: 58px;
	}
	#myExpress_to_be_received{
		margin-top: 16px;
		border-left: 1px solid #e4eaee
	}
	#myExpress_to_be_received_num{
		margin-top: -28px;
		margin-left: 58px;
	}
	#myExpress_to_be_evaluate{
		margin-top: 16px;
		border-left: 1px solid #e4eaee
	}
	#myExpress_to_be_evaluate_num{
		margin-top: -28px;
		margin-left: 58px;
	}
	#myExpress_good_info{
		width:780px;
		margin-top: 40px;
	}
	#myExpress_good_up{
		height: 44px;
		background: #f5f8fa;
		border-bottom: 1px solid #e4eaee;
	}
	#myExpress_good_logo{
		width: 45px;
		height: 45px;
	}
	#myExpress_good_title{
		margin-top: 10px;
	}
	#myExpress_express_list{
		margin-top: 15px;
		width:780px;
		border-radius: 10px;
	}
	.express_item{
		margin-bottom: 20px;
		height:130px;
		border-radius: 10px;
		border-style: solid;
		border-color: #e4eaee;
	}
	.express_photo{
		width: 130px;
		height: 130px;
		border-radius: 10px;
	}
	.express_right{
		width: 530px;
		height: 130px;
		margin-left: 150px;
	}
	.express_state{
		text-align: left;
		font-size: 26px;
		font-family: Microsoft YaHei;
		line-height: 54px;
	}
	.express_commodity{
		text-align: left;
		font-size: 22px;
		font-family: Microsoft YaHei;
		line-height: 48px;
		margin-top:-10px;
		overflow: hidden;       /* 超出内容隐藏 */
		white-space: nowrap;     /* 设置不换行 */
		text-overflow: ellipsis;   /* 超出显示省略号 */
	}
	.express_position{
		text-align: left;
		font-size: 20px;
		font-family: Microsoft YaHei;
		line-height: 36px;
		overflow: hidden;       /* 超出内容隐藏 */
		white-space: nowrap;     /* 设置不换行 */
		text-overflow: ellipsis;   /* 超出显示省略号 */
	}
	#myExpress_right{
		width: 340px;
		margin-left: 80px;
	}
	#myExpress_advertising{
		margin-top: 80px;
		border-radius: 20px;
		border: 1px solid #e4eaee;
	}
	#myExpress_advertising_photo{
		width: 300px;
		height: 200px;
		
	}
</style>
