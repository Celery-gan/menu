<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>{{$t('m.dashboard')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('m.organize')}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{$t('m.offer')}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="flex j-between">
      <div>
        <i class="el-icon-folder-opened offer-logo"></i>
        <span class="fw">offer管理</span>
      </div>
      <div>
        <el-button type="primary" size="mini">新建offer</el-button>
        <el-button type="primary" size="mini">转移状态</el-button>
        <el-button type="primary" size="mini">导出</el-button>
      </div>
    </div>
    <el-card>
      <el-button type="primary" size="mini" round>待发offer(1)</el-button>
      <el-button type="primary" size="mini" round>已发offer(1)</el-button>
      <el-button type="primary" size="mini" round>已接受offer(1)</el-button>
      <el-button type="primary" size="mini" round>已拒绝offer(1)</el-button>
      <el-button type="primary" size="mini" round>已入职offer(1)</el-button>

      <el-table
        v-if="offerList.length>0"
        ref="multipleTable"
        :data="showList"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="email" label="个人邮箱" align="center"></el-table-column>
        <el-table-column prop="certificates" label="证件类型" align="center"></el-table-column>
        <el-table-column prop="certificatesNum" label="证件号码" align="center"></el-table-column>
        <el-table-column prop="certificatesNum" label="证件号码" align="center"></el-table-column>
        <el-table-column prop="address" label="性别" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.gender==1">女</div>
            <div v-else>男</div>
          </template>
        </el-table-column>
        <el-table-column :render-header="renderHeader" width="40" align="center"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 40, 80]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="offerList.length"
        style="margin-top:10px"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
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
      currentPage: 1,
      currentSize: 10,
      showList: []
    };
  },
  components: {},
  methods: {
    ...organizeActions(["getOffer"]),
    getList() {
      let start = 0 + (this.currentPage - 1) * this.currentSize;
      let end = this.currentPage * this.currentSize;
      if (end >= this.offerList.length) {
        end = this.offerList.length;
      }
      this.showList = this.offerList.slice(start, end);
    },
    // 切换每页条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currentSize = val;
      this.getList();
    },
    // 切换当前页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getList();
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 表头插入导入按钮
    renderHeader() {
      // return (
      //   <el-popover placement="right" width="400" trigger="click">
      //     <div>sss</div>
      //     <i class="el-icon-setting" on-click={() => this.editAble()}></i>
      //   </el-popover>
      // );
      return <i class="el-icon-setting" on-click={() => this.editAble()}></i>;
    },
    editAble() {
      console.log("object");
    }
  },
  mounted() {
    this.getOffer().then(res => {
      this.getList();
    });
  },
  watch: {},
  computed: {
    ...organizeState(["offerList"])
  }
};
</script>

<style scoped lang='scss'>
.offer-logo {
  display: inline-block;
  background: #38ba72;
  padding: 5px;
  margin-right: 10px;
  color: #fff;
}
</style>