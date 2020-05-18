<template>
  <div>
    <comCrumb :crumbList="['dashboard','form','checkForm']"></comCrumb>
    <el-card class="step-item">
      <div slot="header" class="clearfix">卡片名称</div>
      <div class="finish-view" id="printMe">
        <div>付款账户 : {{form.payAccount}}</div>
        <div>收款账户 : {{form.payNumber}}</div>
        <div>收款方式 : {{form.payMethod}}</div>
        <div>收款人姓名 : {{form.payeeName}}</div>
        <div>收款金额 : {{form.payAmount}}元</div>
      </div>
      <div class="restart">
        <el-button type="primary" @click="backHome">返回首页</el-button>
        <el-button v-print="printObj">打印</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import comCrumb from "../../components/common/comCrumb";
export default {
  data() {
    return {
      printObj: {
        id: "printMe", //需部分打印输入的ID
        popTitle: "账单", //标题显示标题
        extraCss: "https://www.google.com,https://www.google.com", //附加链接连接，以逗号分隔
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>' //附加在head标签上的其他标签，以逗号分隔
      },
      form: {}
    };
  },
  components: { comCrumb },
  methods: {
    backHome() {
      this.$emit("selectGoods", "/home");
      this.$router.push("/");
    }
  },
  mounted() {
    this.form = JSON.parse(sessionStorage.getItem("form"));
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.step-item {
  width: 400px;
  margin: 40px auto 10px;
}
.pre-icon {
  width: 20px;
  text-align: center;
  font-size: 20px;
  color: #777;
}
.next-step {
  margin-top: 20px;
}
.pay-info {
  padding-bottom: 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgb(252, 219, 219);
}
.pay-finish {
  background-color: #52c41a;
  width: 44px;
  height: 44px;
  margin: 10px auto;
  padding: 7px;
  color: #fff;
  font-size: 32px;
}
.finish-view {
  padding: 10px;
  line-height: 30px;
  background-color: #fafafa;
}
.restart {
  width: 90%;
  margin: 10px auto;
}
</style>