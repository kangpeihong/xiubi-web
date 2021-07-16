<template>
  <div class="change">
    <navBar :title="title"></navBar>
    <van-row class="change-list" v-for="(item, index) in listInfo" :key="index">
      <van-col span="24">
        <van-col
          span="12"
          @click="radio(item, index)"
          :class="[active == index ? 'active' : '']"
          >{{ item.name }}</van-col
        >
        <van-col span="10" offset="2">
          <van-button type="info" @click="modifInvioce(item, index)"
            >修改</van-button
          >
          <van-button type="info" @click="deletes(index)">删除</van-button>
        </van-col>
      </van-col>
    </van-row>
    <!-- 修改发票信息 弹框 -->
    <van-overlay :show="show" @click="shows" z-index="1" default>
      <div class="wrapper" @click.stop>
        <!-- 发票 -->
        <div class="block" v-if="invoiceOrReceipt">
          <van-row type="flex" justify="center">
            <van-col span="8" class="change-title">{{
              ifAdd ? '添加发票信息' : '修改发票信息'
            }}</van-col>
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
            <van-col span="12" class="change-title"
              ><van-button type="info" @click="submitInvoice()"
                >立即添加</van-button
              ></van-col
            >
            <van-col span="12" class="change-title"
              ><van-button type="default" @click="cancelAddInvocie()"
                >取消添加</van-button
              ></van-col
            >
          </van-row>

          <!-- 修改发票信息 -->
          <van-row type="flex" justify="center" v-else>
            <van-col span="12" class="change-title"
              ><van-button type="info" @click="confirmModify()"
                >确认修改</van-button
              ></van-col
            >
            <van-col span="12" class="change-title"
              ><van-button type="default" @click="cancelModify()"
                >取消修改</van-button
              ></van-col
            >
          </van-row>
        </div>

        <!-- 收货 -->
        <div class="block" v-else>
          <van-row type="flex" justify="center">
            <van-col span="8" class="change-title">{{
              ifAdd ? '添加收货信息' : '修改收货信息'
            }}</van-col>
          </van-row>
          <!-- 收货信息 -->
          <van-row type="flex" justify="center">
            <van-col span="24" offset="0" class="van-cols">
              <el-form
                :model="postAddress"
                status-icon
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item
                  prop="address"
                  label="邮寄地址"
                  :rules="[
                    {
                      required: true,
                      message: '请输入邮寄地址',
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input v-model="postAddress.address"></el-input>
                </el-form-item>

                <el-form-item
                  prop="name"
                  label="邮寄姓名"
                  :rules="[
                    {
                      required: true,
                      message: '请输入邮寄姓名',
                      trigger: 'blur'
                    }
                  ]"
                >
                  <el-input v-model="postAddress.name"></el-input>
                </el-form-item>
                <el-form-item
                  prop="phone"
                  label="邮寄电话"
                  :rules="[
                    {
                      required: true,
                      message: '请输入邮寄电话',
                      trigger: 'blur'
                    },
                    { pattern: /^1[34578]\d{9}$/, message: '电话号输入有误' }
                  ]"
                >
                  <el-input v-model="postAddress.phone"></el-input>
                </el-form-item>
              </el-form>
            </van-col>
          </van-row>

          <!-- 添加收货 -->
          <van-row type="flex" justify="center" v-if="ifAdd">
            <van-col span="12" class="change-title"
              ><van-button type="info" @click="submitReceipt()"
                >立即添加</van-button
              ></van-col
            >
            <van-col span="12" class="change-title"
              ><van-button type="default" @click="cancelAddInvocie()"
                >取消添加</van-button
              ></van-col
            >
          </van-row>

          <!-- 修改收货信息 -->
          <van-row type="flex" justify="center" v-else>
            <van-col span="12" class="change-title"
              ><van-button type="info" @click="confirmModify()"
                >确认修改</van-button
              ></van-col
            >
            <van-col span="12" class="change-title"
              ><van-button type="default" @click="cancelModify()"
                >取消修改</van-button
              ></van-col
            >
          </van-row>
        </div>
      </div>
    </van-overlay>
    <!-- 添加发票信息/添加收货信息 -->
    <van-row
      type="flex"
      justify="center"
      class="add-invoice"
      @click="addInvioce"
    >
      <van-col span="24" class="change-title">
        <span>+ {{ invoiceOrReceipt ? '添加发票信息' : '添加收货信息' }}</span>
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
      radioValue: null,
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
      },
      beforeChangeInfo: {}
    }
  },
  components: {
    navBar,
  },
  created () {



    // 解决刷新navtitle消失
    if (sessionStorage.getItem('invoiceTitle')) {
      this.title.name = sessionStorage.getItem('invoiceTitle')
    } else {
      this.title.name = obj.title
    }
    let obj = this.$route.params
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
    // 判断是否为发票信息还是收货信息
    invoiceOrReceipt () {
      return this.$store.state.billOrAddress
    },

    active: {
      get () {
        return this.$store.state.redioActive
      },
      set () {

      }
    }
  },
  methods: {
    // 选择发票信息或收货信息
    radio (item, index) {

      if (this.invoiceOrReceipt) {
        this.$store.state.indexs = index;
        sessionStorage.setItem('indexs', JSON.stringify(index))
        this.$store.state.redioActive = index;
      } else {
        this.$store.state.addressIndex = index;
        sessionStorage.setItem('addressIndex', JSON.stringify(index))
        this.$store.state.redioActive = index;
      }
      this.$router.go(-1)
    },
    // 遮罩层开关
    shows () {
      this.show = false;
      this.$refs.ruleForm.resetFields();
      this.empty();
    },
    // 修改(按钮)发票信息/修改收货信息 修改时获取每一条的初始值
    modifInvioce (item, index) {
      this.show = true;
      this.ifAdd = false;
      console.log('item', item);
      console.log('item', this.invoiceOrReceipt);

      if (this.invoiceOrReceipt) {
        this.info.enterpriseInfos[0].accountOpening = item.accountOpening;
        this.info.enterpriseInfos[0].id = item.id;
        this.info.enterpriseInfos[0].bankAccount = item.bankAccount;
        this.info.enterpriseInfos[0].phone = item.phone;
        this.info.enterpriseInfos[0].creditCode = item.creditCode;
        this.info.enterpriseInfos[0].name = item.name;
        this.info.enterpriseInfos[0].registerAddress = item.registerAddress;
        this.info.enterpriseInfos[0].enterpriseUser.id = this.$store.state.userId;
        this.beforeChangeInfo = JSON.parse(JSON.stringify(this.info.enterpriseInfos[0]));
      } else {
        this.postAddress.address = item.address;
        this.postAddress.name = item.name;
        this.postAddress.phone = item.phone;
        this.postAddress.id = item.id;
        this.postAddress.enterpriseUser.id = this.$store.state.userId;
        this.beforeChangeInfo = JSON.parse(JSON.stringify(this.postAddress));
      }


    },
    // 删除
    deletes (index) {
      console.log('invoiceOrReceipt', this.invoiceOrReceipt);
      if (this.invoiceOrReceipt) {
        // 发票信息删除
        console.log("dele", this.listInfo[index].id);
        this.$request.delete(this.$api.delInfo, { id: this.listInfo[index].id }).then(res => {
          if (res.status == 200) {
            this.listInfo.splice(index, 1);
          }
        });

      } else {
        // 收货信息删除
        this.$request.delete(this.$api.delAddress, { id: this.listInfo[index].id }).then(res => {
          if (res.status == 200) {
            this.listInfo.splice(index, 1);
          }
          console.log("res", res);
        });
      }

    },
    // 添加发票信息
    addInvioce () {
      this.show = true;
      this.ifAdd = true;
      this.empty()
    },
    // 立即添加发票
    submitInvoice () {
      this.info.enterpriseInfos[0].enterpriseUser.id = this.$store.state.userId;
      console.log('3434', this.info.enterpriseInfos[0]);

      this.$refs.ruleForm.validate(valid => {

        if (valid) {
          this.$request
            .post(this.$api.addInfo, this.info.enterpriseInfos[0])
            .then(res => {
              this.$toast('添加成功')
              this.show = false;
              this.$router.go(0)
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$toast('请输入正确信息')
        }

      })

    },

    // 取消添加发票
    cancelAddInvocie () {
      this.show = false;
      this.$refs.ruleForm.resetFields();
    },
    // 将发票/收货信息置空
    empty () {
      if (this.invoiceOrReceipt) {
        this.info.enterpriseInfos[0].accountOpening = "";
        this.info.enterpriseInfos[0].id = "";
        this.info.enterpriseInfos[0].bankAccount = "";
        this.info.enterpriseInfos[0].phone = "";
        this.info.enterpriseInfos[0].creditCode = "";
        this.info.enterpriseInfos[0].name = "";
        this.info.enterpriseInfos[0].registerAddress = "";
      } else {
        this.postAddress.address = "";
        this.postAddress.name = "";
        this.postAddress.phone = "";
        this.postAddress.id = "";
      }
      // this.info.enterpriseInfos[0].enterpriseUser.id = "";
    },
    // 添加收货信息
    submitReceipt () {
      console.log('7777', this.postAddress);
      this.postAddress.enterpriseUser.id = this.$store.state.userId;
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$request
            .post(this.$api.addAddress, this.postAddress)
            .then(res => {
              console.log("res", res);
              this.show = false;
              this.$router.go(0)

            });
        } else {
          this.$toast('请输入必填信息')
        }
      })

    },
    // 确认修改发票/收货信息
    confirmModify () {

      // obj 为修改之前的值,info 修改之后的值 相等时不进行接口请求
      let obj = JSON.stringify(this.beforeChangeInfo)
      var info
      if (this.invoiceOrReceipt) {
        info = JSON.stringify(this.info.enterpriseInfos[0])
      } else {
        info = JSON.stringify(this.postAddress)
      }
      if (obj == info) {
        this.$toast('请修改')
      } else {

        this.$refs.ruleForm.validate(vaild => {
          if (vaild) {
            if (this.invoiceOrReceipt) {
              // 修改发票信息
              this.$request
                .put(this.$api.changeInfo, this.info.enterpriseInfos[0])
                .then(res => {
                  if (res.status == 200) {
                    this.$toast('修改成功')
                    this.show = false;
                    this.$router.go(0)
                  }
                });
            } else {
              console.log('人人人', this.postAddress);
              // 修改收货信息
              this.$request.put(this.$api.changeAddress, this.postAddress).then(res => {
                console.log('res', res)
                this.show = false;
                this.$router.go(0);
              })

            }

          } else {
            this.$toast('请输入必要信息')
          }
        })
      }
    },
    // 取消修改发票信息
    cancelModify () {
      this.show = false;
      this.$refs.ruleForm.resetFields()
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
.active {
  color: aqua;
}
</style>

