<template>
  <div class="main1">
    <el-card class="box-card" :class="['sideBar1']" style="width: 200px">
      <p v-on:click="switchToAccountInfo()" style="cursor: pointer">账号信息</p>
    </el-card>
    <el-card class="box-card" :class="['sideBar2']" style="width: 200px">
      <p v-on:click="switchToStar()" style="cursor: pointer">...</p>
    </el-card>
    <el-card class="box-card" :class="['sideBar3']" style="width: 200px">
      <p v-on:click="switchToFans()" style="cursor: pointer">...</p>
    </el-card>
    <el-card class="box-card" :class="['sideBar4']" style="width: 200px">
    </el-card>
    <el-card class="box-card" :class="['MySpacetitle']">
      <p>{{ mySpaceTitle }}</p>
    </el-card>
    <el-card class="box-card" :class="['MySpaceContent']">
      <div>
        <AccountInfo v-if="toDisplay === 1"></AccountInfo>
        <MyStar v-if="toDisplay === 2"></MyStar>
        <MyFans v-if="toDisplay === 3"></MyFans>
		<p style="position: absolute; left: 320px; top: 200px" :class="['word']">
		  绑定淘宝：
		</p>
		<el-switch
		  v-model="istaobao"
		  @change="changestate"
		  active-color="#13ce66"
		  inactive-color="#ff4949"
		  style="position: absolute; left: 420px; top: 223px"
		></el-switch>
      </div>
    </el-card>
  </div>
</template>
<script>
import Vue from "vue";
import AccountInfo from "@/components/AccountInfo.vue";
export default {
  name: "mySpace",
  components: {
    AccountInfo,
  },
  data() {
    return {
      mySpaceTitle: "个人空间管理>账号信息",
      toDisplay: 1,
	  userid:1,
	  istaobao:false,
    };
  },
  created:function(){
  	this.getid();
  },
  methods: {
	  getid(){
		  console.log("hello"+this.$parent.userid);
		  this.userid=this.$parent.userid;
	  },
	  changestate(){
	  		  console.log(11111);
	  		  this.$emit("changetaobao");
	  },
    switchToAccountInfo: function () {
      this.mySpaceTitle = "个人空间管理>账号信息";
      this.toDisplay = 1;
      console.log("账号信息" + this.toDisplay);
    },
    switchToStar: function () {
      this.mySpaceTitle = "个人空间管理>...";
      this.toDisplay = 2;
      console.log("我的关注" + this.toDisplay);
    },
    switchToFans: function () {
      this.mySpaceTitle = "个人空间管理>...";
      this.toDisplay = 3;
      console.log("我的粉丝" + this.toDisplay);
    },
  },
};
Vue.component("MyStar", {
  data: function () {
    return {};
  },
  template: "<div><p>asdfasdf</p></div>",
});
Vue.component("MyFans", {
  data: function () {
    return {};
  },
  template: "<div><p>asdfasdf</p></div>",
});
</script>

<style>
.main1 {
  margin: 0 auto;
  background-color: #b23535;
}

.mySpaceBackground {
  margin: 0 auto;
  width: 1000px;
  height: 352px;
}
.MySpaceContent {
  position: absolute;
  width: 1015px;
  height: 600px;
  left: 305px;
  top: 165px;
}
.word {
  font-family: Microsoft YaHei;
  font-size: 20px;
}
.MySpacetitle {
  position: absolute;
  width: 1015px;
  height: 60px;
  left: 305px;
  top: 100px;

  background: #f9f8f8;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  font-family: Microsoft YaHei;
  font-style: normal;
  font-weight: normal;
  text-align: center;
  display: flex;
  align-items: center;
  letter-spacing: 0.75px;
  text-transform: uppercase;
}
.sideBar1 {
  position: absolute;
  left: 100px;
  top: 100px;

  font-family: Microsoft YaHei;
  font-style: normal;
  font-weight: normal;
  height: 60px;
  /* identical to box height */
  text-align: center;
  display: flex;
  align-items: center;
  letter-spacing: 0.75px;
  text-transform: uppercase;

  color: #b23535;
}
.sideBar2 {
  position: absolute;
  left: 100px;
  top: 165px;

  font-family: Microsoft YaHei;
  font-style: normal;
  font-weight: normal;
  height: 60px;
  /* identical to box height */

  display: flex;
  align-items: center;
  letter-spacing: 0.75px;
  text-transform: uppercase;

  color: #b23535;
}
.sideBar3 {
  position: absolute;
  left: 100px;
  top: 230px;

  font-family: Microsoft YaHei;
  font-style: normal;
  font-weight: normal;
  height: 60px;
  /* identical to box height */

  display: flex;
  align-items: center;
  letter-spacing: 0.75px;
  text-transform: uppercase;

  color: #b23535;
}
.sideBar4 {
  position: absolute;
  left: 100px;
  top: 300px;

  font-family: Microsoft YaHei;
  font-style: normal;
  font-weight: normal;
  height: 465px;
  /* identical to box height */

  display: flex;
  align-items: center;
  letter-spacing: 0.75px;
  text-transform: uppercase;

  color: #b23535;
}
.avator {
  position: absolute;
  left: 100px;
  top: 50px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 1000px;
}
</style>
