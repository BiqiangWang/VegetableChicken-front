<template>
<div>
  <!--左侧导航栏  用户名称ID 用户信息 我的快件-->
  <el-col span="8">
      <div>用户中心</div>
    <el-menu default-active="this.$route.path" 
    router
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose" 
    :collapse="isCollapse" 
    style="margin-top:40%">
      <el-menu-item index="MyInfo/infoManage">
        <i class="el-icon-setting"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="/MyInfo/myPackage">
        <i class="el-icon-menu"></i>
        <span slot="title">我的快件</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</div>
</template>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
  export default {
    data() {
      return {
        isCollapse: true,
        express:[],
          obj: {
    timestamp:"",
    packname:"",
    address:"",
    company:""
      },
      };
    },
    mounted()
    {
      this.getexpress();
    },
    methods: {
      getexpress()
      {
          const url='http://localhost:8083/searchmy'
          this.$http.get(url+params,{params:{name:name}})
          .then((response)=>
            {
                var json=response.body//从接口处获取快递列表 包括时间 快递名称 地址 快递公司
                //分解json数据 return express
                this.express=json
                  this.$set(this.obj, "timestamp", response.data.timestamp);
                  this.$set(this.obj, "packname", response.data.packname);
                  this.$set(this.obj, "address", response.data.address);
                  this.$set(this.obj, "company", response.data.company);
                })
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>