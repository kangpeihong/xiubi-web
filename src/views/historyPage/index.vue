<template>
  <div class="history">
    <div class="history-list animated fadeIn">
      <div class="title">历史订单</div>
      <i class="close el-icon-close" @click="close"></i>
      <div class="table-boxs ximiBlock">
        <el-table :data="dataList" style="width: 100%" >
        <el-table-column prop="orderNumber" label="历史编号" width="220">
        </el-table-column>
        <el-table-column
          prop="enterpriseUser.userName"
          label="订货人"
          width="150"
        >
        </el-table-column>
        <el-table-column width="180" prop="orderAmount" label="订单金额"> </el-table-column>
        <el-table-column label="订单日期" width="190">
          <template slot-scope="scope">
            <span> {{ scope.row.createTime | formatData }}</span>
          </template>
        </el-table-column>

        <el-table-column label="订单详情" width="220">
          <template slot-scope="scope">
            <span v-if='scope.row.expressNumber==null'>未发货</span>
            <span v-else>{{scope.row.expressName}}：{{scope.row.expressNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="anotherList(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
      <div class="fenye">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next,jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import utils from "../../assets/js/utils.js";

export default {
  name: "history",
  data() {
    return {
      dataList: [],
      orderState: "",
      createTime: "",
      pageData: {
        pageSize: 10,
        currentPage: 1
      },
      historyData: [],
      total:0
    };
  },
 
  created() {
    this.getDataList();
  },
 
  mounted() {
    console.log('...,,,,',this.dataList)

  },
  filters: {
    formatData(time) {
      var data = new Date(time);
      return utils.formatDate(data, "yyyy-MM-dd");
    }
  },
  methods: {
    getDataList() {
      console.log('000222',this.userinfo)
      var _this = this;
      const id = this.userinfo.id;

      
      this.$axios({
        method: "get",
        url: "/api/xwOrder",
        params: {
          page: _this.pageData.currentPage-1,
          size: _this.pageData.pageSize,
          id: id,
          sort: "id,desc"
        }
      }).then(res => {
        this.total = res.data.totalElements;
        this.dataList = res.data.content;
        console.log("//", res);
      });
    },
    // 当前页
    handleCurrentChange(pages) {
      this.pageData.currentPage = pages;
      this.getDataList();
    },
    // 选择每页显示的条数
    handleSizeChange(sizes) {
      this.pageData.pageSize = sizes;
      this.getDataList();
    },
    // 关闭历史订单页面
    close() {
      this.$router.push("/");
    },
    anotherList(items) {
      this.$store.state.againOrder = true;
      this.$store.state.checkOrder = false;
      let billId = items.enterpriseInfo.id;
      let addressId = items.enterpriseAddress.id;
      this.$router.push({name:'Order',params:{billId:billId,addressId:addressId}});

      // 设置相对应的数据格式
      items.orderDetails.forEach((item, index) => {
        var obj = {
          productId: item.detailsId,
          price: item.price,
          orderNumber: item.orderNumber,
          product: item.product
        };

        this.historyData.push(obj)
      });
      var saveData = JSON.stringify(this.historyData);
      window.sessionStorage.setItem("listInfo", saveData);
    }
  },
  computed: {
    userinfo() {
      const token = JSON.parse(window.sessionStorage.getItem("user-token"));
      console.log('wwwww',token)
      return token.enterpriseUserDTO;
    }
  }
};
</script>

<style lang="less" scoped>



.ximiBlock::-webkit-scrollbar-track
{
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
  border-radius: 10px !important;
  background-color: rgba(255,255,255,0.8);
}

.ximiBlock::-webkit-scrollbar
{
  width: 5px !important;
  background-color: rgba(0,0,0,0);
}
.ximiBlock::-webkit-scrollbar-thumb
{
  border-radius: 15px !important;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,.3);
  background-color: #555;
}

/deep/.el-table {
  // max-height: 400px;
  // overflow-y: auto;
}
.history-list {
  width: 1070px;
  height: 680px;
  position: absolute;
  z-index: 999;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border-radius: 5px;
  padding: 20px 20px;

  .table-boxs{
    height: 570px;
    overflow: hidden;
    overflow-y: auto;

    /deep/.el-table td{
      padding: 10px 0;
    }
    /deep/.el-button{
      padding: 8px;
    }
  }
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 24px;
    cursor: default;
  }
  .title {
    text-align: center;
    font-size: 25px;
    height: 60px;
    line-height: 60px;
  }
  .fenye {
    position: absolute;
    bottom: 20px;
    right: 10px;
  }
}
</style>
