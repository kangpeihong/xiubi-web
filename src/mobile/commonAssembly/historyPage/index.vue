<template>
  <div class="history-page">
    <navBar :title="title"></navBar>
    <div class="order-list">
      <div class="order-list-once" v-for="(item, index) in datas" :key="index">
        <div class="order-list-once-left">
          <div>订货人:{{ item.enterpriseUser.userName }}</div>
          <div>订单编号:{{ item.orderNumber }}</div>
          <div>订单金额:{{ item.orderAmount }}</div>
        </div>
        <div class="order-list-once-right">
          <div>订单日期:{{ item.createTime | formatData}}</div>
          <div>订单详情:
            <span v-if="item.expressNumber == null || item.expressNumber == ''">未发货</span>
            <span v-else> {{item.expressName}}:{{item.expressNumber}} </span>
          </div>
          <div>
            <el-button type="primary">查看详情</el-button>
            <el-button type="primary">删除订单</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <!--items-per-page 设置当前页所需要展示的条数和传入的参数 pageSize相对应  -->
      <van-pagination
        @change="changePages"
        v-model="currentPage"
        :total-items="totalCount"
        :items-per-page='3'  
        mode="simple"
      />
    </div>
  </div>
</template>

<script>

import utils from "../../../assets/js/utils"
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
        status: true
      },
      datas: [],
      currentPage: 1,
      totalCount:'',
      pageData:{
        pageSize:3,//当前页显示的条数
        currentPage:1 //当前页
      }
    }
  },
  created () {
    this.getHistoryList();
  },
  computed: {
  },
  filters: {
    formatData(time) {
      var data = new Date(time);
      return utils.formatDate(data, "yyyy-MM-dd");
    }
  },
  methods: {
    // 获取历史订单
    getHistoryList () {
      let _this = this;
      const id = JSON.parse(sessionStorage.getItem('user-token')).enterpriseUserDTO.id;
      this.$request.get(this.$api.getHistoryList, {page:_this.pageData.currentPage-1,size:_this.pageData.pageSize, id, id }).then(res => {
        console.log('res44444', res);
        this.totalCount = res.data.totalElements
        this.datas = res.data.content
      })
    },
    // 下一页
    changePages (item) {
      console.log('iteeeee', item);
      this.pageData.currentPage = item;
      this.getHistoryList()
    }
  },

}
</script>

<style lang="less" scoped>
.order-list {
  padding: 10px;
  .order-list-once {
    margin-bottom: 10px;
    width: 100%;
    border-radius: 3px;
    background-color: rgba(92, 99, 110, 0.2);
    display: flex;
    box-sizing: border-box;
    padding: 20px 10px 0 10px;
    > div {
      width: 50%;
      > div {
        font-size: 16px;
        margin-bottom: 15px;
        &:nth-child(3) {
          display: flex;
          justify-content: space-between;
          .el-button {
            padding: 10px;
            border-radius: 25px;
          }
        }
      }
    }
  }
}
.history-page {
  // position: relative;
  .pagination {
    width: 100%;
    // padding: 10px;
    position: fixed;
    bottom: 10px;
  }
}
.order-list-once-left,.order-list-once-right{
  >div{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>

