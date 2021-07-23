<template>
  <div>
    <el-card class="register animated fadeIn" v-if="registerShow">
      <el-steps
        :space="110"
        :active="this.$route.query.userId ? 2 : active"
        finish-status="success"
        :align-center="true"
        class="title"
      >
        <el-step title="用戶信息"></el-step>
        <el-step title="企业信息"></el-step>
        <el-step title="汇款信息"></el-step>
        <el-step title="收货信息"></el-step>
      </el-steps>
      <i class="el-icon-close clbtn" @click="goback"></i>
      <el-form :model="info" ref="form0" label-width="100px">
        <!-- <el-form-item prop="enterpriseCode" label="企业编号"
            v-show=" active === 0">
          <el-input v-model="info.enterpriseCode" :disabled="!vsb"></el-input>
        </el-form-item> -->
        <el-form-item
          ref="userName"
          prop="userName"
          label="用户名"
          v-show="active === 0"
          :rules="[
            {message: '请输入用户名', trigger: 'blur' },
          ]"
        >
          <el-input v-model="info.userName" :disabled="!vsb"></el-input>
        </el-form-item>
        <el-form-item
          ref="email"
          prop="email"
          label="邮箱"
          v-show="active === 0"
          :rules="[
            {message: '请输入邮箱', trigger: 'blur' },
            { pattern: /^[a-zA-Z0-9_-\W]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '邮箱输入有误' }
          ]"
        >
          <el-input v-model="info.email" :disabled="!vsb"></el-input>
        </el-form-item>
        <el-form-item
          ref="loginphone"
          prop="loginPhone"
          label="手机号"
          v-show="active === 0"
          :rules="[
            { required: true, message: '请输入手机号', trigger: 'change' },
            { pattern: /^1[34578]\d{9}$/, message: '电话号输入有误' }
          ]"
        >
          <el-input
            oninput="if(value.length>11)value=value.slice(0,11)"
            v-model="info.loginPhone"
            @blur="ifNumber"
            :disabled="!vsb"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="验证码"
          v-show="active === 0"
          :rules="[
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]"
        >
          <el-input v-model="vcode" :disabled="!vsb" class="vcode"></el-input>
          <el-button @click="sendCode" :disabled="isDisabled">{{
            buttonName
          }}</el-button>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          v-show="active === 0"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input v-model="info.password" :disabled="!vsb"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="info.enterpriseInfos[0]" ref="form1" label-width="100px">
        <!-- <el-form-item prop="enterpriseCode" label="企业编号"
            v-show=" active === 0">
          <el-input v-model="info.enterpriseCode" :disabled="!vsb"></el-input>
        </el-form-item> -->
        <el-form-item
          prop="name"
          label="企业名称"
          v-show="active === 1"
          :rules="[
            { required: true, message: '请输入企业名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="info.enterpriseInfos[0].name" :disabled="!vsb"></el-input>
        </el-form-item>
        <el-form-item
          prop="creditCode"
          label="信用代码"
          v-show="active === 1"
          :rules="[
            { required: true, message: '请输入信用代码', trigger: 'blur' }
          ]"
        >
          <el-input
            :ref="refList.cardInput"
            @input="formatCardNumber(refList.cardInput, info.enterpriseInfos[0].creditCode, info)"
            v-model="info.enterpriseInfos[0].creditCode"
            :disabled="!vsb"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="registerAddress"
          label="注册地址"
          v-show="active === 1"
          :rules="[
            { required: true, message: '请输入注册地址', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="info.enterpriseInfos[0].registerAddress"
            :disabled="!vsb"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="phone"
          label="注册电话"
          v-show="active === 1"
          :rules="[
            { required: true, message: '请输入注册电话', trigger: 'blur' },
            { pattern: /\d/, message: '电话号输入有误' }
          ]"
        >
          <el-input v-model="info.enterpriseInfos[0].phone" :disabled="!vsb"></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="info.enterpriseInfos[0]" ref="form2" label-width="100px">
        <el-form-item
          prop="accountOpening"
          label="开户行"
          v-show="active === 2"
          :rules="[
            { required: true, message: '请输入开户行', trigger: 'blur' }
          ]"
        >
          <el-input v-model="info.enterpriseInfos[0].accountOpening"></el-input>
        </el-form-item>
        <el-form-item
          prop="bankAccount"
          label="银行账号"
          v-show="active === 2"
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
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form :model="info.enterpriseAddresses[0]" ref="form3" label-width="100px">
        <el-form-item
          prop="name"
          label="收货人"
          v-show="active === 3"
          :rules="[
            { required: true, message: '请输入收货人名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="info.enterpriseAddresses[0].name"></el-input>
        </el-form-item>
        <el-form-item
          prop="phone"
          label="收货电话"
          v-show="active === 3"
          :rules="[
            { required: true, message: '请输入注册电话', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '电话号输入有误' }
          ]"
        >
          <el-input v-model="info.enterpriseAddresses[0].phone"></el-input>
        </el-form-item>
        <el-form-item
          prop="address"
          label="收货地址"
          v-show="active === 3"
          :rules="[
            { required: true, message: '请输入收货地址', trigger: 'blur' }
          ]"
        >
          <el-input v-model="info.enterpriseAddresses[0].address"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="next" v-show="active !== 3">下一步</el-button>
        </el-form-item>
        <el-form-item v-if="vsb" v-show="active === 3">
          <el-button type="primary" @click="onSubmit" class="resbutton"
            >立即注册</el-button
          >
        </el-form-item>
        <el-form-item v-if="!vsb" v-show="active === 3">
          <el-button type="primary" @click="onSubmit">立即修改</el-button>
          <el-button @click="onCancel">取消修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Bus from "../../utils/bus.js";
const info = JSON.parse(window.sessionStorage.getItem("user-token"));
export default {
  name: "register",
  data() {
    return {
      buttonName: "发送验证码",
      refList: {
        cardInput: "cardInput",
        cardInputs: "cardInputs"
      },
      isDisabled: false,
      time: 60,
      vcode: "",
      ifnumber: "",
      info: {
        loginPhone: "",
        password: "",
        userName:"",
        email:"",
        enterpriseInfos:[{
          accountOpening:"",
          bankAccount: "",
          phone:"",
          creditCode:"",
          name:"",
          registerAddress:"",
        }],
        enterpriseAddresses:[{
          name:"",
          address:"",
          phone:"",
        }],
      },
      vsb: true,
      active: 0
    };
  },
  created() {
    if (this.$route.query.userId) {
      console.log(this.$route.query.userId);
      this.getinfo();
      this.vsb = false;
      this.active = 2;
    }
  },
  computed: {
    registerShow() {
      return this.$store.state.registerShow;
    }
  },
  methods: {
    // 修改银行卡号，4位一体 格式化
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
    ifNumber() {
      // 200 无手机号
      // 201 有手机号
      if (this.active === 0) {
        if (this.info.loginPhone !== "") {
          var url = this.$api.ifNumber + this.info.loginPhone;
          this.$request
            .get(url)
            .then(res => {
              debugger;
              if (res.status == 200) {
                this.ifnumber = true;
                this.isDisabled = false;
              } else if (res.status == 201) {
                this.$message("此手机号已被注册");
              }
            })
            .catch(err => {
              if (err.status == 201) {
                this.ifnumber = false;
                this.$message("此手机号已被注册");
                this.isDisabled = true;
              }
            });
        }
      }
    },
    register() {
      let _this = this;
      this.$refs.form3.validate(valid => {
        if (valid) {

          console.log('info',this.info)
          // this.info.bankAccount = this.info.bankAccount.replace(/\s+/g, "");
          // this.info.creditCode = this.info.creditCode.replace(/\s+/g, "");
          this.$request.post(this.$api.regapi, this.info).then(res => {
            this.$router.push("/login");
            this.$notify({
              title: "提示",
              message: "注册成功请登录",
              duration: 0
            });
          }).catch(err=>{

          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    change() {
      this.$axios({
        method: "put",
        url: "/api/xwEnterprise",
        data: this.info
      })
        .then(res => {
          console.log(res);
          info.enterpriseUserDTO = this.info;
          window.sessionStorage.setItem("user-token", JSON.stringify(info));
          Bus.$emit("change", this.info);

          this.$router.push("/order");
        })
        .catch(err => {
          console.log(err);
        });
    },
    getinfo() {
      this.info = info.enterpriseUserDTO;
    },
    onSubmit() {
      if (this.$route.query.userId) {
        this.change();
      } else {
        this.register();
      }
    },
    onCancel() {
      this.$router.push("/order");
    },
    next() {
      if (this.active == 0) {
        debugger
        this.$refs.form0.validate(valid => {
          if (valid && this.ifnumber) {
            if (this.vcode == "") {
              this.$message("请输入验证码");
            } else {
              this.$axios({
                method: "post",
                url: "api/sms/test",
                params: {
                  vcode: this.vcode,
                  phoneNumber: this.info.loginPhone
                }
              })
                .then(res => {
					        debugger
                  console.log("rrr1122222", res);
                  this.active++;
                })
                .catch(err => {
                  console.log("123", err);
                  this.$message("验证码有误,请重新输入！");
                });
            }
          }
        });
      } else if (this.active === 1) {
        this.$refs.form1.validate(valid => {
          if (valid) this.active++;
        });
      } else if (this.active === 2) {
        this.$refs.form2.validate(valid => {
          if (valid) this.active++;
        });
      }
      // if (this.active === 0) {
      //   this.$refs.form0.validate((valid) => {
      //     if (valid) {
      //       this.$axios({
      //         method: 'get',
      //         url: `api/xwEnterprise/create/${this.info.loginPhone}`
      //       }).then(res => {
      //         if (!res) {
      //           this.$axios({
      //             method: 'post',
      //             url: 'api/sms/test',
      //             params: {
      //               vcode: this.vcode,
      //               phoneNumber: this.info.loginPhone
      //             }
      //           }).then(res => {
      //             if (res) {
      //               this.active++
      //             }
      //           }).catch(err => {
      //             console.log(err)
      //             this.$message('验证码有误')
      //           })
      //         } else {
      //           this.$message('此手机号已被注册')
      //         }
      //       })
      //     }
      //   })
      // } else if (this.active === 1) {
      //   this.$refs.form1.validate((valid) => {
      //     if (valid) this.active++
      //   })
      // } else if (this.active === 2) {
      //   this.$refs.form2.validate((valid) => {
      //     if (valid) this.active++
      //   })
      // }
    },
    sendCode() {
      this.$refs.form0.validateField("loginPhone", valid => {
        if (!valid) {
          this.$axios({
            method: "get",
            url: "api/sms/send",
            params: {
              phoneNumber: this.info.loginPhone
            }
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
        }
      });
    },
    goback() {
      this.$router.replace("/");
    }
  }
};
</script>

<style lang="less" scoped>
// .title{
//   margin-left: 40px;
// }
.register {
  height: 500px;
  width: 450px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding-right: 40px;
}
.resbutton {
  width: 150px;
  // margin-left: -60px;
}
.el-steps {
  margin-bottom: 50px;
}
.vcode {
  display: inline-block;
  width: 120px;
  margin-right: 25px;
}
.clbtn {
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 18px;
  z-index: 9;
}
</style>
