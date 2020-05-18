、<template>
  <div>
    <comCrumb :crumbList="['dashboard','organize','payMent']"></comCrumb>
    <!--  -->
    <div>
      <i class="el-icon-price-tag offer-logo"></i>
      <span class="fw">{{$t('m.payMent')}}</span>
    </div>
    <div class="flex j-between month-title">
      <div class="fw fs-24" v-if="months==null">Invalid Date 薪酬预算</div>
      <div class="fw fs-24" v-else>{{nowMonth}} 薪酬预算</div>
      <el-date-picker v-model="months" type="month" placeholder="选择月" @change="changeMonth"></el-date-picker>
    </div>
    <!--  -->
    <div class="pay-tips">如果有更多的渠道请自行添加, 所有添加的渠道会显示在CRM系统中</div>
    <el-card class="box-card">
      <div class="fs-24 fw">薪资结构</div>

      <el-table :data="payList" border style="width: 100%">
        <!-- 薪资构成 -->
        <el-table-column label="薪资构成" align="center">
          <template slot-scope="scope">
            <el-input
              v-if="scope.row.name == null"
              @blur="sureName(scope.row)"
              @keyup.enter.native="sureName(scope.row)"
              v-model="addname"
            ></el-input>
            <div v-else>{{scope.row.name}}</div>
          </template>
        </el-table-column>
        <!-- 计划支出 -->
        <el-table-column label="计划支出(元)" align="center">
          <template slot-scope="scope">
            <el-input
              v-if="showName.indexOf(scope.row.name)!=-1 || scope.row.planMoney==null"
              @blur="sureMony(scope.row)"
              @keyup.enter.native="surethisMonth(scope.row)"
              v-model="scope.row.planMoney"
            ></el-input>
            <div v-else @click="editMoney(scope.row)">{{Number(scope.row.planMoney)}}</div>
          </template>
        </el-table-column>
        <!-- 实际支出 -->
        <el-table-column prop="thisMonth" label="实际支出(元)" align="center">
          <template slot-scope="scope">
            <el-input
              v-if="showMonth.indexOf(scope.row.name)!=-1 || scope.row.thisMonth==null"
              @blur="surethisMonth(scope.row)"
              @keyup.enter.native="surethisMonth(scope.row)"
              v-model="scope.row.thisMonth"
            ></el-input>
            <div v-else @click="editthisMonth(scope.row)">{{Number(scope.row.thisMonth)}}</div>
          </template>
        </el-table-column>
        <el-table-column></el-table-column>
        <el-table-column></el-table-column>
        <el-table-column></el-table-column>
        <!-- 上月计划 -->
        <el-table-column label="上月计划(元)" align="center">
          <template slot-scope="scope">
            <el-link disabled>{{scope.row.actualMoney}}</el-link>
          </template>
        </el-table-column>
        <!-- 上月实际 -->
        <el-table-column label="上月实际(元)" align="center">
          <template slot-scope="scope">
            <el-link disabled>{{scope.row.lastMonth}}</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- 添加更多 + 总计 -->
      <el-button class="add-more" type="primary" @click="addPay">添加更多</el-button>
      <div class="flex ta-c c-blue">
        <div class="f-1">总计</div>
        <div class="f-1">{{paySum[0]}}</div>
        <div class="f-1">{{paySum[1]}}</div>
        <div class="f-3"></div>
        <div class="f-1">{{paySum[2]}}</div>
        <div class="f-1">{{paySum[3]}}</div>
      </div>
    </el-card>
  </div>
</template>

<script>
import comCrumb from "../../components/common/comCrumb";
import { createNamespacedHelpers } from "vuex";
const organizeModule = createNamespacedHelpers("organize");
const {
  mapActions: organizeActions,
  mapState: organizeState,
  mapMutations: organizeMutations
} = organizeModule;
export default {
  data() {
    return {
      // 选择的月份
      nowMonth: "2020年05月",
      months: "",
      showName: [],
      showMonth: [],
      addInfo: {},
      addname: ""
    };
  },
  components: { comCrumb },
  methods: {
    ...organizeActions(["getPay"]),
    ...organizeMutations(["setPayList"]),
    // 计划支出点击切换到input模式
    editMoney(row) {
      this.showName.push(row.name);
    },
    // 确认修改计划支出 变回普通样式
    sureMony(row) {
      if (row.planMoney == null) {
        row.planMoney = 0;
      }
      this.showName = this.showName.filter(item => {
        return item != row.name;
      });
      this.setPayList(this.payList);
      // this.$message.success("修改成功");
    },
    // 实际支出点击切换到input模式
    editthisMonth(row) {
      this.showMonth.push(row.name);
    },
    // 确认修改实际支出 变回普通样式
    surethisMonth(row) {
      if (row.thisMonth == null) {
        row.thisMonth = 0;
      }
      this.showMonth = this.showMonth.filter(item => {
        return item != row.name;
      });
      this.setPayList(this.payList);
      this.$message.success("修改成功");
    },
    // 添加更多 添加行
    addPay() {
      let row = {
        actualMoney: 0,
        lastMonth: 0,
        name: null,
        planMoney: null,
        thisMonth: null
      };
      this.payList.push(row);
    },
    // 薪资构成添加后
    sureName(val) {
      if (this.addname !== "") {
        val.name = this.addname;
      } else {
        val.name = "undefined";
      }
      this.showName.push(this.addname);
      this.showMonth.push(this.addname);
      this.addname = "";
    },
    // 切换月份
    changeMonth() {
      this.nowMonth = this.$dayjs(this.months).format("YYYY 年 MM 月");
    }
  },
  mounted() {
    this.getPay();
  },
  watch: {},
  computed: {
    ...organizeState(["payList", "paySum"])
  }
};
</script>
<style>
.month-title {
  margin: 40px 10px 20px;
}
.pay-tips {
  background: #e5f2e1;
  line-height: 50px;
  padding: 0 15px;
  font-size: 14px;
}
.el-table--border td,
.el-table--border th {
  border-right: 0px solid #fff;
}
.el-table {
  margin: 30px 0 10px;
}
.add-more {
  margin: 4px 0 20px 3%;
}
.c-blue {
  color: #0285dc;
}
</style>

