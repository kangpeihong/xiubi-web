<template>
  <div class="mobile-login">
    <div class="logo">
      <img src="../../assets/images/logoo.png" />
    </div>
    <div class="login-container">
      <!-- 账号和密码登陆 -->
      <div class="login-number" v-if="checkNumber">
        <el-form ref="form" :model="userInfo">
          <el-form-item
            prop="number"
            :rules="[
              { required: true, message: '请输入账号', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="userInfo.number"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item
            prop="password"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="userInfo.password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="numberLogin">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 手机号登陆 -->
      <div class="login-phone" v-else>
        <el-form ref="formPhone" :model="userPhone">
          <el-form-item
            prop="number"
            :rules="[
              { required: true, message: '请输入账号', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="userPhone.phone"
              placeholder="请输入账号"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="codes"
            prop="password"
            :rules="[
              { required: true, message: '请输入验证码', trigger: 'blur' }
            ]"
          >
            <el-input
              v-model="userPhone.code"
              placeholder="请输入验证码"
            ></el-input>
             <el-button @click="sendCode" :disabled="isDisabled">{{
            buttonName
          }}</el-button>
          </el-form-item>
          <el-form-item>
            <el-button @click="phoneLogin">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--忘记密码/注册 -->
      <div class="forget">
        <span @click="showPopup">忘记密码?</span>
        <span>|</span>
        <span @click="register">注册</span>
      </div>
      <!-- 忘记密码 -->
      <div class="forget-box">
        <van-popup v-model="show">
          <div class="modify">
            <div class="title">修改密码</div>
            <div class="modify-password">
              <span>新密码</span>
              <span>:</span>
              <div>
                <el-input placeholder="请输入新密码"></el-input>
              </div>
            </div>
            <div class="submit">
              <el-button type="primary">确认</el-button>
            </div>
          </div>
        </van-popup>
      </div>
      <!-- 其他方式登陆 -->
      <div class="xb-icon-bottom">
        <div class="xb-other">
          <div></div>
          <div>其他方式登陆</div>
          <div></div>
        </div>
        <div class="xb-icon-phone">
          <div class="icon">
            <i class="el-icon-mobile-phone"></i>
          </div>
          <div class="icon-name" @click="checkPhoneLogin">{{checkNumber?'手机号登陆':'账号密码登陆'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mobileLogin',
  data () {
    return {
      checkNumber:true,
      show: false,
      isDisabled:false,
      buttonName:'发送验证码',
      userInfo: {
        number: '',
        password: ''
      },
      userPhone:{
        phone:'',
        code:''
      }
    }
  },
  created () {
  },
  computed: {
  },
  methods: {
    showPopup () {
      this.show = true;
    },
    register () {
      // this.$router.push('/register')
      this.$router.push('/register')
    },
    sendCode(){

    },
    // 账号密码登陆
    numberLogin(){
      console.log('123123');
      this.$router.push('/mobileIndex')

    },
    //手机号登陆
    phoneLogin(){

    },
    checkPhoneLogin(){
      this.checkNumber  = !this.checkNumber;
    }
  }
}
</script>


<style scoped lang="less">
.mobile-login {
  // height: 100vh;
  padding: 70px 55px 30px 55px;
  .logo {
    // width: 225px;
    // margin: 70px auto;
    margin-bottom: 35px;
    img {
      width: 100%;
    }
  }
  /deep/.van-cell {
    border-radius: 30px;
  }
  .login-container {
    /deep/.el-input__inner {
      border-radius: 50px !important;
    }

    .forget {
      margin-top: 20px;
      color: #b8b0b0;
      width: 100%;
      display: flex;
      justify-content: space-around;
    }
    .forget-box {
      .modify {
        width: 300px;
        height: 300px;
        border-radius: 5px !important;
        > .title {
          width: 100%;
          height: 65px;
          margin-bottom: 30px;
          line-height: 65px;
          text-align: center;
          color: #000;
          font-size: 20px;
        }
        .modify-password {
          padding: 0 25px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          > span {
            color: #000;
            font-size: 16px;
          }
          /deep/.el-input__inner {
            width: 160px;
            border-radius: 3px !important;
            height: 38px;
          }
        }
        .submit {
          display: flex;
          justify-content: center;
          margin-top: 75px;
          padding: 0 25px;
          /deep/.el-button {
            width: 80px;
            border-radius: 3px !important;
          }
        }
      }
    }
    .xb-icon-bottom {
      .xb-other {
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #b8b0b0;
        margin-top: 65px;
        > div {
          &:nth-child(1) {
            width: 70px;
            border-top: 1px solid #cccccc;
          }
          &:nth-child(3) {
            width: 70px;
            border-top: 1px solid #cccccc;
          }
        }
      }
      .xb-icon-phone {
        display: flex;
        margin-top: 35px;
        color: #b8b0b0;
        flex-direction: column;
        align-items: center;
        /deep/.el-icon-mobile-phone {
          font-size: 25px;
        }
        .icon-name {
          margin-top: 10px;
        }
      }
    }
  }
}
/deep/.el-input__inner {
  width: 100%;
  border-radius: 50px;
}
/deep/.el-button {
  width: 100%;
  border-radius: 50px;
  background-color: #ecf5ff;
  color: #3a8ee6;
}

.codes{
  /deep/.el-form-item__content{
    display: flex;

    .el-input{
      width: 180px !important;
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
</style>


