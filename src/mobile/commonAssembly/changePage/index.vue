<template>
  <div class="change">
    <navBar :title="title"></navBar>
    <van-row class="change-list" v-for="(item, index) in listInfo" :key="index">
      <van-col span="24">
        <van-col span="12">{{item.name}}</van-col>
        <van-col span="10" offset="2">
          <van-button type="info">修改</van-button>
          <van-button type="info">删除</van-button>
        </van-col>
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
      listInfo: []
    }
  },
  components: {
    navBar,
  },
  created () {
    console.log('invoiceOrReceipt', this.$store.state.userId)
    let obj = this.$route.params
    this.title.name = obj.title
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
    invoiceOrReceipt () {
      return this.$store.state.billOrAddress
    },
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.change {
  background-color: rgba(40, 49, 73);
  min-height: 100vh;
  .change-list {
    padding: 10px;
    color: #fff;
    >.van-col {
      height: 49px;
      background-color: rgba(64, 75, 105);
      border-radius: 3px;
      >.van-col{
        &:nth-child(1){
          line-height:49px;
          padding-left: 10px;
        }
        &:nth-child(2){
          padding:0 10px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content:space-between;
          button{
            padding:5px 10px;
            height: 30px;
          }
        }
      }
    }
  }
}
</style>
