<template>
  <div class="find_number">
    <div class="head">
      找回账号
    </div>
    <div class="cancel">
      <i class="el-icon-close clbtn" @click="goback"></i>
    </div>
    <div class="user_info" v-if="step">
      <el-form
        :inline="true"
        :model="companyInfo"
        ref="form1"
        class="demo-form-inline"
      >
        <el-form-item
          label="公司名称"
          prop="enterpriseName"
          :rules="[
            { required: true, message: '请输入公司名称', trigger: 'change' }
          ]"
        >
          <el-input
            v-model="companyInfo.enterpriseName"
            placeholder="公司名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="公司税号"
          prop="creditCode"
          :rules="[
            { required: true, message: '请输入公司税号', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="companyInfo.creditCode"
            placeholder="公司税号"
          ></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="next">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="user_change" v-else>
      <el-form
        :inline="true"
        ref="form2"
        :model="userInfo"
        class="demo-form-inline"
      >
        <el-form-item
          label="修改账号"
          prop="loginPhone"
          :rules="[{ required: true, message: '请输入账号', trigger: 'blur' }]"
        >
          <el-input
            oninput="if(value.length>5)value=value.slice(0,11)"
            onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
            v-model="userInfo.loginPhone"
            placeholder="修改账号"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="修改密码"
          prop="pass"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
        >
          <el-input v-model="userInfo.pass" placeholder="修改密码"></el-input>
        </el-form-item>
        <el-form-item class="button">
          <el-button type="primary" @click="submit">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "findNumber",
  data() {
    return {
      msg: "",
      step: true,
      companyInfo: {
        enterpriseName: "",
        creditCode: ""
      },
      userInfo: {
        id: "",
        loginPhone: "",
        pass: ""
      }
    };
  },
  cerated() {},
  mounted() {},
  methods: {
    goback() {
      this.$router.replace("/");
    },
    next() {
      // this.step = false
      var url = this.$api.checkUserInfo;
      this.$refs.form1.validate(valid => {
        if (valid && this.companyInfo !== "")
          this.$request.post(url, this.companyInfo).then(res => {
            if (res.status == 200 && res.data != "") {
              this.step = false;
              this.userInfo.id = res.data.id;
            } else {
              this.$message.error(
                "请输入正确的公司名称/税号，如忘记请联系管理人员!"
              );
            }
          });
      });
    },
    submit() {
      this.$refs.form2.validate(valid => {
        if (valid && this.userInfo !== "") {
          this.$request.put(this.$api.amendNumber, this.userInfo).then(res => {
            // 17701246400
            if (res.status == 200) {
              this.$message.success("修改成功，请重新登录！");
              this.$router.push("/login");
            }
          });
        }
      });

     
    }
  }
};
</script>

<style lang="less" scoped>
.find_number {
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
  .cancel {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 20px;
  }
  .head {
    font-size: 25px;
    text-align: center;
    margin: 20px 0;
  }

  .user_info,
  .user_change {
    margin-top: 35px;
  }

  /deep/.el-input__inner {
    height: 35px;
  }
  /deep/.el-form--inline .el-form-item {
    margin-left: 26.5px;
    margin-bottom: 35px;
  }
  /deep/.button {
    width: 100%;
    margin-top: 30px;
    margin-left: 0 !important;
    margin-right: 0 !important;
    text-align: center;
    /deep/.el-form--inline .el-form-item__content {
      width: 120px;
    }
  }
  /deep/.button .el-form--inline .el-form-item__content {
    width: 120px;
  }
  /deep/.el-button {
    width: 120px;
    height: 35px;
    line-height: 35px;
    padding: 0 20px;
    //  margin-left: 40px;
  }
}
</style>
