<template>
  <div class="lock-bg">
    <div class="lock-box">
      <div class="unlock" :class="{'unlock-two':isLock&&flag}">
        <div>admin</div>
        <div :class="{'input-error':!flag}">
          <el-input type="text" v-model="unlockWord" style="width:200px" placeholder="请输入锁屏密码" />
          <el-button @click="back">
            <i class="el-icon-arrow-right el-icon--right"></i>
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      unlockWord: "",
      lockWords: "",
      isLock: true,
      flag: false
    };
  },
  components: {},
  methods: {
    back() {
      this.flag = true;
      if (this.lockWords == this.unlockWord) {
        this.isLock = true;
      } else {
        this.isLock = false;
        this.$message.error("密码不正确,请重新输入");
        setTimeout(() => {
          this.flag = false;
        }, 100);
      }
      sessionStorage.setItem("isUnLock", this.isLock);
      setTimeout(() => {
        this.$router.push("/");
      }, 500);
    }
  },
  mounted() {
    this.lockWords = sessionStorage.getItem("lockWord");
  },
  beforeRouteLeave(to, from, next) {
    if (to.path !== "/lockView") {
      if (sessionStorage.getItem("isUnLock") == "true") {
        next();
      } else {
        next(false);
      }
    }
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.lock-bg {
  position: relative;
  width: 100%;
  height: 100vh;
}
.lock-box {
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%, -50%);
}
.unlock {
  width: 300px;
  height: 60px;
  font-size: 24px;
  animation: jump_word 0.5s linear;
}
.unlock-two {
  width: 300px;
  height: 60px;
  font-size: 24px;
  animation: cancle_word 0.5s linear;
}
@keyframes jump_word {
  0% {
    transform: translate(0, -300px);
  }
  60% {
    transform: translate(0, 0);
  }
  70% {
    transform: translate(0, -50px);
  }
  82% {
    transform: translate(0);
  }
  92% {
    transform: translate(0, -25px);
  }
  100% {
    transform: translate(0);
  }
}
@keyframes cancle_word {
  0% {
    transform: scale(1.5) translateY(10px);
  }
  50% {
    opacity: 0.7;
    transform: scale(0.8) translateY(80px);
  }
  100% {
    transform: scale(0) translateY(200px);
  }
}
.input-error {
  animation: err_word 0.5s linear;
}
@keyframes err_word {
  0% {
    transform: translateX(10px);
  }
  5% {
    transform: translateX(0);
  }
  10% {
    transform: translateX(-10px);
  }
  15% {
    transform: translateX(0);
  }
  20% {
    transform: translateX(10px);
  }
  25% {
    transform: translateX(0);
  }
  30% {
    transform: translateX(-10px);
  }
  35% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(10px);
  }
  45% {
    transform: translateX(-10px);
  }
  50% {
    transform: translateX(0);
  }
  60% {
    transform: translateX(10px);
  }
  70% {
    transform: translateX(0);
  }
  80% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>