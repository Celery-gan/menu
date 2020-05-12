<template>
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
                  <i :class="`iconfont icon-${item1.icon}  sss`"></i>
                  <span v-if="item1.name == 'offer管理'">{{$t('m.offer')}}</span>
                  <span v-if="item1.name == '人员信息'">{{$t('m.userInfo')}}</span>
                  <span v-if="item1.name == '薪酬管理'">{{$t('m.payMent')}}</span>
                  <span v-if="item1.name == '分步表单'">{{$t('m.stepForm')}}</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.url">
              <i :class="`iconfont icon-${item.icon} sss`"></i>
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
            <i v-if="!isCollapse" class="el-icon-s-fold"></i>
            <i v-else class="el-icon-s-unfold"></i>
            <div class="fs-18 header-title">{{`${$t('m.xiaoai')}${$t('m.admin')}`}}</div>
          </div>
          <!-- 右 -->
          <div class="fs-22 nav-right flex j-around ai-c">
            <!-- 切换语言 -->
            <el-dropdown placement="bottom" @command="handleCommand">
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
            <el-tooltip class="item" effect="dark" :content="$t('m.Fullscreen')" placement="bottom">
              <i class="el-icon-full-screen" @click="screenfull"></i>
            </el-tooltip>
            <!-- 锁屏 -->
            <el-tooltip class="item" effect="dark" :content="$t('m.lockScreen')" placement="bottom">
              <i class="el-icon-lock" @click="lockVisible = true"></i>
            </el-tooltip>
            <!-- 用户 -->
            <el-dropdown @command="userCommand">
              <span class="el-dropdown-link">
                <div class="flex j-around ai-c fs-14">
                  <img src="../../assets/images/indentLeft.svg" class="avatar-img br-50" />
                  <div>{{`${$t('m.dear')} ${userInfo.username}`}}</div>
                  <i class="el-icon-caret-bottom"></i>
                </div>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">{{$t('m.uploadAvatar')}}</el-dropdown-item>
                <el-dropdown-item command="2">{{$t('m.editPwd')}}</el-dropdown-item>
                <el-dropdown-item command="3">{{$t('m.logout')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
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
  </div>
</template>

<script>
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
      activeNum: "/home",
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
      isFullscreen: false
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
        this.asidWidth = "80px";
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
    /**
     * 是否全屏并按键ESC键的方法
     */
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
        console.log("logout");
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
    select(val) {
      if (this.activeNum != val) {
        this.activeNum = val;
        this.$router.push(val);
      }
    }
  },
  mounted() {
    this.activeNum = this.$route.path;
    this.getMenus();
    // 获得用户信息
    this.setUser(JSON.parse(localStorage.getItem("adminUser")));
    // 全屏
    window.onresize = () => {
      // 全屏下监控是否按键了ESC
      if (!this.checkFull()) {
        // 全屏下按键esc后要执行的动作
        this.isFullscreen = false;
      }
    };
    // 设置默认锁屏密码和解锁状态
    sessionStorage.setItem("isUnLock", true);
    sessionStorage.setItem("lockWord", "11");
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
  width: 40px;
  height: 40px;
}

.nav-right {
  width: 240px;
}
.sss {
  vertical-align: middle;
  margin-right: 10px;
  text-align: center;
  font-size: 18px;
}
</style>