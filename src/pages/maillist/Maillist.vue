<template>
  <div>
    <comCrumb :crumbList="['dashboard','mailList']"></comCrumb>

    <el-container>
      <el-aside width="200px">
        <el-tree :data="treeData" :props="defaultProps" @node-click="checkTree"></el-tree>
      </el-aside>
      <el-main>
        <div v-if="showList.length == 0">暂无数据</div>
        <div v-else class="flex ai-c f-wrap">
          <el-card class="box-card" v-for="item in showList" :key="item.id">
            <div slot="header" class="clearfix flex">
              <img src="http://dummyimage.com/80x80" class="user-img" />
              <div>
                <div class="fs-18">{{item.name}}</div>
                <div class="fs-14 lh-30">{{item.department}} / {{item.position}}</div>
                <div v-if="item.tag.length == 0" class="fs-14 ccc">
                  <i class="el-icon-circle-plus-outline"></i>
                  快来给Ta添加第一个标签吧
                </div>
                <div v-else>
                  <div
                    v-for="item in item.tag"
                    :key="item.id"
                    class="mail-tags"
                    :style="randomRgb(item)"
                  >{{item.name}}</div>
                </div>
              </div>
            </div>
            <div class="fs-14 user-pad">
              <div>邮箱 : {{item.email}}</div>
              <div>手机号码 : {{item.phone}}</div>
              <div>办公电话 : {{item.tel}}</div>
              <div v-if="item.gender==1">性别 : 女</div>
              <div v-else>性别 : 男</div>
              <div>QQ : {{item.qq}}</div>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import comCrumb from "../../components/common/comCrumb";
import { createNamespacedHelpers } from "vuex";
const mailListModule = createNamespacedHelpers("mailList");
const {
  mapActions: mailListActions,
  mapState: mailListState,
  mapMutations: mailListMutations
} = mailListModule;
export default {
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  components: { comCrumb },
  methods: {
    ...mailListActions(["getTreeData", "getMailList"]),
    ...mailListMutations(["changeList"]),
    checkTree(data) {
      this.changeList(data.label);
    },
    randomRgb(item) {
      let R = Math.floor(Math.random() * 120 + 100);
      let G = Math.floor(Math.random() * 120 + 100);
      let B = Math.floor(Math.random() * 120 + 100);
      return {
        width: (item.num / item.total) * 100 + "%", // 进度条
        background: "rgb(" + R + "," + G + "," + B + ")"
      };
    }
  },
  mounted() {
    this.getTreeData();
    this.getMailList();
  },
  watch: {},
  computed: {
    ...mailListState(["treeData", "showList"])
  }
};
</script>

<style scoped lang='scss'>
.box-card {
  margin: 10px;
  width: 31%;
}
.user-img {
  display: inline-block;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  margin-right: 20px;
}
.mail-tags {
  display: inline-block;
  font-size: 12px;
  border-radius: 20px;
  color: #fff;
  padding: 2px 7px;
  margin-right: 4px;
}
.user-pad {
  padding: 0 20px;
}
</style>