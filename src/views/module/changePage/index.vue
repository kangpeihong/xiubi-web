<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span> {{ billOrAddress ? "选择发票信息" : "选择邮寄地址" }} </span>
        <div style="float: right;">
          <i class="el-icon-circle-plus-outline add" @click="add"></i>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="back"
            >关闭</el-button
          >
        </div>
      </div>
      <div class="text item">
        <el-radio-group v-model="radio">
          <div
            class="radio-li"
            v-for="(item, index) in companyInfo"
            :key="index"
          >
            <div>
              <el-radio :label="index">{{
                billOrAddress ? item.name : item.address
              }}</el-radio>
            </div>
            <div class="operation">
              <div @click="alter(index)">修改</div>
              <div @click="del(index)">删除</div>
            </div>
          </div>
        </el-radio-group>
      </div>

      <div class="checkBtn">
        <el-button type="primary" plain @click="confirm">确定</el-button>
        <el-button type="primary" plain @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "changePage",
  data() {
    return {
      msg: "",
      radio: "",
      userId: "",
      companyInfo: "",
      billOrAddress: "",
      ifEmpty: "", //添加页面input框不显示信息。（true为添加公司信息，false为修改公司信息。）
      datas: [
        {
          id: 0,
          mas: "124"
        },
        {
          id: 1,
          mas: "345"
        },
        {
          id: 2,
          mas: "567"
        }
      ]
    };
  },
  created() {
    this.billOrAddress = this.$store.state.billOrAddress;
    console.log(";l;;", this.billOrAddress);

    if (this.$store.state.billOrAddress) {
      this.radio = this.$store.state.indexs;
    } else {
      this.radio = this.$store.state.addressIndex;
    }

    let id = JSON.parse(window.sessionStorage.getItem("user-token"))
      .enterpriseUserDTO.id;
    this.userId = id;
    console.log("ssdfaf", id);

    if (this.billOrAddress) {
      let url = this.$api.billInfo;
      this.$request.get(url, { id: id }).then(res => {
        console.log("2ee2", res);
        this.companyInfo = res.data;
      });
    } else {
      let url = this.$api.billAddress;
      this.$request.get(url, { id: id }).then(res => {
        console.log("2ee2444444444444", res);
        this.companyInfo = res.data;
      });
    }
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    add() {
      this.ifEmpty = true;
      this.$router.push({
        path: "/modifyinfo",
        query: { ifEmpty: this.ifEmpty }
      });
    },
    alter(index) {
      console.log("/./...", this.companyInfo[index]);
      this.ifEmpty = false;
      this.$router.push({
        path: "/modifyinfo",
        query: {
          ifEmpty: this.ifEmpty,
          index: index,
          datas: this.companyInfo[index]
        }
      });
      this.$store.state.indexs = index;
    },
    del(index) {
      console.log("dele", this.companyInfo[index]);
      console.log("dele", this.companyInfo[index].id);

      let id = this.companyInfo[index].id;

      if (this.$store.state.billOrAddress) {
        this.$request.delete(this.$api.delInfo, { id: id }).then(res => {
          if (res.status == 200) {
            this.companyInfo.splice(index, 1);
          }
          console.log("res", res);
        });
      }else{
         this.$request.delete(this.$api.delAddress, { id: id }).then(res => {
          if (res.status == 200) {
            this.companyInfo.splice(index, 1);
          }
          console.log("res", res);
        });
      }
    },
    confirm() {
      console.log(this.radio);
      if (this.$store.state.billOrAddress) {
        this.$store.state.indexs = this.radio;
      } else {
        this.$store.state.addressIndex = this.radio;
      }
      this.$router.go(-1);
    },
    cancel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped lang="less">
.checkBtn {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
}
.el-button {
  padding-top: 8px;
  padding-bottom: 8px;
}
.box-card {
  width: 400px;
  height: 350px;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  // transform: translate(-50%,-50%);
  margin: auto;

  .add {
    margin-right: 10px;
    font-size: 16px;
    color: #409eff;
  }
}
.el-radio-group {
  font-size: 14px;
  display: block;
  .radio-li {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;

    .operation {
      display: flex;
      justify-content: space-between;

      > div {
        margin-left: 15px;
        color: #606266;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
}
</style>
