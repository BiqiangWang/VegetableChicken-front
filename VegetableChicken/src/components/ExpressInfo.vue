<template>
  <div class="main" id="app">
    <div class="map-collect">
      <div id="container" class="map" tabindex="0"></div>

      <el-button class="collect" v-if="isCollect === 0" @click="collect"
        >收藏此快递</el-button
      >
      <el-button
        type="danger"
        plain
        class="collect"
        v-if="isCollect === 1"
        @click="cancelCollect"
        >取消收藏</el-button
      >
    </div>
    <div class="info-box">
      <div class="code">
        快递单号：{{ id }} &emsp; 快递公司：{{ expresscompany }}
      </div>
      <div class="code" style="margin-top: 30px">
        快递状态：{{ expressStatus }}
      </div>
      <el-container class="info" v-for="message in messages">
        <el-aside style="width: 100px">
          <div class="time">{{ message.time.time }}</div>
          <div class="date">{{ message.time.date }}</div>
        </el-aside>
        <el-main class="main-info" style="width: 500px">
          {{ message.info }}
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script language="javascript" src="https://webapi.amap.com/maps?v=1.4.15&key=84c113b753854d2a372345f043cb50c2&plugin=Map3D,AMap.DistrictLayer,AMap.Scale,AMap.ToolBar,AMap.Geocoder"></script>
<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>

<script>
export default {
  data() {
    return {
      sign: 0,
      userid: 1,
      length: 0,
      center: [108.152601, 30.193629],
      path: [],
      markerList: [],
      map: "",
      geocoder: "",
      polyline: "",
      status: [],
      expressStatus: "",
      isCollect: 0,
      id: "11111111111111111111111",
      expresscompany: "",
      messages: [],
      address: ["北京市朝阳区阜荣街10号"],

      response: {
        Traces: [
          {
            AcceptStation: "【山东省市场部中心】 已收件 取件人。。",
            AcceptTime: "2020-12-10 21:00:53",
          },
          {
            AcceptStation: "【济南转运中心公司】 已收件 取件人。。",
            AcceptTime: "2020-12-11 18:00:53",
          },
          {
            AcceptStation: "【浦东转运中心公司】 已收件 取件人。。",
            AcceptTime: "2020-12-11 21:00:53",
          },
        ],
      },
    };
  },

  methods: {
    getQuery: function () {
      this.id = this.$route.query.ExpressInfoExpressid;
      this.expresscompany = this.$route.query.ExpressInfoExpressCompany;
    },

    geoCode(address, i) {
      this.geocoder.getLocation(address, (status, result) => {
        if (status === "complete" && result.geocodes.length) {
          var lnglat = result.geocodes[0].location;
          var temp = [lnglat.lng, lnglat.lat];
          this.path.push(temp);

          // this.polyline.setPath(this.path);

          var marker = new AMap.Marker();
          marker.setPosition(lnglat);
          this.markerList.push(marker);
          this.map.add(marker);
        } else {
          console.log("根据地址查询位置失败");
          this.length--;
        }
        if (this.path.length == this.length && i == this.address.length - 1) {
          this.polyline.setPath(this.path);
          this.map.setFitView([this.polyline]);
        }
        if (i < this.address.length - 1) {
          this.geoCode(this.address[i + 1], i + 1);
        }
      });
    },

    processData() {
      switch (this.response.State) {
        case "0":
          break;
        case "1":
          this.expressStatus = "未发货";
          break;
        case "2":
          this.expressStatus = "运输中";
          break;
        case "3":
          this.expressStatus = "已签收";
          break;
        case "4":
          break;
      }
      for (var i = 0; i < this.response.Traces.length; i++) {
        var str = "";
        for (var j = 0; j < this.response.Traces[i].AcceptStation.length; j++) {
          if (
            this.response.Traces[i].AcceptStation[j] !== "【" &&
            this.response.Traces[i].AcceptStation[j] !== "】"
          ) {
            str += this.response.Traces[i].AcceptStation[j];
          }
          if (this.response.Traces[i].AcceptStation[j] === "】") {
            break;
          }
        }
        this.address[i] = str;

        this.messages[i] = {
          time: {
            time: "",
            date: "",
          },
          info: "",
        };

        var date = this.response.Traces[i].AcceptTime.split(" ");
        this.messages[i].time.date = date[0];
        this.messages[i].time.time = date[1];
        this.messages[i].info = this.response.Traces[i].AcceptStation;
        this.id = this.response.LogisticCode;

        this.$set(this.messages);
      }

      this.messages.reverse();

      // for (var i = 0; i < this.address.length; i++) {
      //     this.status[i] = false;
      // }

      this.length = this.address.length;

      // for (var i = 0; i < this.address.length; i++) {
      //   // console.log(this.address[i]);
      //   // setTimeout(()=>{this.geoCode(this.address[i], i)},100*i);
      //   this.geoCode(this.address[i], i);
      // }
      this.geoCode(this.address[0], 0);
    },

    getInfo(num, id) {
      var url = "http://localhost:8020/search/search";
      this.$http
        .get(
          url,
          {
            params: {
              num: num,
              cid: id,
            },
          },
          {
            emulateJSON: true,
          }
        )
        .then((response) => {
          this.response = response.data;
          console.log(response);
          if (this.response.Success == true) {
            this.processData();
          } else {
            this.$alert(
              "无法根据您提供的单号搜索到快递，请检查单号是否输入正确！",
              "搜索失败",
              {
                confirmButtonText: "确定",
                callback: (action) => {
                  this.$router.push({ path: "/SearchExpress" });
                },
              }
            );
          }
        });
    },

    iscollect() {
      var url = "http://localhost:8705/express/ismyexpress";
      this.$http
        .get(
          url,
          {
            params: {
              expressid: this.id,
              userid: this.userid,
            },
          },
          {
            emulateJSON: true,
          }
        )
        .then((response) => {
          this.isCollect = response.data;
        });
    },

    collect() {
      var url = "http://localhost:8705/express/addexpress";
      console.log(this.messages[0].info);
      this.$http
        .get(
          url,
          {
            params: {
              companyid: this.expresscompany,
              expressdetail: this.messages[0].info,
              expressid: this.id,
              expressstatus: this.expressStatus,
              userid: this.userid,
            },
          },
          {
            emulateJSON: true,
          }
        )
        .then((response) => {
          if (response.data === 1) {
            this.$message({
              showClose: true,
              message: "收藏成功！",
              type: "success",
            });
            this.isCollect = 1;
          } else if (response.data === 0) {
            this.$message({
              showClose: true,
              message: "收藏失败！",
              type: "erro",
            });
          }
        });
    },

    cancelCollect() {
      var url = "http://localhost:8705/express/deleteexpress";
      this.$http
        .get(
          url,
          {
            params: {
              expressid: this.id,
              userid: this.userid,
            },
          },
          {
            emulateJSON: true,
          }
        )
        .then((response) => {
          if (response.data === 1) {
            this.$message({
              showClose: true,
              message: "取消收藏成功！",
              type: "success",
            });
            this.isCollect = 0;
          } else if (response.data === 0) {
            this.$message({
              showClose: true,
              message: "取消收藏失败！",
              type: "erro",
            });
          }
        });
    },
  },
  mounted() {
    this.map = new AMap.Map("container", {
      /*showIndoorMap: false,
                          isHotspot: false,
                          zoomEnable: true,
                          keyboardEnable: false,
                          dragEnable: true,
                          showLabel: false,
                          touchZoomCenter: 1,*/
      zoom: 3,
      center: [108.152601, 30.193629],
    });
    this.geocoder = new AMap.Geocoder({});

    this.polyline = new AMap.Polyline({
      path: [],
      isOutline: true,
      outlineColor: "#ffeeff",
      borderWeight: 3,
      strokeColor: "#3366FF",
      strokeOpacity: 1,
      strokeWeight: 3,
      // 折线样式还支持 'dashed'
      strokeStyle: "solid",
      // strokeStyle是dashed时有效
      strokeDasharray: [10, 5],
      lineJoin: "round",
      lineCap: "round",
      zIndex: 50,
    });
    this.polyline.setMap(this.map);
    this.getQuery();

    this.getInfo(this.id, this.expresscompany);

    this.iscollect();
  },
};
</script>

<style>
.main {
  margin: 0 auto;
  margin-top: 70px;
  width: 1000px;
  height: 800px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}

.map {
  width: 400px;
  height: 400px;
}

.map-collect {
  float: left;
  margin-top: 200px;
}

.amap-copyright {
  color: grey;
}

.info-box {
  float: right;
  width: 500px;
  height: 700px;
  border: 10px solid blue;
  border-radius: 30px;
  overflow-y: scroll;
}

.code {
  margin-top: 50px;
  margin-left: 20px;
  font-weight: bold;
}

.info {
  margin-top: 50px;
  margin-left: 20px;
}

.time {
  text-align: center;
}

.date {
  font-size: 10px;
  color: gray;
  text-align: center;
  margin-top: 10px;
}

.main-info {
  text-align: left;
  margin-top: -20px;
}

.collect {
  margin-top: 20px;
  margin-left: 125px;
}
</style>
