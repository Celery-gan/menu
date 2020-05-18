<template>
  <div>
    <div>
      <div class="goTop" v-show="goTopShow" @click="goTop">
        <i class="el-icon-caret-top goTopIcon fs-32"></i>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: "",
      goTopShow: false
    };
  },
  components: {},
  methods: {
    handleScroll() {
      this.scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (this.scrollTop > 500) {
        this.goTopShow = true;
      } else {
        this.goTopShow = false;
      }
    },
    goTop() {
      let timer = null,
        _that = this;
      cancelAnimationFrame(timer);
      timer = requestAnimationFrame(function fn() {
        if (_that.scrollTop > 0) {
          _that.scrollTop -= 50;
          document.body.scrollTop = document.documentElement.scrollTop =
            _that.scrollTop;
          timer = requestAnimationFrame(fn);
        } else {
          cancelAnimationFrame(timer);
          _that.goTopShow = false;
        }
      });
    }
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.goTop {
  position: fixed;
  right: 40px;
  bottom: 60px;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #fff;
  padding: 10px;
  cursor: pointer;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
  z-index: 11;
}
.goTop:hover .goTopIcon {
  color: rgba(51, 153, 255, 1);
}
.goTopIcon {
  color: rgba(51, 153, 255, 0.6);
}
</style>