<template>
  <div class="loginCard animated fadeIn" v-if="loginShow">
    <div class="head">
      <img src="../../assets/images/logoo.jpg" alt="" />
      <a href="#"><i class="el-icon-close clbtn" @click="goback"></i></a>
    </div>
    <el-tabs :stretch="true">
      <el-tab-pane label="账号密码登陆">
        <el-input
          placeholder="手机号"
          v-model="logindata.variable"
          class="inpt"
          :clearable="true"
          oninput="if(value.length>5)value=value.slice(0,11)"
          onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
        ></el-input>
        <el-input
          placeholder="密码"
          v-model="logindata.password"
          class="inpt"
          :clearable="true"
          type="password"
        ></el-input>
        <!-- <el-input
          placeholder="密码"
          v-model="logindata.a"
          class="inpt"
          :clearable="true"
          oninput="if(value.length>5)value=value.slice(0,23)"
          @input="formatCardNumber(logindata.a)"
          ref="cardInput"
          onkeyup="value=value.replace(/(\d{4})(?=\d)/g,'')"
        ></el-input> -->
        <el-button type="primary" class="loginbt" @click="get_login">
          登陆</el-button
        >
      </el-tab-pane>
      <el-tab-pane label="手机号验证码登陆">
        <el-input
          placeholder="手机号"
          v-model="logindata.variable"
          class="inpt"
          :clearable="true"
          oninput="if(value.length>5)value=value.slice(0,11)"
          onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
        ></el-input>
        <el-input
          placeholder="验证码"
          class="vcode inpt"
          v-model="logindata.code"
          :clearable="true"
        ></el-input>
        <el-button @click="sendCode" :disabled="isDisabled">{{
          buttonName
        }}</el-button>
        <el-button type="primary" class="loginbt" @click="get_login">
          登陆</el-button
        >
      </el-tab-pane>
      <div class="foot">
        <a href="#" @click="forgetPsd"> 忘记密码?</a>
        <a href="#" @click="findNumber" class="re">账号找回</a>
        <a href="#" @click="register" class="re"> 新用户注册</a>
      </div>
    </el-tabs>

    <!-- <el-dialog
            title="请输入验证码"
            :visible.sync="dialogvisb"
            width="30%"
            center>
            <el-input type="text"
                    v-model="logindata.code"></el-input>
          <div class="demo-image">
            <div class="block">
              <el-image style="width: 100px; height: 50px"
                        :src="url"
                        ></el-image>
            </div>
            <div @click="get_code">换一换</div>
          </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogvisb = false">取 消</el-button>
                <el-button type="primary" @click="get_login">确 定</el-button>
            </span>
        </el-dialog> -->
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      logindata: {
        variable: "", // 用户名
        password: "", // 密码
        code: "",
        uuid:""
      },
      dialogvisb: false,
      url: "",
      trf: false,
      buttonName: "发送验证码",
      isDisabled: false,
      time: 60,
      addform:{
        remark:''
      }
    };
  },
  created() {},
  computed: {
    loginShow() {
      return this.$store.state.loginShow;
    }
  },
  methods: {
    // 修改银行卡号，4位一体 格式化
    //  formatCardNumber (cardNum) {
    //     // 获取input的dom对象，element ui的el-input这样才能拿到
    //     const input = this.$refs.cardInput.$el.getElementsByTagName('input')[0]
    //     const cursorIndex = input.selectionStart
    //     const lineNumOfCursorLeft = (cardNum.slice(0, cursorIndex).match(/\s/g) || []).length
    //     const noLine = cardNum.replace(/\s/g, '')
    //     const newCardNum = noLine.replace(/\D+/g, '').replace(/(\d{4})/g, '$1 ').replace(/\s$/, '')
    //     const newLineNumOfCursorLeft = (newCardNum.slice(0, cursorIndex).match(/\s/g) || []).length
    //     const newCursorIndex = cursorIndex + newLineNumOfCursorLeft - lineNumOfCursorLeft
    //     this.$nextTick(() => {
    //         this.logindata.a = newCardNum
    //         this.$nextTick(() => {
    //             input.selectionStart = newCursorIndex
    //             input.selectionEnd = newCursorIndex
    //         })
    //     })
    // },
    // 获取code
    // get_code () {
    //   this.dialogvisb = true
    //   this.$axios({
    //     method: 'GET',
    //     url: '/auth/code'

    //   }).then(res => {
    //     console.log(res, 'code请求成功')
    //     this.url = res.data.img
    //     this.logindata.uuid = res.data.uuid
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // },
    // login登陆
    get_login() {
      this.$emit("login", false);
      this.$axios({
        method: "POST",
        url: "/api/enterprise/user/loginPlatform",
        data: this.logindata
      })
        .then(res => {
          console.log("///sssss", res);
          this.dialogvisb = false;
          console.log(res, "login请求成功");
          // debugger
          // 注释掉就无法登陆
          this.$store.state.ids = res.data.enterpriseUserDTO.id;
          window.sessionStorage.setItem("user-token", JSON.stringify(res.data));
          this.$router.push("/");
          window.location.reload();
        })
        .catch(err => {
          console.log(err, "失败的login");
          this.$message("账号或密码有误");
        });
    },

    // 注冊跳转
    register() {
      this.$store.state.registerShow = true;
      this.$router.push("/register");
    },
    // 跳转账号找回Page
    findNumber(){
      this.$router.push('/findnumber')
    },
    goback() {
      this.$router.replace("/");
    },
    forgetPsd() {
      this.$message("验证码登陆后可重新修改密码");
    },
    checkPhone() {
      if (!/^1[34578]\d{9}$/.test(this.logindata.variable)) {
        this.trf = true;
      }
    },
    // 发送验证码
    sendCode() {
      if (!this.logindata.variable) {
        this.$message({
          message: "请输入手机号",
          type: "warning"
        });
        return;
      }
      this.$axios({
        method: "get",
        url: "api/sms/send",
        params: {
          phoneNumber: this.logindata.variable
        }
      })
        .then(res => {
          this.$message({
            message: "验证码发送成功",
            type: "success"
          });
          var me = this;
          this.isDisabled = true;
          var interval = window.setInterval(function() {
            me.buttonName = "已发送" + me.time;
            --me.time;
            if (me.time < 0) {
              me.buttonName = "重新发送";
              me.time = 60;
              me.isDisabled = false;
              window.clearInterval(interval);
            }
          }, 1000);
        })
        .catch(err => {
          console.log(err);
          this.$message.error({
            message: "验证码发送失败"
          });
        });
    }
  }
};
</script>

<style scoped lang="less">
input,
button {
  outline: none;
}
.loginCard {
  border-radius: 5px;
  height: 350px;
  width: 320px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
  border: 1px solid #dcdfe6;
  padding: 0 15px;
}
.message {
  color: red;
}
.vcode {
  display: inline-block;
  width: 150px;
  margin-right: 25px;
}
.el-tabs {
  height: 300px;
}
.inpt {
  margin-bottom: 20px;
}
.loginbt {
  margin-top: 20px;
  width: 100%;
  margin-left: 0 !important;
}
.head {
  margin-top: 5px;
  position: relative;
  img {
    height: 50px;
  }
  i {
    position: absolute;
    right: 0;
    top: 10px;
    font-size: 20px;
  }
}
.re {
  // margin-left: 125px;
}
.foot {
  display: flex;
  justify-content: space-between;
  padding-top: 5px;
  // padding-left: 20px;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #fff;
}
</style>
