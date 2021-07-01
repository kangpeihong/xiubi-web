<template>
  <div>
    <navBar :title="title"></navBar>
    <div class="order-list">
      <div class="order-list-once" v-for="(item,index) in datas" :key="index">
        <div>
          <div>订货人:{{item.name}}</div>
          <div>订单编号:{{item.number}}</div>
          <div>订单金额:{{item.orderPrice}}</div>
        </div>
        <div>
          <div>订单日期:{{item.date}}</div>
          <div>订单详情:{{item.status}}</div>
          <div>
            <el-button type="primary">查看详情</el-button>
            <el-button type="primary">删除订单</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from '../navBar'

export default {
  name: '',
  components: {
    navBar
  },
  data () {
    return {
      title: {
        name: '历史订单',
        status:true
      },
      datas:[
        {
          id:0,
          name:'zhao',
          number:1234,
          date:'2021-6-19',
          orderPrice:300,
          status:'发货'
        },
        {
          id:1,
          name:'zhao',
          number:1234,
          date:'2021-6-19',
          orderPrice:300,
          status:'发货'
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
.order-list{
  padding:10px;
  .order-list-once{
    margin-bottom: 10px;
    width: 100%;
    border-radius: 3px;
    background-color: rgba(92, 99, 110, 0.2);
    display:flex;
    box-sizing: border-box;
    padding:20px 10px 0 10px;
    >div{
      width: 50%;
      >div{
        font-size: 16px;
        margin-bottom: 15px;
        &:nth-child(3){
          display:flex;
          justify-content:space-between;
          .el-button{
            padding: 10px;
            border-radius: 25px;
          }
        }
      }
    }
  }
}
</style>

