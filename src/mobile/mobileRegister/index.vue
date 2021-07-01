<template>
  <div class="reg">
    <navBar :title="title"></navBar>

    <div class="step">
      <van-steps :active="active" active-icon="success" active-color="#38f">
        <van-step>用户信息</van-step>
        <van-step>企业信息</van-step>
        <van-step>汇款信息</van-step>
        <van-step>收货信息</van-step>
      </van-steps>
    </div>

    <div class="regInformation">
      <!-- 用户信息 -->
      <el-form :model="info" ref="form0" v-if="active == 0">
        <el-form-item
          ref="userName"
          prop="userName"
          v-show="active === 0"
          :rules="[{ message: '请输入用户名', trigger: 'blur' }]"
        >
          <el-input
            v-model="info.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          ref="email"
          prop="email"
          v-show="active === 0"
          :rules="[
            { message: '请输入邮箱', trigger: 'blur' },
            {
              pattern: /^[a-zA-Z0-9_-\W]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
              message: '邮箱输入有误'
            }
          ]"
        >
          <el-input v-model="info.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item
          ref="loginphone"
          prop="loginPhone"
          v-show="active === 0"
          :rules="[
            { required: true, message: '请输入手机号', trigger: 'change' },
            { pattern: /^1[34578]\d{9}$/, message: '电话号输入有误' }
          ]"
        >
          <el-input
            placeholder="请输入手机号"
            oninput="if(value.length>11)value=value.slice(0,11)"
            v-model="info.loginPhone"
            @blur="ifNumber"
          ></el-input>
        </el-form-item>
        <el-form-item
          class="code"
          v-show="active === 0"
          :rules="[
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]"
        >
          <el-input
            placeholder="请输入验证码"
            v-model="vcode"
            class="vcode"
          ></el-input>
          <el-button @click="sendCode" :disabled="isDisabled">{{
            buttonName
          }}</el-button>
        </el-form-item>
        <el-form-item
          prop="password"
          v-show="active === 0"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input v-model="info.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>

      <!-- 企业信息 -->
      <el-form  :model="info.enterpriseInfos[0]" ref="form1" v-if="active == 1" >
       
        <el-form-item
          prop="name"
          v-show="active === 1"
          :rules="[
            { required: true, message: '请输入企业名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="info.enterpriseInfos[0].name" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item
          prop="creditCode"
          v-show="active === 1"
          :rules="[
            { required: true, message: '请输入信用代码', trigger: 'blur' }
          ]"
        >
          <el-input
            :ref="refList.cardInput"
            @input="formatCardNumber(refList.cardInput, info.enterpriseInfos[0].creditCode, info)"
            v-model="info.enterpriseInfos[0].creditCode"
            placeholder="请输入信用代码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="registerAddress"
          v-show="active === 1"
          :rules="[
            { required: true, message: '请输入注册地址', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="info.enterpriseInfos[0].registerAddress"
            placeholder="请输入注册地址"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="phone"
          v-show="active === 1"
          :rules="[
            { required: true, message: '请输入注册电话', trigger: 'blur' },
            { pattern: /\d/, message: '电话号输入有误' }
          ]"
        >
          <el-input v-model="info.enterpriseInfos[0].phone" placeholder="请输入注册电话"></el-input>
        </el-form-item>
      </el-form>

      <!-- 汇款信息 -->
      <el-form :model="info.enterpriseInfos[0]" ref="form2" v-if="active == 2">
        <el-form-item
          prop="accountOpening"
          :rules="[
            { required: true, message: '请输入开户行', trigger: 'blur' }
          ]"
        >
          <el-input v-model="info.enterpriseInfos[0].accountOpening" placeholder="请输入开户行"></el-input>
        </el-form-item>
        <el-form-item
          prop="bankAccount"
          :rules="[
            { required: true, message: '请输入银行账号', trigger: 'blur' }
          ]"
        >
          <el-input
            :ref="refList.cardInputs"
            @input="
              formatCardNumber(refList.cardInputs,info.enterpriseInfos[0].bankAccount, info)
            "
            v-model="info.enterpriseInfos[0].bankAccount"
            placeholder="请输入银行账号"
          ></el-input>
        </el-form-item>
      </el-form>

      <!-- 收货信息 -->
     <el-form :model="info.enterpriseAddresses[0]" ref="form3" v-if="active == 3">
        <el-form-item
          prop="name"
          :rules="[
            { required: true, message: '请输入收货人名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="info.enterpriseAddresses[0].name" placeholder="请输入收货人名称"></el-input>
        </el-form-item>
        <el-form-item
          prop="phone"
          :rules="[
            { required: true, message: '请输入注册电话', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '电话号输入有误' }
          ]"
        >
          <el-input v-model="info.enterpriseAddresses[0].phone" placeholder="请输入注册电话"></el-input>
        </el-form-item>
        <el-form-item
          prop="address"
          :rules="[
            { required: true, message: '请输入收货地址', trigger: 'blur' }
          ]"
        >
          <el-input v-model="info.enterpriseAddresses[0].address" placeholder="请输入收货地址"></el-input>
        </el-form-item>
       
      </el-form>


      <div class="submits">
        <el-button type="primary">{{active==3?'立即注册':'下一步'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '../commonAssembly/navBar'
export default {
  name: 'mobileRegister',
  components: {
    navBar
  },
  data () {
    return {
      title: {
        name: '注册',
        status: true
      },
      active: 0,
      shows: false,
      buttonName: "发送验证码",
      vcode:'',
      isDisabled:false,
      refList: {
        cardInput: "cardInput",
        cardInputs: "cardInputs"
      },
      // 用户注册信息
      info: {
        loginPhone: "",
        password: "",
        userName: "",
        email: "",
        enterpriseInfos: [{
          accountOpening: "",
          bankAccount: "",
          phone: "",
          creditCode: "",
          name: "",
          registerAddress: "",
        }],
        enterpriseAddresses: [{
          name: "",
          address: "",
          phone: "",
        }],
      },
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    onClickLeft () {

    },
    onClickRight () {

    }, // 修改银行卡号，4位一体 格式化
    sendCode(){

    },
    ifNumber(){

    },
    formatCardNumber(cardInput, cardNum, info) {
      // 获取input的dom对象，element ui的el-input这样才能拿到
      const input = this.$refs.cardInput.$el.getElementsByTagName("input")[0];

      const cursorIndex = input.selectionStart;
      const lineNumOfCursorLeft = (
        cardNum.slice(0, cursorIndex).match(/\s/g) || []
      ).length;
      const noLine = cardNum.replace(/\s/g, "");
      const newCardNum = noLine
        .replace(/\D+/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .replace(/\s$/, "");
      const newLineNumOfCursorLeft = (
        newCardNum.slice(0, cursorIndex).match(/\s/g) || []
      ).length;
      const newCursorIndex =
        cursorIndex + newLineNumOfCursorLeft - lineNumOfCursorLeft;
      this.$nextTick(() => {
        if (cardInput == "cardInput") {
          this.info.enterpriseInfos[0].creditCode = newCardNum;
        } else if (cardInput == "cardInputs") {
          this.info.enterpriseInfos[0].bankAccount = newCardNum;
        }
        this.$nextTick(() => {
          input.selectionStart = newCursorIndex;
          input.selectionEnd = newCursorIndex;
        });
      });
    },
  }
}
</script>

<style lang="less" scoped>
.reg {
  padding: 0 20px;

  .code {
    /deep/.el-form-item__content {

      display: flex;
      justify-content:space-between !important;

      > .el-input {
        // width: 60% !important;
        width: 180px;
        > .el-input__inner {
          width: 160px;
        }
      }
      >.el-button{
        width: 100px;
        padding: 0;
      }

    }
  }
}
.step {
  margin-top: 35px;
  margin-bottom: 45px;
}
.regInformation {
  /deep/.el-form-item {
    display: flex;
    justify-content: center;
  }
  /deep/.el-input__inner {
    width: 280px;
  }
}
.submits{
  margin-top: 45px;
  display: flex;
  justify-content:center
}
</style>
