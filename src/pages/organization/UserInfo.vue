<template>
  <div>
    <comCrumb :crumbList="['dashboard','organize','userInfo']"></comCrumb>
    <div class="flex j-between m-b20">
      <div>
        <i class="el-icon-user offer-logo"></i>
        <span class="fw">{{$t('m.userInfo')}}</span>
      </div>
      <div>
        <el-button v-if="Regular" type="primary" size="small" @click="sureRegular">确认</el-button>
        <el-button v-if="Regular" type="primary" size="small" @click="cancleRegular">取消</el-button>
        <el-button v-else type="primary" size="small" @click="changeRegular">批量转正申请</el-button>
        <el-button type="primary" size="small">导出</el-button>
      </div>
    </div>
    <el-button type="primary" :plain="active!=0" round size="mini" @click="changeList(0)">全部员工</el-button>
    <el-button type="primary" :plain="active!=1" round size="mini" @click="changeList(1)">考核中员工</el-button>
    <el-button type="primary" :plain="active!=2" round size="mini" @click="changeList(2)">已转正员工</el-button>

    <el-table
      :data="showList"
      style="width: 100%"
      :default-sort="{prop: 'num,startTime,endTime', order: 'descending'}"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="num" label="工号" sortable align="center"></el-table-column>
      <el-table-column prop="mechanism" label="机构" align="center"></el-table-column>
      <el-table-column prop="department" label="部门" align="center"></el-table-column>
      <el-table-column prop="startTime" label="试用期开始时间" sortable align="center"></el-table-column>
      <el-table-column prop="endTime" label="试用期结束时间" sortable align="center"></el-table-column>
      <el-table-column label="转正审批状态" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.state==0" style="color: #409eff;">审批通过</div>
          <div v-else-if="scope.row.state==1" style="color: #409eff;">审批未通过</div>
          <div v-else style="color: #409eff;">审批中</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="editState(scope.row)">编辑试用期</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 40, 80]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="showUser.length"
      style="margin-top:10px"
    ></el-pagination>
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
      active: 0,
      currentSize: 10,
      currentPage: 1,
      showList: [],
      Regular: false,
      selectedList: []
    };
  },
  components: { comCrumb },
  methods: {
    ...organizeActions(["getUserInfo"]),
    ...organizeMutations(["changeShow", "userRegular"]),
    // 切换显示数据
    changeList(val) {
      this.active = val;
      this.changeShow(val);
      this.getList();
    },
    // 编辑试用期
    editState(row) {
      console.log(row);
    },
    // 切换每页条数
    handleSizeChange(val) {
      this.currentSize = val;
      this.getList();
    },
    // 切换当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    // 当前页面显示
    getList() {
      let start = 0 + (this.currentPage - 1) * this.currentSize;
      let end = this.currentPage * this.currentSize;
      if (end >= this.showUser.length) {
        end = this.showUser.length;
      }
      this.showList = this.showUser.slice(start, end);
    },
    // 开启批量转正
    changeRegular() {
      this.Regular = true;
      this.changeShow(1);
      this.getList();
    },
    // 确认转正
    sureRegular() {
      if (this.selectedList.length > 0) {
        this.userRegular(this.selectedList);
      }
      this.Regular = false;
      this.changeList(0);
    },
    // 取消转正
    cancleRegular() {
      this.Regular = false;
      this.changeList(0);
    },
    handleSelectionChange(val) {
      this.selectedList = val;
    }
  },
  mounted() {
    this.getUserInfo().then(res => {
      this.showList = this.showUser.slice(0, 10);
    });
  },
  watch: {},
  computed: {
    ...organizeState(["showUser"])
  }
};
</script>

<style scoped lang='scss'>
.b-bto {
  border-bottom: 1px solid rgb(247, 247, 247);
}
.dis-b {
  display: block;
}
.ml {
  margin-left: 80px;
}
.active-height {
  color: #409eff;
}
.m-b20 {
  margin-bottom: 20px;
}
</style>