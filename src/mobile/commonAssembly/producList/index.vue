<template>
  <div>
    <div class="productList">
      <div class="title">产品列表</div>
      <div class="productListInfo">
        <!-- 每一个产品列表 -->
        <div :key="index" class="xb-list" v-for="(item, index) in list">
          <div class="xb-list-img">
            <!-- {{ item}} -->
            <img alt :src="item.bigFilePath" v-lazy="item.bigFilePath"/>
          </div>
          <div class="xb-list-name">
            <div class="xb-list-product-name">{{ item.productName }}</div>
            <div v-permission="{action:tokenStatus}">单价:{{ orderList[index].price }}元/{{ item.productUnits }}</div>
            <div v-permission="{action:tokenStatus}" class="open" @click="ifOpen(index)">
              说明:{{ item.productDesc }}
              <!-- <van-icon @click="open(index)" class="open-icon" name="arrow-down" />
              <van-icon @click="close(index)" class="close-icon" name="arrow-up" /> -->
            </div>
          </div>
          <div class="xb-list-num" v-permission="{action:tokenStatus}">
            <el-input
              @blur="productNum(item.productPrices, index, item.moq)"
              @input="change"
              oninput="if(value.length>5)value=value.slice(0,6)"
              onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')"
              placeholder="请输入数量"
              v-model.number.trim="orderList[index].orderNumber"
            ></el-input>
          </div>
        </div>
      </div>
      <!-- 确认订单 -->
      <div class="confirm" v-permission="{action:tokenStatus}">
        <el-button @click="confirmOrder" type="primary">确认订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
export default {
  name: 'productList',
  data () {
    return {
      orderList: [],//订购单
      list: [

      ],
    }
  },
  created () {
    this.getProductList();
    console.log('fffff', this.orderList);

  },
  computed: {
    ...mapState(['tokenStatus'])
  },
  mounted () {
    if(sessionStorage.getItem('listStatus')){
      // this.orderList = JSON.parse(sessionStorage.getItem('listStatus'))
    }
  },
  updated(){
      this.fold();

  },
  methods: {

    //解决el-input无法更新视图
    change () {

      // console.log('orderList',this.orderList);
      
      this.$forceUpdate();
    },
    // 超出折叠
    fold () {
      let el = document.getElementsByClassName('open');
      let venIcon = document.getElementsByClassName('open-icon')
      let closeIcon = document.getElementsByClassName('close-icon')
      el.forEach((item,index) => {
        if(item.offsetHeight > 21){
          item.classList.add('opens')
          // this.ifFlod = false
          // closeIcon[index].style.display="none";

        }else{
          // venIcon[index].style.display="none";
          // closeIcon[index].style.display="none";

        }
        
      })
     
    },
    ifOpen(index){
      let el = document.getElementsByClassName('open');
      if(el[index].className.indexOf('opens') == -1){
         el[index].classList.add('opens')
      }else{
        el[index].classList.remove('opens')
      }
    },
    // open(index){
    //   let el = document.getElementsByClassName('open');
    //   let venIcon = document.getElementsByClassName('open-icon')
    //   let closeIcon = document.getElementsByClassName('close-icon')
    //   el[index].classList.remove('opens')
    //   venIcon[index].style.display = 'none'
    //   closeIcon[index].style.display="block";

    // },
    // close(index){
    //   let el = document.getElementsByClassName('open');
    //   let venIcon = document.getElementsByClassName('open-icon')
    //   let closeIcon = document.getElementsByClassName('close-icon')
    //   el[index].classList.add('opens')
    //   venIcon[index].style.display = 'block'
    //   closeIcon[index].style.display="none";


    // },
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

      console.log('orderList',this.orderList);
      sessionStorage.setItem('listStatus',this.orderList)
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
    confirmOrder () {
      console.log('fffff', this.orderList);
      const checkNumber = this.orderList.filter(item => {
        return item.orderNumber;
      })
      console.log('44444', checkNumber);
      if (checkNumber.length > 0) {
        sessionStorage.setItem('orderInfo', JSON.stringify(checkNumber))
        this.$router.push('/myOrder')
      } else {
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
      margin-bottom: 25px;
      border-radius: 3px;
      background-color: rgba(92, 99, 110, 0.2);
      // margin-right: 10px;
      .xb-list-img {
        width: 100%;
        min-height: 105px;
        img {
          width: 100%;
          min-height: 105px;
          // height: 100%;
        }
      }
      .xb-list-name {
        .xb-list-product-name{
          min-height: 42px;
        }
        > div {
          margin-bottom: 5px;
        }
      }
      .xb-list-num {
        .el-input {
          /deep/.el-input__inner {
            height: 35px;
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
.open{
  position: relative;
}
.opens {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  /deep/.open-icon {
    position: absolute;
    right: -2px;
    bottom: -1px;
    color: red;
    font-size: 18px;

  }
  
}
/deep/.close-icon {
    position: absolute;
    right: -2px;
    top: 0px;
    color: red;
    font-size: 18px;
  }
</style>