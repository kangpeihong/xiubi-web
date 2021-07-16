<template>
  <div>
    <el-card class="register">
      <div slot="header" class="clearfix">
        <span>
          {{ ifEmpty ? "添加" : "修改"
          }}{{ billOrAddress ? "发票" : "邮寄" }}信息</span
        >
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click.native="onCancel"
          >关闭</el-button
        >
      </div>
      <el-form
        v-if="billOrAddress"
        :model="info.enterpriseInfos[0]"
        ref="form"
        label-width="80px"
      >
        <!-- <el-form-item prop="enterpriseCode" label="企业编号"
            v-show=" active === 0">
          <el-input v-model="info.enterpriseCode" :disabled="!vsb"></el-input>
        </el-form-item> -->
        <!-- <el-form-item ref="loginphone" prop="loginPhone" label="手机号"
            :rules="[
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                    {pattern: /^1[34578]\d{9}$/, message: '电话号输入有误'}
                    ]">
          <el-input v-model="info.loginPhone" :disabled="!vsb"></el-input>
        </el-form-item>
        <el-form-item  label="验证码"
            :rules="[
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]">
          <el-input v-model="vcode" :disabled="!vsb" class="vcode" ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码"
            :rules="[
                    { required: true, message: '请输入密码', trigger: 'blur' }

                    ]">
          <el-input v-model="info.password" :disabled="!vsb"></el-input>
        </el-form-item> -->

        <!-- <el-form-item prop="enterpriseCode" label="企业编号"
            v-show=" active === 0">
          <el-input v-model="info.enterpriseCode" :disabled="!vsb"></el-input>
        </el-form-item> -->
        <el-form-item
          prop="name"
          label="企业名称"
          :rules="[
            { required: true, message: '请输入企业名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="info.enterpriseInfos[0].name"></el-input>
        </el-form-item>
        <el-form-item
          prop="creditCode"
          label="信用代码"
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
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="registerAddress"
          label="注册地址"
          :rules="[
            { required: true, message: '请输入注册地址', trigger: 'blur' }
          ]"
        >
          <el-input
            v-model="info.enterpriseInfos[0].registerAddress"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="phone"
          label="注册电话"
          :rules="[
            { required: true, message: '请输入注册电话', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '电话号输入有误' }
          ]"
        >
          <el-input v-model="info.enterpriseInfos[0].phone"></el-input>
        </el-form-item>

        <el-form-item
          prop="accountOpening"
          label="开户行"
          :rules="[
            { required: true, message: '请输入开户行', trigger: 'blur' }
          ]"
        >
          <el-input v-model="info.enterpriseInfos[0].accountOpening"></el-input>
        </el-form-item>
        <el-form-item
          prop="bankAccount"
          label="银行账号"
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
          ></el-input>
        </el-form-item>

        <!-- <el-form-item prop="consignee" label="收货人"
            :rules="[
                    {required: true,message: '请输入收货人名称',trigger: 'blur'}

                    ]">
          <el-input v-model="info.consignee"></el-input>
        </el-form-item> -->
        <!-- <el-form-item prop="telephone" label="收货电话"
            :rules="[
                     { required: true, message: '请输入注册电话', trigger: 'blur' },
                    {pattern: /^1[34578]\d{9}$/, message: '电话号输入有误'}
                    ]">
          <el-input v-model="info.telephone"></el-input>
        </el-form-item>
        <el-form-item prop="harvestAddress" label="收货地址"
            :rules="[
                     { required: true, message: '请输入收货地址', trigger: 'blur' },

                    ]">
          <el-input v-model="info.harvestAddress"></el-input>
        </el-form-item> -->

        <el-form-item>
          <el-button type="primary" @click="onSubmit">{{
            ifEmpty ? "立即添加" : "立即修改"
          }}</el-button>

          <el-button @click="onCancel">{{
            ifEmpty ? "取消添加" : "取消修改"
          }}</el-button>
        </el-form-item>
      </el-form>

      <el-form v-else :model="postAddress" ref="form2" label-width="80px">
        <el-form-item
          prop="address"
          label="邮寄地址"
          :rules="[
            { required: true, message: '请输入邮寄地址', trigger: 'blur' }
          ]"
        >
          <el-input v-model="postAddress.address"></el-input>
        </el-form-item>

        <el-form-item
          prop="name"
          label="邮寄姓名"
          :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]"
        >
          <el-input v-model="postAddress.name"></el-input>
        </el-form-item>

        <el-form-item
          prop="phone"
          label="邮寄电话"
          :rules="[
            { required: true, message: '请输入电话', trigger: 'blur' },
            { pattern: /^1[34578]\d{9}$/, message: '电话号输入有误' }
          ]"
        >
          <el-input v-model="postAddress.phone"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="postSubmit">{{
            ifEmpty ? "立即添加" : "立即修改"
          }}</el-button>

          <el-button @click="onCancel">{{
            ifEmpty ? "取消添加" : "取消修改"
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Bus from "../../utils/bus.js";
const info = JSON.parse(window.sessionStorage.getItem("user-token"));
export default {
  data() {
    return {
      ifEmpty: "",

      refList: {
        cardInput: "cardInput",
        cardInputs: "cardInputs"
      },
      // info: {
      //   loginPhone: '',
      //   password: '',
      //   accountOpening: '',
      //   bankAccount: '',
      //   consignee: '',
      //   creditCode: '',
      //   enterpriseName: '',
      //   harvestAddress: '',
      //   phoneNumber: '',
      //   registeredAddress: '',
      //   telephone: ''
      // },
      info: {
        loginPhone: "",
        password: "",
        userName: "",
        email: "",
        enterpriseInfos: [
          {
            id: "",
            accountOpening: "",
            bankAccount: "",
            phone: "",
            creditCode: "",
            name: "",
            registerAddress: "",
            enterpriseUser: {
              id: ""
            }
          }
        ],
        enterpriseAddresses: [
          {
            name: "",
            address: "",
            phone: ""
          }
        ]
      },
      postAddress: {
        id: "",
        address: "",
        name: "",
        phone: "",
        enterpriseUser: {
          id: ""
        }
      }
    };
  },
  created() {
    this.ifEmpty = JSON.parse(this.$route.query.ifEmpty);
  },
  computed: {
    billOrAddress() {
      return this.$store.state.billOrAddress;
    }
  },
  mounted() {
    let empty = JSON.parse(this.$route.query.ifEmpty);

    console.log(empty);
    if (!empty) {
      this.ifEmpty = empty;
      let datas = this.$route.query.datas;
      console.log("ppp", datas);
      //修改发票  显示所需要的信息。
      if (!this.ifEmpty && this.billOrAddress) {
        console.log("ssdafsfasf", datas);
        this.info.enterpriseInfos[0].accountOpening = datas.accountOpening;
        this.info.enterpriseInfos[0].id = datas.id;
        this.info.enterpriseInfos[0].bankAccount = datas.bankAccount;
        this.info.enterpriseInfos[0].phone = datas.phone;
        this.info.enterpriseInfos[0].creditCode = datas.creditCode;
        this.info.enterpriseInfos[0].name = datas.name;
        this.info.enterpriseInfos[0].registerAddress = datas.registerAddress;
        this.info.enterpriseInfos[0].enterpriseUser.id =
          info.enterpriseUserDTO.id;
      }
      // 修改邮寄地址 所需要显示的数据
      if (!this.billOrAddress) {
        this.postAddress.address = datas.address;
        this.postAddress.name = datas.name;
        this.postAddress.phone = datas.phone;
        this.postAddress.enterpriseUser.id = info.enterpriseUserDTO.id;
      }
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
    onSubmit() {
      console.log("empty", this.ifEmpty);
      let obj = this.info.enterpriseInfos[0];
      console.log("zhejiushi", info);
      obj.enterpriseUser.id = info.enterpriseUserDTO.id;
      console.log("zhejiushi", obj);
      this.$refs.form.validate(valid => {
        console.log("ds", valid);
        if (valid) {
          if (this.ifEmpty) {
            // 添加企业信息
            this.$request
              .post(this.$api.addInfo, obj)
              .then(res => {
                console.log("sjfkasd", res);

                this.$message({
                  message: "添加成功",
                  type: "success"
                });
                // this.$store.state.back = true;

                this.$router.go(-1);
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            // 修改企业信息

            // this.$axios({
            //   method:'put',
            //   url:'/api/enterprise/info',
            //   data:this.info.enterpriseInfos[0]
            // }).then(res=>{
            //       debugger
            // console.log('put',res)
            // })

            this.$request
              .put(this.$api.changeInfo, this.info.enterpriseInfos[0])
              .then(res => {
                if (res.status == 200) {
                  this.$message({
                    message: "修改成功",
                    type: "success"
                  });

                  this.$router.go(-1);
                }
              });
          }
        } else {
          this.$message("请输入正确信息");
          return;
        }
      });

      // this.$axios({
      //   method:'post',
      //   url:'/api/enterprise/info',
      //   data:obj
      // }).then(res => {
      //   console.log('sadfs',res)
      // })

      // this.$axios({
      //   method: "put",
      //   url: "/api/xwEnterprise",
      //   data: this.info
      // })
      //   .then(res => {
      //     console.log(res);
      //     info.enterpriseUserDTO = this.info;
      //     window.sessionStorage.setItem("user-token", JSON.stringify(info));
      //     Bus.$emit("change", this.info);

      //     this.$router.push("/order");
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    postSubmit() {
      this.$refs.form2.validate(vaild => {
        console.log("vaild", vaild);
        let datas = this.$route.query.datas;

        console.log('klklklklklklklk',datas);
        
        this.postAddress.enterpriseUser.id = info.enterpriseUserDTO.id;
        console.log("vaild", this.postAddress);

        if (vaild) {
          if (this.ifEmpty) {
            debugger
            this.$request
              .post(this.$api.addAddress, this.postAddress)
              .then(res => {
                console.log("res", res);
                if (res.status == 200) {
                  this.$message({
                    message: "添加成功",
                    type: "success"
                  });
                }

                this.$router.back();
              });
          }else{
            this.postAddress.id = datas.id;

            console.log("datassss",this.postAddress)
            this.$request.put(this.$api.changeAddress,this.postAddress).then( res =>{
              console.log('res',res)

              if(res.status == 200){
                 this.$message({
                    message: "修改成功",
                    type: "success"
                  });
              }

              this.$router.go(-1);
            })
          }
        }
      });
    },
    onCancel() {
      // this.$store.state.back = false;
      this.$router.back();
    }
  }
};
</script>

<style>
.register {
  /* height: 550px; */
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /* padding-right: 40px; */
}

.el-radio-group {
  height: 200px;
  overflow-y: scroll;
}

/* .el-radio-group::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
  border-radius: 10px !important;
  background-color: rgba(255,255,255,0.8);
}

.el-radio-group::-webkit-scrollbar
{
  width: 5px !important;
  background-color: rgba(0,0,0,0);
}
.el-radio-group::-webkit-scrollbar-thumb
{
  border-radius: 15px !important;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,.3);
  background-color: #555;
} */
</style>
