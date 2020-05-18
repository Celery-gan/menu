<template>
  <div>
    <comCrumb :crumbList="['dashboard','form','stepForm']"></comCrumb>
    <div class="fs-16 lh-30">请填写您的转账信息</div>
    <div class="fs-14 ccc lh-30">请务必是你本人操作,确认转账金额及收款人信息</div>
    <el-card class="m-top">
      <div class="flex steps">
        <div v-for="(item,index) in steps" :key="item.id" class="flex ai-c m-rl10">
          <div v-if="active < index+1" class="step-circle br-50 ta-c m-r-10">{{index+1}}</div>
          <div v-else class="step-finish br-50 ta-c m-r-10">
            <i class="el-icon-check"></i>
          </div>
          <div>{{item}}</div>
          <div v-if="index!==2" class="step-line"></div>
        </div>
      </div>
      <div class="step-item" v-if="active=='0'">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="付款账户" prop="payAccount">
            <el-input v-model="ruleForm.payAccount" placeholder="请输入付款账户"></el-input>
          </el-form-item>
          <el-form-item label="转账方式" prop="payNumber">
            <div class="flex">
              <el-select v-model="ruleForm.payMethod">
                <el-option label="银行卡" value="银行卡"></el-option>
                <el-option label="支付宝" value="支付宝"></el-option>
                <el-option label="微信" value="微信"></el-option>
              </el-select>
              <el-input v-model="ruleForm.payNumber" :placeholder="`请输入${ruleForm.payMethod}账号`"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="收款人姓名" prop="payeeName">
            <el-input v-model="ruleForm.payeeName" placeholder="请输入收款人姓名"></el-input>
          </el-form-item>
          <el-form-item label="收款金额" prop="payAmount">
            <el-input v-model.number="ruleForm.payAmount" class="p-relat" placeholder="请输入收款金额">
              <div slot="prefix" class="pre-icon">￥</div>
            </el-input>
          </el-form-item>
        </el-form>
        <div class="flex ai-c">
          <el-button class="next-step" type="primary" @click="next('ruleForm')">下一步</el-button>
        </div>
      </div>
      <div class="step-item" v-if="active=='1'">
        <el-alert title="确认转账后，资金将直接打入对方账户，无法退回。" type="info" show-icon></el-alert>
        <div class="lh-30 fs-14 m-t-10 pay-info">
          <div>付款账户 : {{ruleForm.payAccount}}</div>
          <div>收款账户 : {{ruleForm.payNumber}}</div>
          <div>收款方式 : {{ruleForm.payMethod}}</div>
          <div>收款人姓名 : {{ruleForm.payeeName}}</div>
          <div>
            收款金额 :
            <span class="fs-20 fw">{{ruleForm.payAmount}}</span>元
          </div>
        </div>
        <el-form :model="payPwdForm" ref="payPwdForm" label-width="100px" class="demo-ruleForm">
          <el-form-item
            label="支付密码"
            prop="payPwd"
            :rules="[{ required: true, message: '输入正确的支付密码才能支付' ,trigger: 'blur'},]"
          >
            <el-input v-model="payPwdForm.payPwd" placeholder="请输入支付密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="back">上一步</el-button>
            <el-button type="primary" @click="next('payPwdForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div v-if="active==2" class="step-item">
        <div class="pay-finish br-50 ta-c m-r-10">
          <i class="el-icon-check"></i>
        </div>
        <div class="fs-16 ta-c m-top">操作成功</div>
        <div class="fs-14 ccc ta-c">预计两小时到账</div>
        <div class="finish-view">
          <div>付款账户 : {{ruleForm.payAccount}}</div>
          <div>收款账户 : {{ruleForm.payNumber}}</div>
          <div>收款方式 : {{ruleForm.payMethod}}</div>
          <div>收款人姓名 : {{ruleForm.payeeName}}</div>
          <div>
            收款金额 :
            <span class="fs-20 fw">{{ruleForm.payAmount}}</span>元
          </div>
        </div>

        <div class="restart">
          <el-button type="primary" @click="newPay">在转一笔</el-button>
          <el-button @click="lookBell">查看账单</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import comCrumb from "../../components/common/comCrumb";
import { createNamespacedHelpers } from "vuex";
const formModule = createNamespacedHelpers("form");
const { mapState: formState, mapMutations: formMutations } = formModule;
export default {
  data() {
    return {
      active: 0,
      steps: ["填写转账信息", "确认转账信息", "完成"]
    };
  },
  components: { comCrumb },
  methods: {
    ...formMutations(["setRuleForm", "setPayPwd"]),
    // 下一步
    next(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.active++;
        } else {
          this.$message.error("请正确填写表单");
        }
      });
    },
    // 返回上一步
    back() {
      this.active--;
    },
    // 再来一单
    newPay() {
      this.active = 0;
      this.setRuleForm();
      this.setPayPwd();
    },
    // 查看账单
    lookBell() {
      sessionStorage.setItem("form", JSON.stringify(this.ruleForm));
      const { href } = this.$router.resolve({
        name: "form/checkForm"
      });
      window.open(href, "_blank");
    }
  },
  mounted() {},
  watch: {},
  computed: {
    ...formState(["payPwdForm", "ruleForm", "rules"])
  }
};
</script>

<style scoped lang='scss'>
.step-circle {
  border: 1px solid #ddd;
  width: 22px;
  padding: 4px;
  background-color: rgb(93, 156, 250);
  color: #fff;
}
.step-line {
  width: 200px;
  height: 1px;
  background-color: rgb(248, 228, 228);
  margin: 0 10px;
}
.m-rl10 {
  margin: 0 10px;
}
.steps {
  width: 70%;
  margin: 0 auto;
}
.step-finish {
  border: 1px solid #6ac79d;
  width: 22px;
  padding: 4px;
  color: #6ac79d;
}
.step-item {
  width: 40%;
  margin: 40px auto 10px;
}
.pre-icon {
  width: 20px;
  text-align: center;
  font-size: 20px;
  color: #777;
}
.next-step {
  margin-top: 20px;
}
.pay-info {
  padding-bottom: 30px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgb(252, 219, 219);
}
.pay-finish {
  background-color: #52c41a;
  width: 44px;
  height: 44px;
  margin: 10px auto;
  padding: 7px;
  color: #fff;
  font-size: 32px;
}
.finish-view {
  padding: 10px;
  line-height: 40px;
  background-color: #fafafa;
}
.restart {
  width: 50%;
  margin: 20px auto;
}
</style>