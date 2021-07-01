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
            <div>产品名称:{{ item.name }}</div>
            <div>产品价格:{{ item.price }}</div>
            <div>产品描述:{{ item.description }}</div>
          </div>
          <div class="xb-list-num">
            <el-input v-model="productNum" placeholder="请输入数量"></el-input>
          </div>
        </div>
      </div>
      <!-- 确认订单 -->
      <div class="confirm">
        <el-button type="primary">确认订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'productList',
  data () {
    return {
      productNum: '',
      list: [
        {
          id: 0,
          url: '../../../assets/images/logoo.png',
          name: '桔子酒店',
          price: 4,
          description: '明信片'
        },
        {
          id: 1,
          url: '../../../assets/images/logoo.png',
          name: '桔子酒店',
          price: 4,
          description: '明信片'
        },
        {
          id: 2,
          url: '../../../assets/images/logoo.png',
          name: '桔子酒店',
          price: 4,
          description: '明信片'
        },
        {
          id: 3,
          url: '../../../assets/images/logoo.png',
          name: '桔子酒店',
          price: 4,
          description: '明信片'
        }
      ]
    }
  },
  created () {
  },
  computed: {
  },
  methods: {

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
    justify-content:space-between;
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
  .confirm{
    /deep/.el-button {
      width: 100%;
      height: 45px;
    }
  }
}
</style>