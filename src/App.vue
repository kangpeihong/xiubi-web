<template>
  <div id="app">
    <div v-if="!flag">
      <div class="nav-list">
        <div class="login" v-if="show">
          <span @click="loginUser">
            <span class="iconfont icon-denglu login-user"></span>
            登录
          </span>
          <span class="sbox"></span>
          <span @click="register">
            <span class="iconfont icon-zhuce"></span>
            注册
          </span>
        </div>
        <div class="login login-left" v-if="!show">
          <el-avatar
            :size="25"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          ></el-avatar>
          <span class="sbox"></span>

          <el-dropdown>
            <span class="userinfo">
              {{ userinfo }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="history">历史订单</el-dropdown-item>
              <el-dropdown-item @click.native="modifyPass">修改密码</el-dropdown-item>
              <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>

      <div class="hpicture">
        <div
          :class="index === currentNum ? 'active' : ''"
          :key="item.id"
          @mouseenter="currentInfo(index)"
          @mouseleave="hide()"
          class="user-head"
          v-for="(item, index) in userArr"
        >
          <img :src="item.headAddress" alt />
          <div v-show="ifToken">
            <p>{{ item.name }}</p>
            <p>{{ item.jobs }}</p>
            <p style="font-family: HeiTi">{{ item.phone }}</p>
          </div>
        </div>
      </div>

      <publicMessage />

      <router-view />

      <prolist v-on:open-list="this.$router.push('/')"></prolist>

      <div class="player">
        <!-- <div class="title">车间一</div> -->
        <video autoplay="autoplay" controls="controls" id="video" muted preload="auto"></video>
      </div>

      <!-- 车间直播视屏选择 -->
      <div @mouseleave="mouseLeave" class="changePlayer animated" ref="changePlayer">
        <div
          :id="'video'+item.id"
          :key="index"
          @click="changeVideo(item,index)"
          class="workSpace"
          v-for="(item,index) in videoData"
        >{{item.roomName}}</div>
      </div>

      <!-- 提示箭头 -->

      <div @mouseenter="arrow()" class="arrow" ref="arrow">
        <span style="width:40px;display: block;margin-right:-15px">
          <van-icon class="move ar-animated ar-delay-2s" name="arrow" />
          <van-icon class="move ar-animated ar-delay-1s" name="arrow" />
          <van-icon class="move ar-animated" name="arrow" />
        </span>
      </div>

      <!-- <div class="footer"></div> -->
    </div>

    <!-- 移动端开始 -->
    <div class v-else>
      <!-- 登陆页 -->
      <router-view />
    </div>
  </div>
</template>
<script
  type="text/javascript"
  charset="utf-8"
  src="https://g.alicdn.com/de/prismplayer/2.9.0/aliplayer-min.js"
></script>
<script>
import Bus from './utils/bus.js'
import prolist from './views/productList'
import publicMessage from './views/publicMessage'
import mobileLogin from './mobile/mobileLogin'
import mobileRegister from './mobile/mobileRegister'
import Hls from './assets/js/hls'
import pro from './mobile/commonAssembly/producList'
export default {
  data () {
    return {
      userInfo: {
        number: '',
        password: ''
      },
      flag: null,
      videoUrl: './playVideo/video.html',
      userinfo: '',
      userArr: [],
      currentNum: null,
      show: true,
      ifToken: false,
      videoData: [],
      videoOne: null,
      loading: true,
    }
  },
  components: {
    prolist,
    publicMessage,
    mobileLogin,
    mobileRegister,
    pro
  },


  created () {
    this.isPhone();
    this.getinfo()
    Bus.$on('change', e => {
      console.log('vvvv', e)
      if (e.userName !== null) {
        this.userinfo = e.userName
      }
    })
  },
  mounted () {
    this.getparter()
    this.openListBtn()
    // this.$nextTick(() => {
    //   this.getplay()
    // })
    let token = sessionStorage.getItem('user-token')

    if (token !== '' && token !== null) {
      this.ifToken = true
    } else {
      this.ifToken = false
    }



    if (!this.flag) {
      this.getplay()

      // this.getVideo('A00168', 'video')
      /* var pathName = "A00168";
      var video = document.getElementById('video');
      if (Hls.isSupported()) {
        var hls = new Hls({
          debug: true,
        });
        hls.loadSource('https://monitor.xiubi.com.cn/live/' + pathName + '/livestream.m3u8');
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          // video.muted = true;
          video.play();
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'http://monitor.xiubi.com.cn/live/' + pathName + '/livestream.m3u8';
        video.addEventListener('canplay', function () {
          video.play();
        });
      } */
    }



  },
  updated () {
    // this.videoData.forEach((item, index) => {
    //   this.getVideo(item.roomNo, `video${item.id}`)
    // })

  },
  beforeDestroy () {

  },
  methods: {
    openListBtn () {
      console.log('right', this.$refs.prolist);

      setTimeout(() => {
        this.$refs.changePlayer.classList.add('changeVideoBlock');
        this.$refs.changePlayer.classList.add('heartBeat');
      }, 2000)

      setTimeout(() => {
        this.$refs.changePlayer.classList.remove('heartBeat');
        this.$refs.changePlayer.classList.add('bounceOutRight');
        // this.$refs.changePlayer.classList.remove('rightBlock');
      }, 3000)

      setTimeout(() => {
        this.$refs.changePlayer.classList.remove('changeVideoBlock');
        this.$refs.arrow.classList.add('arrowBlock');
      }, 4000)


    },
    arrow () {
      this.$refs.arrow.classList.remove('arrowBlock');
      this.$refs.changePlayer.classList.remove('bounceOutRight');
      this.$refs.changePlayer.classList.add('bounceInRight');

      this.$refs.changePlayer.classList.add('changeVideoBlock');
      console.log('x,y', event);

      var x = window.event.clientX;
      var y = window.event.clientY;
      console.log('x,y', x, y);

    },
    mousemove () {
      var x = window.event.clientX;
      var y = window.event.clientY;
      var divx1 = this.$refs.changePlayer.offsetLeft;
      var divy1 = this.$refs.changePlayer.offsetTop;
      var divx2 = this.$refs.changePlayer.offsetLeft + this.$refs.changePlayer.offsetWidth;
      var divy2 = this.$refs.changePlayer.offsetTop + this.$refs.changePlayer.offsetHeight;
      // this.$refs.changePlayer
      console.log('this.$refs.changePlayer.offsetLeft', this.$refs.changePlayer.offsetLeft);

    },
    mouseLeave () {
      this.$refs.arrow.classList.add('arrowBlock');
      this.$refs.changePlayer.classList.add('bounceOutRight');
    },
    changeVideo (item, index) {
      let middleValue = JSON.parse(JSON.stringify(this.videoOne));
      this.videoOne = item
      this.videoData[index] = middleValue;
      this.getVideo(item.roomNo, 'video')
      this.$forceUpdate()
    },
    getplay () {

      this.$request.get(this.$api.videoUrl).then(res => {
        this.videoOne = res.data.shift()
        this.videoData = res.data
        this.getVideo(this.videoOne.roomNo, 'video')

      })

    },
    getVideo (roomNo, videoId) {
      let that = this;
      var pathName = roomNo;
      var video = document.getElementById(videoId);
      if (Hls.isSupported()) {
        var hls = new Hls({
          debug: true,
        });
        hls.loadSource('https://monitor.xiubi.com.cn/live/' + pathName + '/livestream.m3u8');
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, function () {
          video.muted = true;
          video.play();

        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'http://monitor.xiubi.com.cn/live/' + pathName + '/livestream.m3u8';
        video.addEventListener('canplay', function () {
          video.play();
        });
      }

    },
    GetQueryValue1 (queryName) {
      var reg = new RegExp("(^|&)" + queryName + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) {
        return decodeURI(r[2]);
      } else {
        return null;
      }
    },
    isPhone () {
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        this.flag = true
      } else {
        this.flag = false
      }
    },
    history () {
      this.$router.push('./historyPage')
    },
    loginUser () {
      this.$router.push('./views/login/index').catch(() => { })
      this.$store.state.loginShow = true
    },
    register () {
      this.$router.push('/register').catch(() => { })
      this.$store.state.registerShow = true
    },
    //修改密码
    modifyPass () {
      this.$router.push('/modify')
    },
    getinfo () {
      const token = JSON.parse(window.sessionStorage.getItem('user-token'))
      if (token) {
        this.show = false
        if (token.enterpriseUserDTO.userName !== null) {
          this.userinfo = token.enterpriseUserDTO.userName
        }
      }
    },
    loginOut () {
      this.$confirm('确定要退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          window.sessionStorage.removeItem('user-token')
          window.sessionStorage.removeItem('listInfo')
          window.location.reload()
        })
        .catch(() => { })
    },
    getOrder () {
      this.$router.push('/order')
    },
    // 获取员工信息
    getparter () {
      this.$axios({
        method: 'get',
        url: '/api/xwEmployees/back',
        params: {
          sort: 'sort,asc'
        }
      })
        .then(res => {
          this.userArr = res.data.content
        })
        .catch(err => {
          console.log(11111111, err)
        })
    },
    currentInfo (index) {
      if (this.currentNum !== index) {
        this.currentNum = index
      }
    },
    hide () {
      this.currentNum = null
    },


  },

}
</script>
<style lang="less" scoped>
// #app{
//   background: #ccc;
// }
html {
  -moz-user-select: none; /* Firefox私有属性 */
  -webkit-user-select: none; /* WebKit内核私有属性 */
  -ms-user-select: none; /* IE私有属性(IE10及以后) */
  -khtml-user-select: none; /* KHTML内核私有属性 */
  -o-user-select: none; /* Opera私有属性 */
  user-select: none; /* CSS3属性 */
}
// .box{
//   background-image: url('./assets/images/backgrounD.jpg');
//     background-size:cover;
//     height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }
@import 'https://g.alicdn.com/de/prismplayer/2.9.0/skins/default/aliplayer-min.css';
body {
  position: relative;
}
#app {
  position: relative;
  overflow-x: hidden;
}
.nav-list {
  height: 35px;
  background: transparent;
  padding: 10px 55px;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  top: 0;
  // justify-content: space-between;
  position: absolute;
}
.player {
  width: 100%;
  height: 100vh;
  *zoom: 1;
  position: relative;
  z-index: -1;
  > .title {
    color: #ffffff;
  }
}

// z-index: -1;
.player-init {
  position: absolute;
  width: 300px;
  height: 300px;
  z-index: 800;
  background: #000;
}
.player-2 {
  right: 15%;
  top: 12%;
}
.player-3 {
  right: 15%;
  bottom: 12%;
}
.player-name {
  position: absolute;
  color: #fff;
  z-index: 99;
}
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}

.login-user {
  // color: #7459dc;
  // background: #7459dc;
}
.footer {
  width: 100%;
  height: 35px;
  background: #000;
}
.logo {
  // position: absolute;
  // left: 40px;
  // top: 10px;
  height: 35px;
}
.login {
  line-height: 35px;
  color: #fff;
  font-size: 15px;
  .userinfo {
    display: inline-block;

    transform: translate(0, -7px);
    color: #fff;
  }
}
.login-left {
  height: 35px;
  line-height: 0;
  padding: 3px 0 0 0;
  flex: 1;
  text-align: right;
}
.sbox {
  display: inline-block;
  width: 10px;
}

//头像
.hpicture {
  position: absolute;
  left: 50px;
  top: 100px;
  color: #fff;
  img {
    width: 60px;
    border-radius: 50%;
    margin-bottom: 30px;
  }
  p {
    display: none;
  }
}
.user-head {
  overflow: hidden;
  height: 68px;
  margin-bottom: 35px;
}
.active {
  img {
    transform: scale(1.8);
    position: absolute;
    z-index: 10;
    transition: 0.8s;
  }
  div {
    display: inline-block;
    vertical-align: top;
    position: relative;
    margin-bottom: 30px;
    padding-left: 15px;
    // padding-top: 5px;
    transition: 0.4s;

    p {
      display: block;
      margin: 2px;
      background: rgba(255, 255, 255, 0.2);
      padding-left: 120px;
      padding-right: 10px;
      font-family: YouYuan;
      font-size: 14px;
      text-align: right;
      height: 20px;
      transition: 0.4s;
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;

      &:nth-child(1) {
        width: 50px;
      }
      &:nth-child(2) {
        width: 140px;
      }
      &:nth-child(3) {
        width: 220px;
      }
    }
    :last-child {
      font-family: ITC Avant Garde Gothic Std Book;
    }
  }
}

video::-webkit-media-controls-play-button {
  display: none;
}
video::-webkit-media-controls-timeline {
  display: none;
}
video::-webkit-media-controls-current-time-display {
  display: none;
}
video::-webkit-media-controls-time-remaining-display {
  display: none;
}
video::-webkit-media-controls-mute-button {
  display: none;
}
video::-webkit-media-controls-toggle-closed-captions-button {
  display: none;
}
video::-webkit-media-controls-volume-slider {
  display: none;
}
video::-webkit-media-controls-enclosure {
  display: none;
}
.player {
  background: #000;
}
#video {
  height: 100vh;
  margin: 0 auto;
  display: block;
}
.changePlayer {
  position: absolute;
  top: 30%;
  right: 0px;
  display: none;
  .workSpace {
    background: #ffffff;
    width: 80px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
}
@keyframes move {
  0% {
    left: 0%;
    opacity: 0;
  }
  50% {
    left: 50%;
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}
.move {
  -webkit-animation-name: move;
  animation-name: move;
  position: relative;
  margin-left: -25px;
  font-size: 15px;
  color: #fff;
}
.ar-animated {
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  font-style: inherit;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}
.ar-delay-1s {
  animation-delay: 0.1s;
}
.ar-delay-2s {
  animation-delay: 0.2s;
}
.ar-delay-3s {
  animation-delay: 0.3s;
}
.ar-delay-4s {
  animation-delay: 0.4s;
}
.ar-delay-5s {
  animation-delay: 0.5s;
}
.ar-delay-6s {
  animation-delay: 0.6s;
}
.ar-delay-7s {
  animation-delay: 0.7s;
}
.ar-delay-8s {
  animation-delay: 0.8s;
}
.ar-delay-9s {
  animation-delay: 0.9s;
}
.ar-delay-10s {
  animation-delay: 0.1s;
}
.arrow {
  position: fixed;
  width: 80px;
  display: none;
  right: 25px;
  top: 30%;
  text-align: right;
}

.arrowBlock {
  display: block !important;
}
.changeVideoBlock {
  display: block !important;
}
</style>
