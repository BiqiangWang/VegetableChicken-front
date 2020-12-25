<template>
	<div id="myExpress_page">
		<div id="myExpress_head">我的快递</div>

  <el-table
    ref="filterTable"
    :data="tableData"

    style="width: 60%;margin-left:20%">
    <el-table-column
      prop="date"
      label="日期"
      width="180"
      column-key="date"
    >
    </el-table-column>
	  <el-table-column
      prop="date"
      label="商品名称"
      width="180"
      column-key="name"
    >
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      :formatter="formatter">
    </el-table-column>

    <el-table-column
      prop="tag"
      label="标签"
      width="100"
      :filters="[{ text: '圆通', value: '圆通' }, { text: '百世', value: '百世' }, { text: '天天', value: '天天' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.tag === '圆通' ? 'primary' : 'success'"
          disable-transitions>{{scope.row.tag}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
		<div id="myExpress_bottom">
			
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {
			
				
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
