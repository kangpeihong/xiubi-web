<template>
  <div class="reg">
    <!-- <navBar :title="title"></navBar> -->

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
          :rules="[
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="info.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item
          ref="email"
          prop="email"
          :rules="[
            { required: true, message: '请输入邮箱', trigger: 'blur' },
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
          :rules="[
            { required: true, message: '请输入手机号', trigger: 'blur' },
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
          :rules="[{ message: '请输入验证码', trigger: 'blur' }]"
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
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input v-model="info.password" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>

      <!-- 企业信息 -->
      <el-form :model="info.enterpriseInfos[0]" ref="form1" v-if="active == 1">
        <el-form-item
          prop="name"
          :rules="[
            { required: true, message: '请输入企业名称', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="info.enterpriseInfos[0].name"
            placeholder="请输入企业名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="creditCode"
          :rules="[
            { required: true, message: '请输入信用代码', trigger: 'blur' }
          ]"
        >
          <el-input
            :ref="refList.cardInput"
            @input="
              formatCardNumber(
                refList.cardInput,
                info.enterpriseInfos[0].creditCode,
                info
              )
            "
            v-model="info.enterpriseInfos[0].creditCode"
            placeholder="请输入信用代码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="registerAddress"
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
          :rules="[
            { required: true, message: '请输入注册电话', trigger: 'blur' },
            { pattern: /\d/, message: '电话号输入有误' }
          ]"
        >
          <el-input
            v-model="info.enterpriseInfos[0].phone"
            placeholder="请输入注册电话"
          ></el-input>
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
          <el-input
            v-model="info.enterpriseInfos[0].accountOpening"
            placeholder="请输入开户行"
          ></el-input>
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
              formatCardNumber(
                refList.cardInputs,
                info.enterpriseInfos[0].bankAccount,
                info
              )
            "
            v-model="info.enterpriseInfos[0].bankAccount"
            placeholder="请输入银行账号"
          ></el-input>
        </el-form-item>
      </el-form>

      <!-- 收货信息 -->
      <el-form
        :model="info.enterpriseAddresses[0]"
        ref="form3"
        v-if="active == 3"
      >
        <el-form-item
          prop="name"
          :rules="[
            { required: true, message: '请输入收货人名称', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="info.enterpriseAddresses[0].name"
            placeholder="请输入收货人名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="phone"
          :rules="[
            { required: true, message: '请输入注册电话', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '电话号输入有误' }
          ]"
        >
          <el-input
            v-model="info.enterpriseAddresses[0].phone"
            placeholder="请输入注册电话"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="address"
          :rules="[
            { required: true, message: '请输入收货地址', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="info.enterpriseAddresses[0].address"
            placeholder="请输入收货地址"
          ></el-input>
        </el-form-item>
      </el-form>

      <div class="submits">
        <el-button type="primary" @click="next" v-if="active < 3"
          >下一步</el-button
        >
        <el-button type="primary" @click="registerBtn" v-if="active == 3"
          >立即注册</el-button
        >
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
      time: 60,
      vcode: '',
      isDisabled: false,
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

    },
    // 发送验证码
    sendCode () {
      if (this.info.loginPhone !== '') {
        let data = {
          phoneNumber: this.info.loginPhone
        }
        this.$request.get(this.$api.code, data).then(res => {
          console.log('code', res);
          this.$toast.success('发送验证码成功');
          this.isDisabled = true;
          let _this = this;
          var interval = window.setInterval(function () {
            _this.buttonName = "已发送" + _this.time;
            --_this.time;
            if (_this.time < 0) {
              _this.buttonName = "重新发送";
              _this.time = 60;
              _this.isDisabled = false;
              window.clearInterval(interval);
            }
          }, 1000);
        }).catch(err => {
          console.log(err, "失败的验证码");
          this.$toast('发送验证码失败');
        })
      }

    },
    // 验证手机号是否存在
    ifNumber () {
      if (this.active === 0) {
        if (this.info.loginPhone !== "") {
          var url = this.$api.ifNumber + this.info.loginPhone;
          this.$request
            .get(url)
            .then(res => {
              if (res.status == 200) {
                // this.ifnumber = true;
                this.isDisabled = false;
              } else if (res.status == 201) {
                this.isDisabled = true;
                this.$toast('此手机号已被注册');
              }
            })
            .catch(err => {
              console.log('err');
            });
        }
      }
    },
    // 下一步
    next () {
      if (this.active < 3) {
        switch (this.active) {
          case 0:
            this.$refs.form0.validate(valid => {
              console.log('valid', valid);

              if (this.vcode == '') {
                this.$toast('请输入验证码！')
              }
              if (valid && this.vcode !== '') {
                let data = {
                  vcode: this.vcode,
                  phoneNumber: this.info.loginPhone
                }
                // 核对验证码
                this.$axios({
                  method: 'post',
                  url: this.$api.checkCode,
                  params: data
                }).then(res => {
                  if (res.status == 200) {
                    this.active++
                  }
                  console.log('55555', res);
                }).catch(err => {
                  console.log('err', err);
                  this.$toast('验证码输入有误！')
                })


              }
            })
            break;
          case 1:
            this.$refs.form1.validate(valid => {
              if (valid) this.active++
            })
            break;
          case 2:
            this.$refs.form2.validate(valid => {
              if (valid) this.active++
            })
            break;
        }
      }
    },
    // 注册
    registerBtn () {
      this.$refs.form3.validate(valid => {
        if (valid) {
          this.$request.post(this.$api.regapi, this.info).then(res => {
            this.$router.push("/login");
            this.$toast('注册成功请登录')
            this.active = 0;
          }).catch(err=>{
            console.log('err',err);
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
     
    },
    formatCardNumber (cardInput, cardNum, info) {
      // 获取input的dom对象，element ui的el-input这样才能拿到
      let input
      if (cardInput == 'cardInput') {
        input = this.$refs.cardInput.$el.getElementsByTagName("input")[0];

      } else if (cardInput == 'cardInputs') {
        input = this.$refs.cardInputs.$el.getElementsByTagName("input")[0];

      }
      console.log('input', input);
      console.log('inputs', this.$refs.cardInput);


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
      justify-content: space-between !important;

      > .el-input {
        // width: 60% !important;
        width: 180px;
        > .el-input__inner {
          width: 160px;
        }
      }
      > .el-button {
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
.submits {
  margin-top: 45px;
  display: flex;
  justify-content: center;
}
</style>
