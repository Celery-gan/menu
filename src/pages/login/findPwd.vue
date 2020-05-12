<template>
  <div>
    <el-form :model="findForm" :rules="findRules" ref="findForm">
      <!-- 用户名 -->
      <el-form-item prop="username">
        <el-input v-model="findForm.username" placeholder="请输入2-10位用户名"></el-input>
      </el-form-item>
      <!-- 邮箱 -->
      <el-form-item prop="email">
        <el-input v-model="findForm.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
    </el-form>
    <!-- 找回按钮 -->
    <el-button type="primary" @click="findPass('findForm')" size="mini" style="width:100%;">找回密码</el-button>
    <!-- 其他方式 -->
    <div class="flex j-between fs-14 other">
      <div class="flex ai-c">
        其他方式登录
        <img
          src="../../assets/images/Github.svg"
          style="width: 20px; height: 20px; margin-left: 8px;"
        />
      </div>
      <div class="forget fs-16" @click="goToLogin">立即登录</div>
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
  data() {
    return {};
  },
  components: {},
  methods: {
    ...userActions(["findOnePwd"]),
    goToLogin() {
      this.$router.push("/login");
    },
    findPass(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.findOnePwd(this.findForm);
        } else {
          console.log("error submit!!");
        }
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {
    ...userState(["findForm", "findRules"])
  }
};
</script>

<style scoped lang='scss'>
.other {
  margin: 10px 0;
}
.forget {
  color: #409eff;
}
</style>