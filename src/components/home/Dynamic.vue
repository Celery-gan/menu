<template>
  <div style="height:444px  ;width: 49%;">
    <div class="person-dynamic">
      <div class="dynamic-title flex j-between">
        <div>个人动态</div>
        <el-button type="primary" size="mini" @click="dynamicVisible = true">添加动态</el-button>
      </div>
      <!-- 时间 -->
      <div class="dynamic-box">
        <el-date-picker
          v-model="checkDate"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          @change="changeDate"
        ></el-date-picker>
        <!-- 动态 -->
        <div v-if="showList.length === 0" class="user-dynamic">暂无动态</div>
        <div v-else>
          <div v-for="item in showList" :key="item.id" class="mt-10 lh-40 dynamic-info">
            <div class="flex j-between">
              <div>类型:{{item.classification}}</div>
              <div>发布人:{{item.username}}</div>
            </div>
            <div class="flex j-between">
              <div>动态：{{item.dynamic}}</div>
              <div>发布于{{item.times}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="添加动态" :visible.sync="dynamicVisible" width="50%" @close="closeDio">
      <el-form ref="dynamicform" label-width="100px">
        <el-form-item label="动态类型">
          <el-select
            style="width:100%"
            v-model="dynamicform.classification"
            placeholder="请选择动态类型"
            @change="changeClass"
          >
            <el-option label="个人心情" value="个人心情"></el-option>
            <el-option label="工作汇报" value="工作汇报"></el-option>
            <el-option label="公司相关" value="公司相关"></el-option>
            <el-option label="其他事物" value="其他事物"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showReport" label="相关汇报人">
          <el-select
            style="width:100%"
            v-model="dynamicform.reportUsers"
            multiple
            placeholder="请选择相关汇报人"
          >
            <el-option
              v-for="item in reportList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="dynamicform.reportUsers" placeholder></el-input> -->
        </el-form-item>
        <el-form-item label="详情内容">
          <el-input type="textarea" v-model="dynamicform.dynamic" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dynamicVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const homeModule = createNamespacedHelpers("home");
const userModule = createNamespacedHelpers("user");
const {
  mapActions: homeActions,
  mapState: homeState,
  mapMutations: homeMutations
} = homeModule;
const { mapState: userState } = userModule;
export default {
  data() {
    return {
      checkDate: "",
      showList: [],
      dynamicVisible: false,
      showReport: false,
      dynamicform: {
        classification: "",
        reportUsers: [],
        dynamic: ""
      }
    };
  },
  components: {},
  methods: {
    ...homeActions(["addOneDynamic", "getDynamic", "getReport"]),
    // 修改日期 获取对应动态
    changeDate(val) {
      if (this.dynamicList.length > 0) {
        this.showList = this.dynamicList.filter(item => {
          return val == this.$dayjs(item.date).format("YYYY-MM-DD");
        });
        this.showList.map(item => {
          item.times = this.$dayjs(item.date).format("YYYY年MM月DD日");
        });
      }
    },
    // 切换动态类型 当类型为工作汇报时 reportUsers选择框显示
    changeClass(val) {
      if (val == "工作汇报") {
        this.showReport = true;
      } else {
        this.showReport = false;
      }
    },
    // 确认添加动态
    sureAdd() {
      this.dynamicVisible = false;
      let obj = this.dynamicform;
      obj.username = this.userInfo.username;
      if (this.checkDate != "") {
        obj.date = this.checkDate;
      } else {
        obj.date = this.$dayjs().format("YYYY-MM-DD");
      }
      this.addOneDynamic(obj);
    },
    // 关闭添加对话框
    closeDio() {
      this.dynamicform = {
        classification: "",
        reportUsers: [],
        dynamic: ""
      };
    }
  },
  mounted() {
    this.getDynamic();
    this.getReport();
  },
  watch: {},
  computed: {
    ...homeState(["dynamicList", "reportList"]),
    ...userState(["userInfo"])
  }
};
</script>

<style scoped lang='scss'>
.person-dynamic {
  border: 1px solid #ddd;
  margin-left: 2%;
}
.dynamic-title {
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
}
.dynamic-box {
  padding: 20px 10px;
}
.user-dynamic {
  margin-top: 20px;
}
.dynamic-info {
  background-color: rgb(241, 241, 241);
  padding: 8px 20px;
}
.dynamic-info:hover {
  background-color: rgb(243, 235, 235);
}
.mt-10 {
  margin-top: 10px;
}
</style>