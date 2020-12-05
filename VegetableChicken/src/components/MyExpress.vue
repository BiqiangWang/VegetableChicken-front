<template>
	<div id="myExpress_page">
		<div id="myExpress_head">我的快递</div>
		<div id="myExpress_express_list">
			<div class="express_item" v-for="item in express" :key="item.id">
				<el-col :span="8">
					<img class="express_photo" src='../assets/logo_blue.png' />
				</el-col>
				<div class="express_right">
					<div class="express_state">{{item.state}}</div>
					<div class="express_commodity">{{item.commodity}}</div>
					<div class="express_position">{{item.position}}</div>
				</div>
			</div>
		</div>
		<div id="myExpress_bottom">
			
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
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
						commodity:"天猫|专营店c++",
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
	#myExpress_head{
		font-size: 44px;
		margin-bottom: 20px;
		margin-top: 83px;
	}
	#myExpress_express_list{
		width:500px;
		margin-left: 500px;
		background-color: white;
		border-radius: 10px;
	}
	.express_item{
		margin-bottom: 20px;
		height:200px;
		border-radius: 10px;
		border-style: solid;
		border-color: #ffff7f;
	}
	.express_photo{
		width: 200px;
		height: 200px;
		border-radius: 10px;
	}
	.express_right{
		width: 300px;
		height: 200px;
		margin-left: 200px;
	}
	.express_state{
		text-align: left;
		font-size: 36px;
		font-family: Microsoft YaHei;
		line-height: 80px;
	}
	.express_commodity{
		text-align: left;
		font-size: 30px;
		font-family: Microsoft YaHei;
		line-height: 65px;
		margin-top:-10px;
		overflow: hidden;       /* 超出内容隐藏 */
		white-space: nowrap;     /* 设置不换行 */
		text-overflow: ellipsis;   /* 超出显示省略号 */
	}
	.express_position{
		text-align: left;
		font-size: 22px;
		font-family: Microsoft YaHei;
		line-height: 55px;
		overflow: hidden;       /* 超出内容隐藏 */
		white-space: nowrap;     /* 设置不换行 */
		text-overflow: ellipsis;   /* 超出显示省略号 */
	}
	
	#myExpress_bottom{
		position: fixed;
		bottom:0px;
		width: 500px;
		height: 100px;
		margin-left: 500px;
	/* 	background-color: #000000; */
	}
</style>
