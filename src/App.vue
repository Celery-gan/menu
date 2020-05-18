<template>
  <div id="app">
    <div class="wrapper">
      <div class="discrible">
        <back-top>
          <router-view />
        </back-top>
      </div>
    </div>
  </div>
</template>

<script>
import BackTop from "./components/backtop/BackTop";
export default {
  components: {
    BackTop
  },
  mounted() {
    if (sessionStorage.getItem("isUnLock") == null) {
      sessionStorage.setItem("isUnLock", true);
      sessionStorage.setItem("lockWord", "11");
    }
  }
};
</script>
<style lang="scss">
@import "./styles/common";
// .wrapper {
//   overflow: hidden;
//   height: 98vh;
// }
// .discrible {
//   overflow: scroll;
//   height: 98vh;
// }
// /*整个滚动条样式*/
// .discrible::-webkit-scrollbar {
//   width: 6px;
//   height: 0px;
// }
// /*设置滚动条上的滚动滑块样式*/
// .discrible::-webkit-scrollbar-thumb {
//   background: transparent;
// }
// /*鼠标位于内容上时，滚动条样式*/
// .discrible:hover::-webkit-scrollbar {
//   width: 6px;
//   height: 0px;
//   background: rgba(238, 238, 238, 1);
//   border-radius: 6px;
// }
// /*鼠标位于内容上时，滚动滑块样式*/
// .discrible:hover::-webkit-scrollbar-thumb {
//   background: #9bcaff;
//   border-radius: 10px;
// }
</style>
