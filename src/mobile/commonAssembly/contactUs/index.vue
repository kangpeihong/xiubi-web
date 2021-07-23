<template>
  <div>
    <div class="contact-us">
      <!-- <div class="title">联系我们</div> -->
      <div class="user">
        <div v-permission="{action:tokenStatus}" :key="index" class="user-info" v-for="(item,index) in parterInfo">
          <div class="avatar">
            <img :src="item.headAddress" alt />
          </div>
          <div class="infos">
            <div class="user-name">{{item.name}}</div>
            <div class="user-work">{{item.jobs}}</div>
            <div class="user-name">{{item.phone}}</div>
          </div>
        </div>
        
      </div>
      <div class="no-token" v-noLimit="{action:tokenStatus}">
        <div class="xb-user-head" :key="index"  v-for="(item,index) in parterInfo">
          <div class="avatar">
            <img :src="item.headAddress" alt />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: '',
  data () {
    return {
      parterInfo: [
        {
          id: 0,
          name: 'kang',
          work: "laoban",
          phone: "123445"
        },
        {
          id: 1,
          name: 'kang',
          work: "laoban",
          phone: "123445"
        },
        {
          id: 2,
          name: 'kang',
          work: "laoban",
          phone: "123445"
        },

      ]
    }
  },
  created () {
  },
  mounted () {
    this.getParterInfo();
  },
  computed: {
    ...mapState(['tokenStatus'])
  },
  methods: {
    // 获取员工的信息（头像，职位，电话）
    getParterInfo () {
      this.$request.get(this.$api.parterInfo).then(res => {
        console.log('res000', res);
        this.parterInfo = res.data.content;
      })
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 18px;
  margin-bottom: 10px;
}
.user {
  // display:flex;
  // justify-content:space-between;
  flex-wrap: wrap;
  .user-info {
    box-sizing: border-box;
    // width: 150px;
    border-radius: 3px;
    // background-color: rgba(92, 99, 110, 0.2);
    margin-bottom: 25px;
    display: flex;
    justify-content:center;
    position: relative;
    > .avatar {
      // position:absolute;
      // left: 20%;
      // z-index: 99;
      margin-right: -25px;
      width: 100px;
      height: 100px;  
      // margin: 0 auto;
      border-radius: 50%;
      background-color: yellow;
      img {
        width: 100%;
      }
    }
    > .infos {
      z-index: -1;
      // position:absolute;
      // left: 50%;
      width: 150px;
      // margin-left: -25px;
      > div {
        padding-left: 45px;
        text-align: left;
        width: 100%;
        background: #ecf5ff;
        margin-top: 10px;
      }
    }
  }
}

.no-token{
  display:flex;
  justify-content:space-between;
  flex-wrap: wrap;
  .xb-user-head{
    margin-bottom: 15px;
    .avatar{
      width: 100px;
      height: 100px;
      border-radius:50%;
      background:yellow;
    }
  }
}
</style>
