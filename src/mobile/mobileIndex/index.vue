<template>
  <div class="scroll-area" ref="fat">
    <!-- 头部标题 -->
    <navBar :LoginShow="LoginShow" :title="title"></navBar>

    <!-- 登陆 -->
    <van-overlay :show="LoginShow" @click="closeLoginPage">
      <div @click.stop class="wrapper-login">
        <div class="block" />
        <div class="wrapper-title">{{wrapperTitle}}</div>
        <keep-alive>
          <component :is="page"></component>
        </keep-alive>
      </div>
    </van-overlay>

    <!-- swiper直播视频 -->
    <swiperVideo></swiperVideo>

    <!-- 左侧控制菜单 -->
    <div class="menu-left" v-if="menuRight">
      <div @click="historyPages" class="historyPage">历史订单</div>
      <div class="modifyPassword">
        <div @click="show = true">修改密码</div>
        <van-overlay :show="show" @click="show = false">
          <div @click.stop class="wrapper">
            <div class="title">修改密码</div>
            <div class="changePassword">
              <el-input placeholder="请输入修改后的密码" v-model="changePassword"></el-input>
              <el-button @click="changePasswords" type="primary">确认</el-button>
            </div>
          </div>
        </van-overlay>
      </div>

      <div @click="loginOut" class="loginOut">退出</div>
    </div>

    <!-- 右侧控制菜单 -->
    <!-- <div class="menu-right" v-if="menuRight">
      <div @click="scroll(1, 'public')">公告信息</div>
      <div @click="scroll(2)">发货信息</div>
      <div @click="scroll(3)">产品列表</div>
      <div @click="scroll(4)">联系我们</div>
    </div>-->

    <!-- 定位 -->

    <div class="jump">
      <div :class="[down ? 'appear':'down']" @click="downs('.scroll-area')" class="down">确认订单</div>
      <div :class="[up ? 'appear':'up']" @click="ups" class="up">UP</div>
    </div>

    <!-- 联系我们 -->
    <div class="contactUs common-css" ref="contactUs">
      <contactUs></contactUs>
    </div>

    <!-- 公告信息 -->
    <div class="publicMessage common-css" ref="public">
      <publicMessage></publicMessage>
      <!-- <shipMessage></shipMessage> -->
    </div>

    <!-- 发货信息 -->
    <!-- <div class="ShipMessage common-css" ref="shipMessage">
      <shipMessage></shipMessage>
    </div>-->

    <!-- 产品列表 -->
    <div class="producList common-css" ref="producList">
      <producList></producList>
    </div>
  </div>
</template>

<script>
import navBar from '../commonAssembly/navBar'
import login from '../mobileLogin'
import register from '../mobileRegister'
import swiperVideo from '../commonAssembly/swiperVideo'
import publicMessage from '../commonAssembly/publicMessage'
import shipMessage from '../commonAssembly/shipMessage'
import producList from '../commonAssembly/producList'
import contactUs from '../commonAssembly/contactUs'
import BScroll from 'better-scroll'
import $ from 'jquery'
import { mapState } from 'vuex'
export default {
  name: '',
  components: {
    navBar,
    swiperVideo,
    publicMessage,
    shipMessage,
    producList,
    contactUs,
    login,
    register
  },
  data () {
    return {
      producList: 'producList',
      show: false,
      changePassword: '',
      LoginShow: false,
      wrapperTitle: '',
      page: 'login',
      title: {
        name: '首页',
        status: false,
      },
      down: false,
      up: false,

    }
  },
  created () {
    console.log('menuLeft', this.menuLeft);

  },
  mounted () {
    window.addEventListener("scroll", this.handleScroll)
  },
  computed: {
    ...mapState(['menuLeft', 'menuRight'])
  },
  methods: {
    handleScroll () {
      let tag = document.getElementsByClassName('down')
      let top = document.documentElement.scrollTop;
      let allHeight = document.body.scrollHeight;
      let height = window.screen.height
      if (top < 800) {
        this.down = false;
      }
      if (top > 800) {
        this.down = true;
      }

      if (top > allHeight - height - 200) {
        this.down = false;
        this.up = true;
      } else {
        this.up = false;
      }

    },
    downs () {
      let allHeight = document.body.scrollHeight;
      let height = window.screen.height
      let scrolltop = allHeight - height + 50 +'px'
      $('html,body').animate({scrollTop:scrolltop}, 300);
    },
    ups (select) {
      $('html,body').animate({scrollTop:'0px'}, 300);
    },
    openLoginPage () {
      this.LoginShow = true;
      this.wrapperTitle = '登陆'
    },
    closeLoginPage () {
      this.LoginShow = false;
      setTimeout(() => {
        this.page = 'login';
      }, 100)
    },
    openRegisterPage () {
      this.page = 'register'
      this.wrapperTitle = '注册'
    },
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
      sessionStorage.clear()
      window.location.reload()
    }

  },

}
</script>

<style scoped lang="less">

#scroll-area {
  scroll-behavior: smooth;
}
.scroll-area {
  padding-bottom: 20px;
  -webkit-overflow-scrolling:touch
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

.wrapper-login {
  width: 90%;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 5px;
  background-color: #fff;
  margin: 30px auto;
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
  .wrapper-title {
    font-size: 18px;
    text-align: center;
    color: #000000;
    margin-bottom: 20px;
  }
}
.jump {
  .down,
  .up {
    position: fixed;
    z-index: 99;
    top: 40%;
    right: 5px;
    padding: 10px;
    border-radius: 50%;
    background-color: #409eff;
    color: #fff;
    width: 40px;
    height: 40px;
    text-align: center;
    display: none;
  }
  .up {
    line-height: 40px;
  }
  .appear {
    display: block !important;
  }
}
</style>
