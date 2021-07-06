<template>
  <div class="scroll-area" ref="fat">
    <!-- 头部标题 -->
    <navBar :title="title"></navBar>

    <!-- swiper直播视频 -->
    <swiperVideo></swiperVideo>

    <!-- 左侧控制菜单 -->
    <div class="menu-left" v-if="menuLeftStatus">
      <div class="historyPage" @click="historyPages">历史订单</div>
      <div class="modifyPassword">
        <div @click="show = true">修改密码</div>
        <van-overlay :show="show" @click="show = false">
          <div class="wrapper" @click.stop>
            <div class="title">
              修改密码
            </div>
            <div class="changePassword">
              <el-input
                v-model="changePassword"
                placeholder="请输入修改后的密码"
              ></el-input>
              <el-button type="primary" @click="changePasswords"
                >确认</el-button
              >
            </div>
          </div>
        </van-overlay>
      </div>

      <div class="loginOut" @click="loginOut">退出</div>
    </div>

    <!-- 右侧控制菜单 -->
    <div class="menu-right" v-if="menuRightStatus">
      <div @click="scroll(1, 'public')">公告信息</div>
      <div @click="scroll(2)">发货信息</div>
      <div @click="scroll(3)">产品列表</div>
      <div @click="scroll(4)">联系我们</div>
    </div>

    <!-- 公告信息 -->
    <div class="publicMessage common-css" ref="public">
      <publicMessage></publicMessage>
    </div>

    <!-- 发货信息 -->
    <div class="ShipMessage common-css" ref="shipMessage">
      <shipMessage></shipMessage>
    </div>

    <!-- 产品列表 -->
    <div class="producList common-css" ref="producList">
      <producList></producList>
    </div>

    <!-- 联系我们 -->
    <div class="contactUs common-css" ref="contactUs">
      <contactUs></contactUs>
    </div>
  </div>
</template>

<script>
import navBar from '../commonAssembly/navBar'
import swiperVideo from '../commonAssembly/swiperVideo'
import publicMessage from '../commonAssembly/publicMessage'
import shipMessage from '../commonAssembly/shipMessage'
import producList from '../commonAssembly/producList'
import contactUs from '../commonAssembly/contactUs'
import BScroll from 'better-scroll'
export default {
  name: '',
  components: {
    navBar,
    swiperVideo,
    publicMessage,
    shipMessage,
    producList,
    contactUs
  },
  data () {
    return {
      show: false,
      changePassword: '',
      title: {
        name: '首页',
        status: false,
      }

    }
  },
  created () {
  },
  computed: {
    menuLeftStatus () {
      return this.$store.state.menuLeft;
    },
    menuRightStatus () {
      return this.$store.state.menuRight;
    },
  },
  methods: {
    scroll (index, refname) {
      switch (index) {
        case 1:
          let top1 = this.$refs.public.offsetTop
          document.documentElement.scrollTop = top1
          break;
        case 2:
          let top2 = this.$refs.shipMessage.offsetTop
          document.documentElement.scrollTop = top2
          break;
        case 3:
          let top3 = this.$refs.producList.offsetTop
          document.documentElement.scrollTop = top3
          break;
        case 4:
          let top4 = this.$refs.contactUs.offsetTop
          document.documentElement.scrollTop = top4
          break;
      }
    },
    // 修改密码
    changePasswords () {
      if (this.changePassword !== '') {
        const id = JSON.parse(sessionStorage.getItem('user-token')).enterpriseUserDTO.id;
        console.log('id', id);
        this.$request.put(this.$api.changePassword, { id: id, pass: this.changePassword }).then(res => {
          sessionStorage.removeItem('user-token')
          this.$toast('修改成功，请重新登陆')
          window.location.reload();
        }).catch(err => {
          console.log('err', err);
        })
      } else {
        this.$toast('密码不能为空！')
      }
    },
    historyPages () {
      this.$router.push('/historyPage')
    },
    // 退出登陆
    loginOut () {
      sessionStorage.removeItem('user-token')
      window.location.reload()
    }

  },

}
</script>

<style scoped lang="less">
#scroll-area {
  scroll-behavior: smooth;
}
.menu-left {
  margin-top: 35px;
  display: flex;
  justify-content: space-around;
  > div {
    padding: 10px 15px;
    background-color: #1989fa;
    border: 0.0625rem solid #1989fa;
    color: #fff;
    width: 60px;
    text-align: center;
    border-radius: 5px;
  }
}
.menu-right {
  margin-top: 35px;
  display: flex;
  justify-content: space-around;
  > div {
    padding: 5px 5px;
    background-color: #ecf5ff;
    border: 0.0625rem solid #1989fa;
    color: #1989fa;
    width: 50px;
    text-align: center;
    border-radius: 5px;
    font-size: 12px;
  }
}
.publicMessage {
  transition: 1s;
}
.common-css {
  margin-top: 35px;
  padding: 0 25px;
}
.wrapper {
  width: 200px;
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(92, 99, 110, 1);
  margin: 200px auto;
  .title {
    font-size: 18px;
    margin-bottom: 25px;
  }
  .changePassword {
    .el-input {
      margin-bottom: 15px;
      /deep/.el-input__inner {
        width: 180px;
      }
    }
    .el-button {
      width: 180px;
    }
  }
}
</style>
