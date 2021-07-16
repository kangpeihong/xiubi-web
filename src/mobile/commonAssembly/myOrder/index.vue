<template>
  <div class="order">
    <navBar :title="title"></navBar>
    <!-- 订单列表 -->
    <div class="order-box">
      <div class="order-list" v-for="(item, index) in orderInfo" :key="index">
        <div class="order-list-item">
          <div class="name">名称:{{ item.product.productName }}</div>
          <div class="price">单价:{{ item.price }}元</div>
          <div class="total">共计:{{ item.totalPrice | reserve2 }}元</div>
        </div>
        <div class="order-list-item">
          <div class="number">
            <span>购买数量:</span>
            <van-stepper
              v-model="item.orderNumber"
              theme="round"
              button-size="22"
              input-width="40px"
              @change="step(item.orderNumber, item.product, index)"
            />
          </div>
          <div class="unit">单位:{{ item.product.productUnits }}</div>
          <div class="delete">
            <van-button type="info">删除</van-button>
          </div>
        </div>
      </div>
      <p class="freight">运费:{{ freight }}</p>
      <p class="totals">合计:{{ totalPrice | reserve2 }}元</p>
      <p class="totals">应付:{{ (totalPrice + freight) | reserve2 }}</p>
      <div class="note">
        <div>备注:</div>
        <div>
          <van-field
            v-model="message"
            rows="1"
            autosize
            type="textarea"
            placeholder="请输入备注"
          />
        </div>
      </div>
    </div>
    <!-- 发票信息 -->
    <div class="invoice-box">
      <div>
        <van-row class="invoice-message">
          <van-col span="12">发票信息</van-col>
          <van-col span="8" offset="4">
            <van-button type="info" @click="invoiceChange">选择</van-button>
          </van-col>
        </van-row>
        <van-row class="invoice-info" v-if="companyInvoice">
          <van-col span="24">
            {{ companyInvoice[indexs].name }}
            {{ companyInvoice[indexs].creditCode }}
          </van-col>
          <van-col span="24">
            {{ companyInvoice[indexs].registerAddress }}
            {{ companyInvoice[indexs].phone }}
          </van-col>
          <van-col span="24">
            {{ companyInvoice[indexs].accountOpening }}
            {{ companyInvoice[indexs].bankAccount }}
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- 收货人信息 -->
    <div class="invoice-box">
      <div>
        <van-row class="invoice-message">
          <van-col span="12">收货人信息</van-col>
          <van-col span="8" offset="4">
            <van-button type="info">选择</van-button>
          </van-col>
        </van-row>
        <van-row class="invoice-info" v-if="receiptMessage">
          <van-col span="24">
            {{ receiptMessage[indexs].address }}
          </van-col>
          <van-col span="24">
            {{ receiptMessage[indexs].name }}
            {{ receiptMessage[indexs].phone }}
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- 收款账号 -->
    <div class="invoice-box">
      <div>
        <van-row class="invoice-message">
          <van-col span="24">收款账号</van-col>
        </van-row>
        <van-row class="invoice-info">
          <van-col span="24">
            北京修文印刷技术有限公司
          </van-col>
          <van-col span="24">
            招商银行股份有限公司北京北三环支行 &nbsp; 110917960410501
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- 确认订单 -->
    <div class="invoice-box">
      <div>
        <van-row class="invoice-message-bottom" type="flex" justify="space-between">
          <van-col span="6" >
            合计:{{ (totalPrice + freight) | reserve2 }}
          </van-col>
          <van-col span="8" >
            <van-button type="danger">确认订单</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '../navBar'
import utils from '../../../assets/js/utils'
export default {
  name: '',
  data () {
    return {
      title: {
        name: '我的订单',
        status: true,
      },
      orderInfo: [],
      orderNum: 1,
      totalPrice: 0,
      message: '',
      companyInvoice: '',
      receiptMessage: '',
    }
  },
  components: {
    navBar,
  },
  created () {
    this.getOrderInfo();

    // 查询企业发票信息
    let id = this.userInfo.id;
    this.$request.get(this.$api.billInfo, { id: id }).then(res => {
      console.log("2ee233333333", res);
      this.companyInvoice = res.data;
      // 历史订单页 所需要显示数据。（发票信息）
      // if (this.$route.params.billId) {
      //   let billId = this.$route.params.billId;
      //   let that = this;
      //   this.companyBill.forEach(function(value, index, array) {
      //     if (value.id == billId) {
      //       that.$store.state.indexs = index
      //     }
      //   });
      // }
    });

    // 查询收货人信息

    this.$request.get(this.$api.billAddress, { id: id }).then(res => {
      console.log("2ee2444444444444", res);
      this.receiptMessage = res.data;
        // 历史订单页 所需要显示数据。（邮寄地址）
      // if (this.$route.params.addressId) {
      //   let addressId = this.$route.params.addressId;
      //   let that = this;
      //   this.userAddress.forEach(function(value, index, array) {
      //     if (value.id == addressId) {
      //       that.$store.state.addressIndex = index
      //     }
      //   });
      // }
    });
  },
  computed: {
    freight () {
      if (this.totalPrice >= 300) {
        return 0
      } else {
        return Math.ceil(this.totalPrice * 0.08) > 10
          ? Math.ceil(this.totalPrice * 0.08)
          : 10
      }
    },
    userInfo () {
      const token = JSON.parse(window.sessionStorage.getItem("user-token"));
      return token.enterpriseUserDTO;
    },
    indexs () {
      return this.$store.state.indexs;
    },
    addressIndex () {
      return this.$store.state.addressIndex;
    },
  },
  filters: {
    // 保留两位小数
    reserve2 (num) {
      return utils.reserve2(num)
    },
  },
  methods: {
    //获取订单列表数据
    getOrderInfo () {
      console.log('123123123', this.orderInfo)

      this.orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
      console.log('000000', this.orderInfo)
      this.totalPrice = 0
      this.orderInfo.forEach((item) => {
        item.totalPrice = item.orderNumber * item.price
        this.totalPrice += parseFloat(item.totalPrice)
      })
      console.log('this.totalPrice', this.totalPrice)
    },
    //改变数量时获取相对应的单价
    step (num, product, index) {
      var inputNum = num //输入款默认值
      var moq = product.moq //订购不能低于的数量
      var beginNum = product.productPrices[0].productNumber //初始价格的最低数量
      // 订购数量不得低于 基准值
      if (moq != 0) {
        this.$toast(`起订数量为${moq}`)
        this.orderInfo[index].orderNumber = ''
      }
      if (inputNum <= beginNum) {
        this.orderInfo[index].price = product.productPrices[0].price
      }
      if (product.productPrices.length > 1 && inputNum >= beginNum) {
        for (var i = 0; i < product.productPrices.length; i++) {
          if (i < product.productPrices.length) {
            if (i + 1 == product.productPrices.length) {
              if (inputNum >= product.productPrices[i].productNumber) {
                this.orderInfo[index].price = product.productPrices[i].price
              }
            }

            if (
              i + 1 < product.productPrices.length &&
              i + 1 !== product.productPrices.length
            ) {
              if (
                inputNum >= product.productPrices[i].productNumber &&
                inputNum < product.productPrices[i + 1].productNumber
              ) {
                this.orderInfo[index].price = product.productPrices[i].price
              }
            }
          }
        }
      }
      console.log('sess', JSON.parse(sessionStorage.getItem('orderInfo')))
      this.reSet()
    },
    //将存入本地的订单列表进行同步
    reSet () {
      sessionStorage.setItem('orderInfo', JSON.stringify(this.orderInfo))
      this.getOrderInfo()
    },
    // 到发票信息页
    invoiceChange(){
      this.$router.push({
        name:'changePage',
        params:{title:'发票信息'}
      })
      this.$store.state.billOrAddress = true;
      sessionStorage.setItem('billOrAddress', JSON.stringify(true))
    }
  },
}
</script>

<style lang="less" scoped>
.order {
  padding: 10px;
}
.order-box {
  padding: 10px;
  color: #fff;
  border-radius: 3px;
  background-color: rgba(40, 49, 73);
  .order-list {
    background-color: rgba(64, 75, 105);
    border-radius: 3px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin-bottom: 10px;
    .order-list-item {
      width: 50%;
      > div {
        margin-top: 10px;
      }
      .number {
        display: flex;
        justify-content: space-between;
        /deep/.van-stepper {
          > button {
            border: 0.0625rem solid #ffffff;
            color: #000;
            background-color: #ffffff;
          }
          > input {
            color: #fff;
          }
        }
      } 
      .delete{
        display: flex;
        justify-content:flex-end;
        button{
          width: 100%;
          border-radius:25px;
        }
      }
    }
  }
  .freight {
    padding: 0 10px;
    margin-top: 10px;
  }
  .totals {
    padding: 0 10px;
    margin-top: 10px;
  }
  .note {
    padding: 0 10px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    > div {
      &:nth-child(1) {
        width: 15%;
      }
      &:nth-child(2) {
        width: 100%;
      }
    }
  }
}
.invoice-box {
  padding: 10px;
  color: #fff;
  border-radius: 3px;
  margin-top: 10px;
  background-color: rgba(40, 49, 73);
  > div {
    background-color: rgba(64, 75, 105);
  }
  .van-row {
    padding: 10px;
  }
  .invoice-message {
    .van-col {
      height: 44px;
      &:nth-child(1) {
        line-height: 44px;
        font-size: 18px;
      }
      &:nth-child(2) {
        display: flex;
        justify-content: flex-end;
        button{
          width: 100%;
          border-radius: 25px;
        }
      }
    }
  }
  .invoice-message-bottom{
    .van-col {
      height: 44px;
      &:nth-child(1) {
        line-height: 44px;
      }
      &:nth-child(2) {
     
        button{
          width: 100%;
          border-radius: 25px;
        }
      }
    }
  }
  .invoice-info {
    .van-col {
      margin-top: 10px;
    }
  }
}
</style>
