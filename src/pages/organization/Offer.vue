<template>
  <div>
    <comCrumb :crumbList="['dashboard','organize','offer']"></comCrumb>
    <div class="flex j-between">
      <div>
        <i class="el-icon-folder-opened offer-logo"></i>
        <span class="fw">{{$t('m.offer')}}</span>
      </div>
      <div>
        <el-button type="primary" size="mini">新建offer</el-button>
        <el-button type="primary" size="mini">转移状态</el-button>
        <el-button type="primary" size="mini">导出</el-button>
      </div>
    </div>
    <el-card style="margin-top:20px">
      <el-button type="primary" size="mini" round>待发offer({{offerNmu[0]}})</el-button>
      <el-button type="primary" size="mini" round>已发offer({{offerNmu[1]}})</el-button>
      <el-button type="primary" size="mini" round>已接受offer({{offerNmu[2]}})</el-button>
      <el-button type="primary" size="mini" round>已拒绝offer({{offerNmu[3]}})</el-button>
      <el-button type="primary" size="mini" round>已入职offer({{offerNmu[4]}})</el-button>
      <el-table
        v-if="offerList.length>0"
        ref="multipleTable"
        :data="showList"
        tooltip-effect="dark"
        :row-style="{height:nowheight}"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          v-for="(item) in showField"
          :key="item.id"
          :prop="item"
          :label="$t(`m.${item}`)"
          :show-overflow-tooltip="true"
          align="center"
        ></el-table-column>
        <!--控制按钮 -->
        <el-table-column width="40" align="center">
          <template slot-scope="scope" slot="header">
            <el-popover placement="bottom-end" width="200" trigger="click" v-model="showVisibel">
              <div class="flex j-between b-bto">
                <el-popover placement="left" width="120" trigger="click" v-model="AddVisible">
                  <el-checkbox-group v-model="checkedshow">
                    <el-checkbox
                      class="lh-30 dis-b"
                      v-for="item in hideField"
                      :label="item"
                      :key="item.id"
                    >{{$t(`m.${item}`)}}</el-checkbox>
                  </el-checkbox-group>
                  <el-button type="primary" size="mini" @click="sureAdd" class="m-top ml">确认</el-button>
                  <el-button type="text" slot="reference">添加显示字段</el-button>
                </el-popover>

                <el-popover placement="left" width="120" trigger="click" v-model="DelVisible">
                  <el-checkbox-group v-model="checkedhide">
                    <el-checkbox
                      class="lh-30 dis-b"
                      v-for="item in showField"
                      :label="item"
                      :key="item.id"
                    >{{$t(`m.${item}`)}}</el-checkbox>
                  </el-checkbox-group>
                  <el-button type="primary" size="mini" class="m-top ml" @click="sureDel">确认</el-button>
                  <el-button type="text" slot="reference">删除显示字段</el-button>
                </el-popover>
              </div>

              <div class="lh-30">选择间距类型</div>
              <div class="flex j-around">
                <div @click="changeHeight(0)" :class="{'active-height':nowheight=='60px'}">紧凑</div>
                <div @click="changeHeight(1)" :class="{'active-height':nowheight=='80px'}">适中</div>
                <div @click="changeHeight(2)" :class="{'active-height':nowheight=='100px'}">宽松</div>
              </div>
              <i class="el-icon-setting" slot="reference"></i>
            </el-popover>
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
        :total="offerList.length"
        style="margin-top:10px"
      ></el-pagination>
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
      AddVisible: false,
      DelVisible: false,
      showVisibel: false,
      currentPage: 1,
      currentSize: 10,
      showList: [],
      nowheight: "60px",
      checkedshow: [],
      checkedhide: []
    };
  },
  components: { comCrumb },
  methods: {
    ...organizeActions(["getOffer"]),
    ...organizeMutations(["addField", "delField"]),
    // 得到当前显示数据
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
      this.currentSize = val;
      this.getList();
    },
    // 切换当前页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    // 修改表格行高
    changeHeight(val) {
      this.nowheight = 60 + val * 20 + "px";
    },
    // 添加显示字段
    sureAdd() {
      this.addField(this.checkedshow);
      this.AddVisible = false;
      this.showVisibel = false;
      this.checkedshow = [];
    },
    // 删除显示字段
    sureDel() {
      this.delField(this.checkedhide);
      this.DelVisible = false;
      this.showVisibel = false;
      this.checkedhide = [];
    }
  },
  mounted() {
    this.getOffer().then(res => {
      this.getList();
    });
  },
  watch: {},
  computed: {
    ...organizeState([
      "offerList",
      "allField",
      "showField",
      "hideField",
      "offerNmu"
    ])
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
</style>