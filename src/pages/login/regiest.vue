<template>
  <div>
    <el-form :model="registForm" :rules="registrule" ref="registForm">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input v-model="registForm.username" placeholder="2-10位用户名"></el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="password">
        <el-input type="password" v-model="registForm.password" placeholder="6位以上密码" show-password></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item prop="email">
        <el-input v-model="registForm.email" placeholder="合法邮箱"></el-input>
      </el-form-item>
      <!-- 联系方式 -->
      <el-form-item prop="phone">
        <el-input v-model="registForm.phone" placeholder="11位合法手机号"></el-input>
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="code">
        <el-row>
          <el-col :span="14">
            <el-input v-model="registForm.code" placeholder="6为验证码"></el-input>
          </el-col>
          <el-col :span="9" :offset="1">
            <el-button v-if="setTime==60" @click="changeCode">验证码</el-button>
            <el-button v-else disabled>已发送{{setTime}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <!-- 提交按钮 -->
      <el-form-item>
        <div class="flex j-between">
          <el-button class="w-50" type="primary" size="mini" @click="goRegiest('registForm')">注册</el-button>
          <el-button type="text" class="w-40" @click="gotoLogin">使用已有账号登录</el-button>
        </div>
      </el-form-item>
    </el-form>
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
  data() {
    //定义一个全局的变量，谁用谁知道
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
      // 手机验证的判断条件
      addrule: {
        validator: validPhone,
        message: "请输入正确的手机号",
        trigger: "blur"
      },
      // 短信发送倒计时
      setTime: 60
    };
  },
  components: {},
  methods: {
    ...userMutations(["setRegistRule"]),
    ...userActions(["getCodes", "regiestOneUser"]),
    // 点击获取验证码
    changeCode() {
      this.getCodes(this.registForm.phone);
      let timer = setInterval(() => {
        this.setTime--;
        if (this.setTime == 0) {
          clearInterval(timer);
          this.setTime = 60;
        }
      }, 1000);
    },
    // 注册账号
    goRegiest(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.regiestOneUser(this.registForm);
        } else {
          console.log("error submit!!");
        }
      });
    },
    // 前往登录页面
    gotoLogin() {
      this.$router.push("/login");
    }
  },
  mounted() {
    // 表格规则添加
    this.setRegistRule(this.addrule);
  },
  watch: {},
  computed: {
    ...userState(["registForm", "registrule"])
  }
};
</script>

<style scoped lang='scss'>
</style>