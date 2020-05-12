<template>
  <div class="bg-login">
    <div class="login-top ta-c">
      <div class="fs-32 fw">XiaoAi Admin</div>
      <div class="fs-16">这是一个炫酷的管理系统</div>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {},
  components: {},
  data() {
    return {
    
    };
  },
  methods: {},
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.bg-login {
  width: 320px;
  margin: 0 auto;
}
.login-top {
  width: 80%;
  margin: 0 auto 60px;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg")
    no-repeat;
  padding-top: 100px;
}
</style>