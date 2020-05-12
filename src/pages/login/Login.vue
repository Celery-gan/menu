<template>
  <div>
    <el-tabs v-model="activeName" :stretch="true">
      <!-- 账号密码登录 -->
      <el-tab-pane label="账号密码登录" name="first">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item prop="username">
            <el-input v-model="ruleForm.username" placeholder="请输入2-10位用户名"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row>
              <el-col :span="14">
                <el-input v-model="ruleForm.code" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="9" :offset="1">
                <div class="captcha" v-html="verified" @click="chengeCode"></div>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!-- 手机号登录 -->
      <el-tab-pane label="手机号登录" name="second">
        <el-form :model="ruleFormT" :rules="rulesT" ref="ruleFormT">
          <el-form-item prop="phone">
            <el-input v-model="ruleFormT.phone" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row>
              <el-col :span="14">
                <el-input v-model="ruleFormT.code" placeholder="请输入验证码"></el-input>
              </el-col>
              <el-col :span="9" :offset="1">
                <el-button v-if="setTime==60" @click="getPhoneCode">验证码</el-button>
                <el-button v-else disabled>已发送{{setTime}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 记住我 && 忘记密码？ -->
    <div class="flex j-between rember-info">
      <div>
        <el-checkbox v-model="checked">记住我</el-checkbox>
      </div>
      <div class="forget fs-14" @click="findPass">忘记密码？</div>
    </div>
    <!-- 登录按钮 -->
    <el-button type="primary" @click="handleClick" style="width:100%;">登录</el-button>
    <!-- 其他方式 -->
    <div class="flex j-between fs-14 other">
      <div class="flex ai-c">
        其他方式登录
        <img
          src="../../assets/images/Github.svg"
          style="width: 20px; height: 20px; margin-left: 8px;"
        />
      </div>
      <div class="forget" @click="regiest">注册账号</div>
    </div>
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
export default {
  name: "",
  props: {},
  components: {},
  data() {
    //定义一个全局的变量 判断手机号
    var validPhone = (rule, value, callback) => {
      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
      if (!value) {
        callback(new Error("请输入电话号码"));
      } else if (!reg.test(value)) {
        callback(new Error("请输入正确的11位手机号码"));
      } else {
        callback();
      }
    };
    return {
      // 定义手机号补充规则
      addrule: {
        validator: validPhone,
        message: "请输入正确的手机号",
        trigger: "blur"
      },
      // 是否默认保存
      checked: true,
      // 当前登录方式
      activeName: "first",
      setTime: 60
    };
  },
  methods: {
    ...userActions(["getVerify", "goLogin", "getCodes","PhoneLogin"]),
    ...userMutations(["setActiveName", "setLoginRule"]),
    // 提交表单
    handleClick() {
      let formName = "ruleFormT";
      if (this.activeName == "first") {
        formName = "ruleForm";
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.activeName == "first") {
            this.goLogin(this.ruleForm);
          }else (
            this.PhoneLogin(this.ruleFormT)
          )
        } else {
          console.log("error submit!!");
        }
      });
    },
    // 点击验证码图片修改验证码
    chengeCode() {
      this.getVerify();
    },
    // 前往查找密码
    findPass() {
      this.$router.push("/findPwd");
    },
    // 前往注册
    regiest() {
      this.$router.push("/regiest");
    },
    // 获取手机验证码
    getPhoneCode() {
      this.getCodes(this.ruleFormT.phone);
      let timer = setInterval(() => {
        this.setTime--;
        if (this.setTime == 0) {
          clearInterval(timer);
          this.setTime = 60;
        }
      }, 1000);
    }
  },
  mounted() {
    this.getVerify();
    this.setLoginRule(this.addrule);
  },
  watch: {},
  computed: {
    ...userState(["verified", "rules", "rulesT", "ruleForm", "ruleFormT"])
  }
};
</script>

<style scoped lang='scss'>
.rember-info {
  margin-bottom: 16px;
}
.forget {
  color: #409eff;
}
.captcha {
  height: 32 !important;
}
.other {
  margin: 10px 0;
}
</style>