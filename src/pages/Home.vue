<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>{{$t('m.dashboard')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('m.dashboard')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 进度 -->
    <div class="flex" v-if="progressList.length>0">
      <div
        class="pro-box ai-c f-1 flex j-around"
        :style="{borderTop:(activePro==index?bortop:'6px solid #fff')}"
        v-for="(item,index) in progressList"
        :key="item.id"
        @click="changeActive(index)"
      >
        <div class="fs-20">
          <div class="ccc fs-14 lh-30">{{item.name}}(元)</div>
          <countTo
            v-if="activePro==index"
            :startVal="0"
            :endVal="item.money"
            :duration="500"
            prefix="￥ "
          ></countTo>
          <div v-else>￥ {{(item.money-item.money%1000)/1000}},{{ item.money%1000}}</div>
        </div>
        <div class="wrap_01" style="height:80px;">
          <CircleProgress
            :id="item.id"
            :width="80"
            :radius="10"
            :barColor="activePro==index?barColor:norColor"
            :backgroundColor="activePro==index?backgroundColor:norbgColor"
            :progress="item.value"
            :isAnimation="true"
            duration="500"
          >
            <div v-if="activePro==index" class="slot fs-12">
              <div>完成率</div>
              <div>{{item.value}}%</div>
            </div>
            <div v-else class="slot"></div>
          </CircleProgress>
        </div>
      </div>
    </div>
    <!-- 利润 + 个人动态 -->
    <div class="flex ai-c">
      <!-- 利润 -->
      <div class="city-profit">
        <div class="profit-title">利润(万)</div>
        <div>
          <ve-wordcloud :data="chartData" :settings="chartSettings"></ve-wordcloud>
        </div>
      </div>
      <!-- 个人动态 -->
      <home-dynamic></home-dynamic>
    </div>
    <!-- 网站问卷调查 -->
    <el-card class="box-card">
      <div slot="header">
        <span>网站问卷调查</span>
      </div>
      <el-table
        :data="questionList"
        style="width: 100%"
        :default-sort="{prop: 'startTime,endTime', order: 'descending'}"
      >
        <el-table-column prop="name" label="问卷名称" align="center"></el-table-column>
        <el-table-column prop="desc" label="问卷描述" align="center"></el-table-column>
        <el-table-column prop="startTime" label="创建时间" align="center" sortable></el-table-column>
        <el-table-column prop="endTime" label="截止时间" align="center" sortable></el-table-column>
        <el-table-column label="问卷状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status==0">未发布</el-tag>
            <el-tag v-if="scope.row.status==1">已发布</el-tag>
            <el-tag v-if="scope.row.status==2">已截止</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="网址名称" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.url == 'https://www.douban.com/'" type="danger">豆瓣</el-tag>
            <el-tag v-if="scope.row.url == 'https://www.baidu.com'" type="success">百度</el-tag>
            <el-tag v-if="scope.row.url == 'https://github.com/'" type="info">Github</el-tag>
            <el-tag v-if="scope.row.url == 'https://juejin.im/'" type="warning">掘金</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="lookDetail(scope.row.url)">查看网址详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="复制地址" :visible.sync="dialogVisible" width="40%" @close="closeDio">
      <div class="flex j-between">
        <el-input v-model="lookUrl" style="width:89%" size="mini" disabled></el-input>
        <el-button type="danger" size="mini" @click="doCopy">复制</el-button>
      </div>
      <div class="dialog-suggest">如无法使用上方复制按钮，请选中内容后，使用 Ctrl + C 复制。也可扫描下方二维码或右键保存二维码进行访问。</div>
      <div class="flex j-center">
        <div id="qrcode" ref="qrcode"></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import veWordcloud from "v-charts/lib/wordcloud";
import CircleProgress from "vue-circleprogressbar";
import homeDynamic from "../components/home/Dynamic";
import countTo from "vue-count-to";
import QRCode from "qrcodejs2";

import { createNamespacedHelpers } from "vuex";
const homeModule = createNamespacedHelpers("home");
const { mapActions: homeActions, mapState: homeState } = homeModule;
export default {
  name: "",
  props: {},
  components: { veWordcloud, homeDynamic, CircleProgress, countTo, QRCode },
  data() {
    return {
      bortop: "6px solid #5eb0fe", // 选中项顶部边框
      barColor: "#5eb0fe", // 选中项圆环颜色
      norColor: "#9fb2bd", // 一般项圆环颜色
      backgroundColor: "#a9d0ff", // 选中项圆环背景色
      norbgColor: "#dce2e6", //  一般项圆环颜色
      activePro: 0, // 当前选中项
      barcList: ["#5eb0fe", "#80e313", "#f2ae57"], // 圆环颜色列表
      bgcList: ["#a9d0ff", "#d3f4af", "#ffe8cc"], // 圆环背景色列表
      fill: { gradient: ["red", "green", "blue"] },
      dialogVisible: false,
      lookUrl: "https://www.baidu.com/"
    };
  },
  methods: {
    ...homeActions(["getProgress", "getCityValue", "getquestion"]),
    // 切换当前progress
    changeActive(val) {
      this.activePro = val;
      this.bortop = `6px solid ${this.barcList[val]}`;
      this.barColor = this.barcList[val];
      this.backgroundColor = this.bgcList[val];
    },
    // 打开dialog
    lookDetail(row) {
      this.dialogVisible = true;
      // 二维码内容,一般是由后台返回的跳转链接,这里是写死的一个链接
      this.lookUrl = row;
      // 使用$nextTick确保数据渲染
      this.$nextTick(function() {
        this.crateQrcode();
      });
    },
    // 关闭弹框,清除已经生成的二维码
    closeDio() {
      this.$refs.qrcode.innerHTML = "";
    },
    // 生成二维码
    crateQrcode() {
      this.qr = new QRCode("qrcode", {
        width: 200,
        height: 200, // 高度
        text: this.lookUrl, // 二维码内容
        render: "canvas", // 设置渲染方式（有两种方式 table和canvas，默认是canvas）
        background: "#f0f",
        foreground: "#ff0"
      });
    },
    // 点击复制
    doCopy() {
      this.$copyText(this.lookUrl)
        .then(e => {
          this.$message.success("复制成功");
        })
        .catch(e => {
          this.$message.success("Can not copy");
        });
    }
  },
  mounted() {
    this.getProgress();
    this.getCityValue();
    this.getquestion();
  },
  watch: {},
  computed: {
    ...homeState(["progressList", "chartData", "chartSettings", "questionList"])
  }
};
</script>

<style scoped lang='scss'>
.pro-box {
  padding: 30px 60px 60px;
}
/* 圆环样式  */
.wrap {
  background-color: #f2f7ff;
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  .circle {
    box-sizing: border-box;
    border: 1px solid #f2f7ff;
    clip: rect(0, 150px, 150px, 75px);
    position: absolute;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    .percent {
      box-sizing: border-box;
      top: -1px;
      left: -1px;
      position: absolute;
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    .left {
      border: 20px solid #3c8cff;
      clip: rect(0, 75px, 150px, 0);
    }
    .right {
      border: 20px solid #3c8cff;
      clip: rect(0, 150px, 150px, 75px);
    }
    .wth0 {
      width: 0;
    }
  }
  .clip-auto {
    clip: rect(auto, auto, auto, auto);
  }
  .inside-round {
    position: absolute;
    width: 110px;
    height: 110px;
    background: #fff;
    border-radius: 50%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    line-height: 110px;
  }
}
.city-profit {
  border: 1px solid #ddd;
  width: 49%;
}
.profit-title {
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
}
.dialog-suggest {
  margin: 20px 0;
  padding: 15px 10px;
  background-color: #ebf5ff;
  border-radius: 8px;
  line-height: 1.5;
  font-style: 14px;
}
</style>