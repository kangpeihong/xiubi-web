<template>
<div class="horder" id="pdfDom">
    <!-- <table class="orderInfo"  >
      <tr >
        <td>名称</td>
        <td>数量</td>
        <td>单价</td>
        <td>单位</td>
        <td>金额</td>

      </tr >
      <tr v-for="item in proList" :key="item.productId">
        <td>{{item.product.productName}}</td>
        <td>{{item.orderNumber}}</td>
        <td>{{item.price}}</td>
        <td>{{item.product.productUnits}}</td>
        <td>{{item.totalprice}}</td>
      </tr>
      <tr>
        <td>合计金额:</td>
        <td></td>
        <td></td>
        <td></td>
        <td>{{totalPrice}}</td>
      </tr>
      <tr>
        <td>运费:</td>
        <td></td>
        <td></td>
        <td></td>
        <td>0</td>
      </tr>
      <tr>
        <td>应付总额:</td>
        <td></td>
        <td></td>
        <td></td>
        <td>{totalPrice}}</td>
      </tr>
    </table> -->
    <div class="num">
      {{timestampToTime(createTime)}} &nbsp;&nbsp;&nbsp;&nbsp;订单号:{{orderNumber}}
    </div>
    <div class="nav">
      <span>商品</span>
      <span>单价(元)</span>
      <span>数量</span>
      <span>金额(元)</span>

    </div>
    <div v-for="item in orderDetails" :key='item.detailsId' class="list">
      <div>
        <!-- <img :src="item.product.smallFilePath" alt=""> -->
        {{item.product.productName}}
      </div>
      <div>
        {{toDecimal2(item.price)}}
      </div>
      <div>
          {{item.orderNumber}}{{item.product.productUnits}}
      </div>
      <div>
          {{toDecimal2(item.totalprice)}}
      </div>
    </div>
    <!-- <div class="info">
      <p>收货人:{{}}</p>
      <p>收货人电话:{{contactNumber}}</p>
      <p>收货地址:{{address}}</p>
    </div> -->
    总金额:{{toDecimal2(orderMmount)}}元
      <input type="button" value="打印订单" class="right" @click="onPrint">

</div>
</template>

<script>
export default {
  data () {
    return {
      orderNumber: '',
      orderMmount: '',
      createTime: '',
      address: '',
      contactNumber: '',
      orderDetails: []
    }
  },
  created () {
    const id = this.$route.params.orderNumber
    this.getList(id)
  },
  methods: {
    getList (id) {
      this.$axios({
        method: 'get',
        url: '/api/xwOrder',
        params: {
          orderNumber: id
        }
      }).then(res => {
        const [{ orderNumber, orderMmount, createTime, address, contactNumber, orderDetails }] = res.data.content
        console.log(res)
        this.orderNumber = orderNumber
        this.orderMmount = orderMmount
        this.createTime = createTime
        this.address = address
        this.contactNumber = contactNumber
        this.orderDetails = orderDetails
      })
    },
    timestampToTime (timestamp) {
      var date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      const Y = date.getFullYear() + '-'
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      const s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      return Y + M + D + h + m + s
    },
    toDecimal2 (x) {
      var f = parseFloat(x)

      f = Math.round(f * 100) / 100
      var s = f.toString()
      var rs = s.indexOf('.')
      if (rs < 0) {
        rs = s.length
        s += '.'
      }
      while (s.length <= rs + 2) {
        s += '0'
      }
      return s
    },
    onPrint () {
      const date = new Date()
      const time = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}    `
      this.htmlTitle = this.htmlTitle + time
      this.getPdf('pdfDom', this.htmlTitle)
    }
  }
}
</script>

<style lang='less' >
.horder{
    width: 800px;
    height: 600px;
    background-color: #fff;
     position: absolute;
  left: 50%;
  top:50%;
  transform: translate(-50%,-50%);
  padding: 50px;
  overflow: scroll;
}
.num{
  height: 50px;
}
.nav{
  background-color: #f5f5f5;
  height: 50px;
  line-height: 50px;
  span{
    display: inline-block;
    width: 150px;
    text-align: center
  }
  :first-child{
    width: 300px
  }
}

.list{
  border-bottom: 1px solid #f5f5f5;
  :first-child{
    width: 300px;
    vertical-align: middle;
    text-align: left;
    img{
      width:100px
    }
  }
  div{
    line-height: 90px;
    vertical-align: middle;
    display: inline-block;
    width: 150px;
    text-align: center
  }
}

.info{
  color:#000
}
</style>
