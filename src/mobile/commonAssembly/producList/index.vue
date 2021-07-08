<template>
  <div>
    <div class="productList">
      <div class="title">产品列表</div>
      <div class="productListInfo">
        <!-- 每一个产品列表 -->
        <div class="xb-list" v-for="(item, index) in list" :key="index">
          <div class="xb-list-img">
            <img src="../../../assets/images/logoo.png" alt="" />
          </div>
          <div class="xb-list-name">
            <div>产品名称:{{ item.productName }}</div>
            <div>产品价格:{{ orderList[index].price }}元/{{ item.productUnits }}</div>
            <div>产品描述:{{ item.productDesc }}</div>
          </div>
          <div class="xb-list-num">
            <el-input
              v-model.number.trim="orderList[index].orderNumber"
              @blur="productNum(item.productPrices, index, item.moq)"
              oninput="if(value.length>5)value=value.slice(0,6)"
              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
              placeholder="请输入数量"
              @input="change"
            ></el-input>
          </div>
        </div>
      </div>
      <!-- 确认订单 -->
      <div class="confirm">
        <el-button type="primary" @click="confirmOrder">确认订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productList',
  data () {
    return {
      orderList: [],//订购单
      list: [

      ]
    }
  },
  created () {
    this.getProductList();
    console.log('fffff',this.orderList);
    
  },
  computed: {
  },
  mounted () {
  },
  methods: {

    //解决el-input无法更新视图
    change () {
      this.$forceUpdate();
    },
    //处理用户输入的订单数额
    productNum (item, index, moq) {
      // item : 价格规则
      // index: 当前的index
      // moq : 最低购买的数量
      let lowestNum = item[0].productNumber; //标准价格的起够数量
      let num = this.orderList[index].orderNumber;

      if (num !== '' && num !== null) {
        // 购买的值不得低于最低购买数量
        if (num < moq && moq !== 0) {
          this.$toast(`最低购买${moq}`)
          this.orderList[index].orderNumber = ''
        }

        // 根据不同的购买熟练更改不同的价格

        if (num >= lowestNum && item.length > 1) {
          for (var i = 0; i < item.length; i++) {
            if (
              this.orderList[index].orderNumber >=
              item[i].productNumber &&
              this.orderList[index].orderNumber <
              item[i + 1].productNumber
            ) {
              this.orderList[index].price = item[i].price;
              this.$forceUpdate();
              return
            } else if (
              this.orderList[index].orderNumber >=
              item[item.length - 1].productNumber
            ) {
              this.orderList[index].price = item[item.length - 1].price;
              this.$forceUpdate();
              return
            }
          }
        }

      } else {
        this.orderList[index].price = item[0].price
        this.$forceUpdate();
      }
    },
    //获取产品列表
    getProductList () {
      this.$request.get(this.$api.getProductList, {
        state: 0,
        sort: "sort,desc"
      }).then(res => {
        console.log('res2233', res);
        this.list = res.data.content;
        // 生成订购单
        this.list.forEach((item, index) => {
          this.orderList[index] = {
            productId: item.id,
            price: item.productPrices[0].price,
            orderNumber: null,
            product: item
          }
        })
      })
    },
    confirmOrder(){
      console.log('fffff',this.orderList);
      const checkNumber = this.orderList.filter(item =>{
        return item.orderNumber;
      })
      console.log('44444',checkNumber);
      if(checkNumber.length >0){
        sessionStorage.setItem('orderInfo',JSON.stringify(checkNumber))
        this.$router.push('/myOrder')
      }else{
        this.$toast('请选择购买产品数量')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.productList {
  .title {
    font-size: 18px;
  }
  .productListInfo {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .xb-list {
      padding: 5px;
      width: 140px;
      margin-bottom: 15px;
      border-radius: 3px;
      background-color: rgba(92, 99, 110, 0.2);
      margin-right: 10px;
      .xb-list-img {
        img {
          width: 100%;
        }
      }
      .xb-list-name {
        > div {
          margin-bottom: 5px;
        }
      }
      .xb-list-num {
        .el-input {
          /deep/.el-input__inner {
            height: 28px;
          }
        }
      }
    }
  }
  .confirm {
    /deep/.el-button {
      width: 100%;
      height: 45px;
    }
  }
}
</style>