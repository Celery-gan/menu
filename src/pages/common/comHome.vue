<template>
  <div>
    <div>
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width="asidWidth">
          <div v-for="(item) in asidList" :key="item.id">
            <el-menu
              class="el-menu-vertical-demo"
              :default-active="activeNum"
              :collapse="isCollapse"
              @select="select"
            >
              <el-submenu v-if="item.children.length != 0" :index="item.url">
                <template slot="title">
                  <i class="el-icon-document"></i>
                  <span v-if="item.name == '组织员工'" slot="title">{{$t('m.organize')}}</span>
                  <span v-if="item.name == '表单页'" slot="title">{{$t('m.form')}}</span>
                </template>
                <el-menu-item-group v-for="(item1) in item.children" :key="item1.id">
                  <el-menu-item :index="item1.url">
                    <i :class="`iconfont icon-${item1.icon} icon-style`"></i>
                    <span v-if="item1.name == 'offer管理'">{{$t('m.offer')}}</span>
                    <span v-if="item1.name == '人员信息'">{{$t('m.userInfo')}}</span>
                    <span v-if="item1.name == '薪酬管理'">{{$t('m.payMent')}}</span>
                    <span v-if="item1.name == '分步表单'">{{$t('m.stepForm')}}</span>
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item v-else :index="item.url">
                <i :class="`iconfont icon-${item.icon} icon-style`"></i>
                <span slot="title" v-if="item.name == '首页'">{{$t('m.dashboard')}}</span>
                <span slot="title" v-if="item.name == '日程管理'">{{$t('m.calendar')}}</span>
                <span slot="title" v-if="item.name == '通讯录'">{{$t('m.mailList')}}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-container>
          <el-header class="com-header flex j-between ai-c">
            <!-- 左 -->
            <div @click="changeAsid" class="fs-22 flex ai-c">
              <div data-step="1" data-intro="收缩菜单">
                <i v-if="!isCollapse" class="el-icon-s-fold"></i>
                <i v-else class="el-icon-s-unfold"></i>
              </div>
              <div class="fs-18 header-title">{{`${$t('m.xiaoai')}${$t('m.admin')}`}}</div>
            </div>
            <!-- 右 -->
            <div class="fs-22 nav-right flex j-around ai-c">
              <!-- 切换语言 -->
              <el-dropdown
                placement="bottom"
                @command="handleCommand"
                data-step="2"
                data-intro="切换语言"
              >
                <span class="el-dropdown-link">
                  <i class="el-icon-edit-outline fs-22"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="zh">简体中文</el-dropdown-item>
                  <el-dropdown-item command="tw">繁體中文</el-dropdown-item>
                  <el-dropdown-item command="en">English</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- 全屏 -->
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('m.Fullscreen')"
                placement="bottom"
                data-step="3"
                data-intro="设置全屏"
              >
                <i class="el-icon-full-screen" @click="screenfull"></i>
              </el-tooltip>
              <!-- 锁屏 -->
              <el-tooltip
                class="item"
                effect="dark"
                :content="$t('m.lockScreen')"
                placement="bottom"
                data-step="4"
                data-intro="设置锁屏"
              >
                <i class="el-icon-lock" @click="lockVisible = true"></i>
              </el-tooltip>
              <!-- 用户 -->
              <el-dropdown @command="userCommand" data-step="5" data-intro="用户操作">
                <span class="el-dropdown-link">
                  <div class="flex j-around ai-c fs-14">
                    <div v-if="userAvatar==''" class="no-avatar"></div>
                    <img v-else :src="userAvatar" class="avatar-img" />
                    <div>{{`${$t('m.dear')} ${userInfo.username}`}}</div>
                    <i class="el-icon-caret-bottom"></i>
                  </div>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="1">
                    <el-upload
                      :show-file-list="false"
                      class="upload-demo"
                      action="api/upload/image"
                      :before-upload="beforeAvatarUpload"
                      :headers="header"
                      :on-success="handleAvatarSuccess"
                    >{{$t('m.uploadAvatar')}}</el-upload>
                  </el-dropdown-item>
                  <el-dropdown-item command="2">{{$t('m.editPwd')}}</el-dropdown-item>
                  <el-dropdown-item command="3">{{$t('m.logout')}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-header>
          <el-main>
            <router-view @selectGoods="selectGoodsBack"></router-view>
          </el-main>
          <!-- <el-backtop target=".page-component__scroll .el-scrollbar__wrap"></el-backtop> -->
        </el-container>
      </el-container>
      <!-- 锁屏密码  -->
      <el-dialog title="提示" :visible.sync="lockVisible" width="30%">
        <el-form :model="pwdForm" ref="pwdForm" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="锁屏密码"
            prop="lockWord"
            :rules="[{ required: true, message: '锁屏密码不能为空',trigger: 'blur'}]"
          >
            <el-input type="password" v-model="pwdForm.lockWord" placeholder="锁屏密码" show-password></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="lockVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureLock('pwdForm')">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改密码 -->
      <el-dialog title="提示" :visible.sync="modifyVisible" width="30%">
        <el-form
          :model="modifyForm"
          status-icon
          :rules="modifyRules"
          ref="modifyForm"
          label-width="140px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入原密码" prop="oldPass">
            <el-input type="password" v-model="modifyForm.oldPass" show-password></el-input>
          </el-form-item>
          <el-form-item label="请输入新密码" prop="NewPass">
            <el-input type="password" v-model="modifyForm.NewPass" show-password></el-input>
          </el-form-item>
          <el-form-item label="请确认新密码" prop="surePass">
            <el-input type="password" v-model="modifyForm.surePass" show-password></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="modifyVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureChange('modifyForm')">确 定 修 改</el-button>
        </span>
      </el-dialog>
      <!-- 开启新手引导 -->
      <el-dialog :visible.sync="showIntro" width="30%" :show-close="false">
        <div class="ta-c">您需要系统引导吗?</div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="noGuide" size="mini">不在提示</el-button>
          <el-button type="primary" @click="guide" size="mini">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import introJs from "intro.js";
import { createNamespacedHelpers } from "vuex";
const userModule = createNamespacedHelpers("user");
const {
  mapActions: userActions,
  mapState: userState,
  mapMutations: userMutations
} = userModule;
import screenfull from "screenfull";
export default {
  data() {
    var validateNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else if (value.trim().length < 6 || value.trim().length > 15) {
        callback(new Error("密码长度在 6 到 15 个字符"));
      } else {
        if (this.modifyForm.surePass !== "") {
          this.$refs.modifyForm.validateField("surePass");
        }
        callback();
      }
    };
    var validatesurePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入新密码"));
      } else if (value !== this.modifyForm.NewPass) {
        callback(new Error("两次输入新密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeNum: "/",
      // 修改密码的表单规则
      modifyRules: {
        oldPass: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "密码长度在 6 到 15 个字符",
            trigger: "blur"
          }
        ],
        NewPass: [
          { required: true, validator: validateNewPass, trigger: "blur" }
        ],
        surePass: [
          { required: true, validator: validatesurePass, trigger: "blur" }
        ]
      },
      // 默认侧边栏展开状态
      isCollapse: false,
      // 默认侧边栏宽度
      asidWidth: "200px",
      // 锁屏的dialog 默认不显示
      lockVisible: false,
      // 修改密码的dialog 默认不显示
      modifyVisible: false,
      // 锁屏的表单
      pwdForm: {
        lockWord: ""
      },
      // 全屏 默认不全屏
      isFullscreen: false,
      // 新手引导
      showIntro: false,
      header: "",
      userAvatar: ""
    };
  },
  components: {},
  methods: {
    ...userMutations(["setUser"]),
    ...userActions(["updatePwd", "getMenus", "logOut"]),
    // 切换侧边栏状态
    changeAsid() {
      this.isCollapse = !this.isCollapse;
      if (this.isCollapse) {
        let a = 200;
        let timmer = setInterval(() => {
          a = a - 20;
          this.asidWidth = a + "px";
          if (a == 80) {
            clearInterval(timmer);
          }
        }, 10);
      } else {
        this.asidWidth = "200px";
      }
    },
    // 确认锁屏
    sureLock(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.lockVisible = false;
          //跳转页面
          this.$router.push("/lockView");
          // 保存 lockWord
          sessionStorage.setItem("lockWord", this.pwdForm.lockWord);
        } else {
          console.log("error submit!!");
        }
      });
    },
    //  全屏事件
    screenfull() {
      screenfull.toggle();
      this.isFullscreen = true;
    },
    // 是否全屏并按键ESC键的方法
    checkFull() {
      var isFull =
        document.fullscreenEnabled ||
        window.fullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenEnabled;
      // to fix : false || undefined == undefined
      if (isFull === undefined) {
        isFull = false;
      }
      return isFull;
    },
    // 语言下拉选择
    handleCommand(command) {
      this.$i18n.locale = command;
    },
    // 用户选择
    userCommand(command) {
      if (command == 2) {
        this.modifyVisible = true;
      }
      if (command == 3) {
        this.logOut();
      }
    },
    // 确认修改密码
    sureChange(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.modifyVisible = false;
          let obj = {
            username: this.userInfo.username,
            password: this.modifyForm.oldPass,
            id: this.userInfo._id,
            newPwd: this.modifyForm.NewPass
          };
          this.updatePwd(obj);
        } else {
          console.log("error submit!!");
        }
      });
    },
    // 点击侧边栏跳转
    select(val) {
      if (this.activeNum != val) {
        this.activeNum = val;
        this.$router.push(val);
      }
    },
    // 子路由上传的当前高亮侧边栏
    selectGoodsBack(val) {
      this.activeNum = val;
    },
    // 新手引导
    guide() {
      this.showIntro = false;
      introJs()
        .setOptions({
          prevLabel: "上一步",
          nextLabel: "下一步",
          skipLabel: "跳过",
          doneLabel: "结束"
        })
        .oncomplete(function() {
          //点击跳过按钮后执行的事件
        })
        .onexit(function() {
          //点击结束按钮后， 执行的事件
        })
        .start();
    },
    // 不在引导
    noGuide() {
      this.showIntro = false;
      localStorage.setItem("showIntro", "1");
    },
    //头像上传成功的回调
    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.$message.success(res.msg);
        let obj = JSON.parse(localStorage.getItem("adminUser"));
        obj.avatar = this.userAvatar = res.url;
        localStorage.setItem("adminUser", JSON.stringify(obj));
        this.setUser(JSON.parse(localStorage.getItem("adminUser"))); // 从本地获得用户信息
      }
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    }
  },
  beforeMount() {
    this.header = {
      Authorization: localStorage.getItem("adminToken")
    };
  },
  mounted() {
    if (this.$route.path != "/form/checkForm") {
      // 如果当前路径为查看账单 则侧边栏分步表单高亮
      this.activeNum = this.$route.path;
    } else {
      this.activeNum = "/form/stepForm";
    }
    this.getMenus(); // 获取侧边栏列表
    this.setUser(JSON.parse(localStorage.getItem("adminUser"))); // 从本地获得用户信息
    // 全屏
    window.onresize = () => {
      // 全屏下监控是否按键了ESC
      if (!this.checkFull()) {
        // 全屏下按键esc后要执行的动作
        this.isFullscreen = false;
      }
    };
    if (localStorage.getItem("showIntro")) {
      // 如果已经点击了不在显示 则再次刷新不会有引导 否则每次刷新都会触发引导
      this.showIntro = false;
    } else {
      this.showIntro = true;
    }
    if (this.userInfo.avatar !== undefined) {
      this.userAvatar = this.userInfo.avatar;
    }
  },
  watch: {},
  computed: {
    ...userState(["modifyForm", "userInfo", "asidList"])
  }
};
</script>

<style scoped lang='scss'>
.el-menu {
  border: 0px solid #fff;
}
.com-header {
  border-bottom: 1px solid rgb(104, 104, 104);
}
.el-header {
  padding: 0;
}
.header-title {
  padding-left: 20px;
}
.avatar-img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin: 0 4px;
}

.nav-right {
  width: 240px;
}
.icon-style {
  vertical-align: middle;
  margin-right: 10px;
  text-align: center;
  font-size: 18px;
}
.no-avatar {
  width: 32px;
  height: 32px;
  background-color: rgb(233, 207, 207);
  border-radius: 50%;
  margin: 0 4px;
}
</style>