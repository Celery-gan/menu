<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  mounted() {
    // 设置默认锁屏密码和解锁状态
    sessionStorage.setItem("isUnLock", true);
    sessionStorage.setItem("lockWord", "11");
  }
};
</script>
<style lang="scss">
@import "./styles/common";

// #nprogress .bar {
//     background: red !important; //自定义颜色
//   }
</style>
