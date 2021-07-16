<template>
  <div class="change">
    <navBar :title="title"></navBar>
    <van-row class="change-list" v-for="(item, index) in listInfo" :key="index">
      <van-col span="24">
        <van-col span="12">{{ item.name }}</van-col>
        <van-col span="10" offset="2">
          <van-button type="info" @click="modifInvioce(item,index)">修改</van-button>
          <van-button type="info">删除</van-button>
        </van-col>
      </van-col>
    </van-row>
    <van-overlay :show="show" @click="shows" z-index="1" default>
      <div class="wrapper" @click.stop>
        <div class="block">
          <van-row type="flex" justify="center">
            <van-col span="8" class="change-title">修改发票信息</van-col>
          </van-row>
          <!-- 发票信息 -->
          <van-row type="flex" justify="center">
            <van-col span="24" offset="0" class="van-cols">
              <el-form
                :model="info.enterpriseInfos[0]"
                status-icon
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item
                  prop="name"
                  label="企业名称"
                  :rules="[
                    {
                      required: true,
                      message: '请输入企业名称',
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input v-model="info.enterpriseInfos[0].name"></el-input>
                </el-form-item>
                <el-form-item
                  prop="creditCode"
                  label="信用代码"
                  :rules="[
                    {
                      required: true,
                      message: '请输入信用代码',
                      trigger: 'blur'
                    }
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
                    {
                      required: true,
                      message: '请输入注册地址',
                      trigger: 'blur'
                    }
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
                    {
                      required: true,
                      message: '请输入注册电话',
                      trigger: 'blur'
                    },
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
                  <el-input
                    v-model="info.enterpriseInfos[0].accountOpening"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  prop="bankAccount"
                  label="银行账号"
                  :rules="[
                    {
                      required: true,
                      message: '请输入银行账号',
                      trigger: 'blur'
                    }
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
                
              </el-form>
            </van-col>
          </van-row>

          <!-- 添加发票 -->
          <van-row type="flex" justify="center" v-if="ifAdd">
            <van-col span="12" class="change-title"><van-button type="info" @click="submitInvoice()">立即添加</van-button></van-col>
            <van-col span="12" class="change-title"><van-button type="default" @click="cancelAddInvocie()">取消添加</van-button></van-col>
          </van-row>

          <!-- 修改发票信息 -->
          <van-row type="flex" justify="center" v-else>
            <van-col span="12" class="change-title"><van-button type="info">确认修改</van-button></van-col>
            <van-col span="12" class="change-title"><van-button type="default" @click="cancelModify">取消修改</van-button></van-col>
          </van-row>
           
        </div>
      </div>
    </van-overlay>
    <van-row type="flex" justify="center" class="add-invoice" @click="addInvioce">
      <van-col span="24" class="change-title">
        <span>+ 添加发票信息</span>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import navBar from '../navBar'

export default {
  name: '',
  data () {
    return {
      title: {
        name: '',
        status: true,
      },
      listInfo: [],
      show: false,
      refList: {
        cardInput: "cardInput",
        cardInputs: "cardInputs"
      },
      ifAdd: true,//判断是否为修改或者添加发票信息
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
    }
  },
  components: {
    navBar,
  },
  created () {
    console.log('invoiceOrReceipt', this.$store.state.userId)
    let obj = this.$route.params
    this.title.name = obj.title
    let id = this.$store.state.userId
    if (this.invoiceOrReceipt) {
      let url = this.$api.billInfo
      this.$request.get(url, { id: id }).then((res) => {

        console.log('2ee2', res)
        this.listInfo = res.data
      })
    } else {
      let url = this.$api.billAddress
      this.$request.get(url, { id: id }).then((res) => {
        console.log('2ee2444444444444', res)
        this.listInfo = res.data
      })
    }
  },
  computed: {
    invoiceOrReceipt () {
      return this.$store.state.billOrAddress
    },
  },
  methods: {
    shows(){
      this.show = false;
       this.$refs.ruleForm.resetFields(); 
      this.empty();
    },
    // 修改发票信息
    modifInvioce (item, index) {
      this.show = true;
      this.ifAdd = false;
      console.log('item', item);
      this.info.enterpriseInfos[0].accountOpening = item.accountOpening;
      this.info.enterpriseInfos[0].id = item.id;
      this.info.enterpriseInfos[0].bankAccount = item.bankAccount;
      this.info.enterpriseInfos[0].phone = item.phone;
      this.info.enterpriseInfos[0].creditCode = item.creditCode;
      this.info.enterpriseInfos[0].name = item.name;
      this.info.enterpriseInfos[0].registerAddress = item.registerAddress;
      this.info.enterpriseInfos[0].enterpriseUser.id = this.$store.state.userId;
    },
    // 添加发票信息
    addInvioce () {
      this.show = true;
      this.ifAdd = true;
      this.empty()
    },
    // 立即添加发票
    submitInvoice(){

    },
    // 取消添加发票
    cancelAddInvocie(){

    },
    // 将发票信息置空
    empty(){
      this.info.enterpriseInfos[0].accountOpening = "";
      this.info.enterpriseInfos[0].id = "";
      this.info.enterpriseInfos[0].bankAccount = "";
      this.info.enterpriseInfos[0].phone = "";
      this.info.enterpriseInfos[0].creditCode = "";
      this.info.enterpriseInfos[0].name = "";
      this.info.enterpriseInfos[0].registerAddress = "";
      this.info.enterpriseInfos[0].enterpriseUser.id = "";
    },
    // 取消修改发票信息
    cancelModify(){
      this.show = false;
      this.empty()

    },
    formatCardNumber (cardInput, cardNum, info) {
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
  },
}
</script>

<style lang="less" scoped>
.change {
  background-color: rgba(40, 49, 73);
  min-height: 100vh;
  padding-bottom: 10px;
  .change-list {
    padding: 10px;
    color: #fff;
    > .van-col {
      height: 49px;
      background-color: rgba(64, 75, 105);
      border-radius: 3px;
      > .van-col {
        &:nth-child(1) {
          line-height: 49px;
          padding-left: 10px;
        }
        &:nth-child(2) {
          padding: 0 10px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          button {
            padding: 5px 10px;
            height: 30px;
          }
        }
      }
    }
  }
}
.change-title {
  margin-top: 20px;
  font-size: 18px;
}
.wrapper {
  width: 90%;
  margin: 120px auto;
}
.block {
  padding: 0 0 20px 0;
  width: 100%;
  background-color: #fff;
  border-radius: 3px;
}
.van-cols {
  padding: 20px;
}
/deep/.check {
  display: flex;
  justify-content: space-around;
}
.change-title {
  display: flex;
  justify-content: center;
}
.add-invoice {
  width: 100%;
  position: absolute;
  bottom: 0;
  height: 49px;
  line-height: 49px;
  > .change-title {
    margin: 0 auto;
    border-radius: 3px;
    background-color: rgba(64, 75, 105);
    color: #fff;
    width: 95%;
  }
}
</style>

