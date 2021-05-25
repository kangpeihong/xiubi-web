<template>
  <div id="app">
    <div class="nav-list">
      <!-- <div>
        <img src="./assets/images/logoo.png" alt="" class="logo">
      </div> -->
      <div class="login" v-if="show">
        <!-- <router-link to="/login"  @click="loginUser">登录</router-link> <span class="sbox"></span>
       -->
        <!-- <router-link to="/register">注册</router-link> -->

        <span @click="loginUser">
          <span class="iconfont icon-denglu login-user"></span>

          登录</span
        ><span class="sbox"></span>
        <span @click="register">
          <span class="iconfont icon-zhuce"></span>
          注册</span
        >
      </div>
      <div class="login login-left" v-if="!show">
        <el-avatar
          :size="25"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        >
        </el-avatar>
        <span class="sbox"></span>

        <el-dropdown>
          <span class="userinfo"
            >{{ userinfo }}<i class="el-icon-arrow-down el-icon--right"></i
          ></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="history"
              >历史订单</el-dropdown-item
            >
            <el-dropdown-item @click.native="modifyPass"
              >修改密码</el-dropdown-item
            >
            <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="hpicture">
      <div
        v-for="(item, index) in userArr"
        :key="item.id"
        class="user-head"
        :class="index === currentNum ? 'active' : ''"
        @mouseenter="currentInfo(index)"
        @mouseleave="hide()"
      >
        <img :src="item.headAddress" alt="" />
        <div v-show="ifToken">
          <p>{{ item.name }}</p>
          <p>{{ item.jobs }}</p>
          <p style="font-family: HeiTi">{{ item.phone }}</p>
        </div>
      </div>
    </div>

    <publicMessage />

    <router-view />

    <!-- <keep-alive>
      <router-view v-if='$route.meta.keepAlive'/>
    </keep-alive> -->

    <prolist v-on:open-list="this.$router.push('/')"></prolist>

    <!-- <div class="info">
      <h4>北京·密云</h4>
      <p>北京修文印刷技术有限公司</p>
      <p>单色印刷车间</p>
      <p>孙恒文<i class="el-icon-arrow-down el-icon--right"></i></p>
      <p>{{time}}</p>
      <div style="display:none">
        <p>机长,企业投资人,生产主管</p>
      <p>手机:18911629068</p>
      <p>微信:18911629068</p>
      <p>QQ:583895185</p>
      </div>
    </div> -->
    <div class="player">
      <div class="player-name">
        {{
          workshop == 1
            ? '车间1'
            : workshop == 2
            ? '车间2'
            : workshop == 3
            ? '车间3'
            : ''
        }}
      </div>
      <div class="prism-player" id="player-con"></div>
    </div>

    <div class="player-2 player-init" @click="exchange(2)">
      <div class="player-name">
        {{
          workshop2 == 1
            ? '车间1'
            : workshop2 == 2
            ? '车间2'
            : workshop2 == 3
            ? '车间3'
            : ''
        }}
      </div>
      <div class="prism-player" id="player-con2"></div>
    </div>

    <div class="player-3 player-init" @click="exchange(3)">
      <div class="player-name">
        {{
          workshop3 == 1
            ? '车间1'
            : workshop3 == 2
            ? '车间2'
            : workshop3 == 3
            ? '车间3'
            : ''
        }}
      </div>
      <div class="prism-player" id="player-con3"></div>
    </div>

    <div class="footer"></div>
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
export default {
  data() {
    return {
      videoUrl: './playVideo/video.html',
      workshop: 1,
      workshop2: 2,
      workshop3: 3,
      player1: '',
      player2: '',
      player3: '',
      userinfo: '',
      userArr: [
        // {
        //   img: require('./assets/images/mersi.jpg'),
        //   name: '里奥梅西',
        //   part: '运营实施',
        //   phoneNum: 17611301761
        // },
        // {
        //   img: require('./assets/images/suyaleis.jpg'),
        //   name: '苏亚雷斯',
        //   part: '美工修图',
        //   phoneNum: 17611301761
        // },
        // {
        //   img: require('./assets/images/nmr.jpg'),
        //   name: '内马尔',
        //   part: '打包发货',
        //   phoneNum: 17611301761
        // }
      ],
      currentNum: null,
      show: true,

      video: {
        id: 'player-con',
        source: '',
        width: '100%',
        height: 'calc(100vh - 70px)',
        autoplay: true,
        isLive: false,
        rePlay: true,
        playsinline: true,
        preload: true,
        controlBarVisibility: 'hover',
        useH5Prism: true,
        skinLayout: [
          {
            name: 'controlBar',
            align: 'blabs',
            x: 0,
            y: 0,
            children: []
          }
        ]
      },
      video2: {
        id: 'player-con2',
        source: '',
        width: '300px',
        height: '300px',
        autoplay: true,
        isLive: false,
        rePlay: true,
        playsinline: true,
        preload: true,
        setVolume: 0,
        controlBarVisibility: 'hover',
        useH5Prism: true,
        skinLayout: [
          {
            name: 'controlBar',
            align: 'blabs',
            x: 0,
            y: 0,
            children: []
          }
        ]
      },
      video3: {
        id: 'player-con3',
        source: '',
        width: '300px',
        height: '300px',
        autoplay: true,
        isLive: false,
        rePlay: true,
        playsinline: true,
        preload: true,
        setVolume: 0,
        controlBarVisibility: 'hover',
        useH5Prism: true,
        skinLayout: [
          {
            name: 'controlBar',
            align: 'blabs',
            x: 0,
            y: 0,
            children: []
          }
        ]
      },
      ifToken: false
    }
  },
  components: {
    prolist,
    publicMessage
  },

  methods: {
    history() {
      this.$router.push('./historyPage')
    },
    loginUser() {
      this.$router.push('./views/login/index').catch(() => {})
      this.$store.state.loginShow = true
    },
    register() {
      this.$router.push('/register').catch(() => {})
      this.$store.state.registerShow = true
    },
    // getUrl () {
    //   this.$axios
    //     .post(
    //       'https://open.ys7.com/api/lapp/token/get?appKey=e91574b23c344e858ab96f8d60294ae9&appSecret=ca09a52e43fcebae1a1819676b80250c',
    //       {
    //         headers: {}
    //       }
    //     )
    //     .then(res => {
    //       console.log(res, 1)
    //       this.accessToken = res.data.accessToken
    //       this.videoUrl =
    //         'https://open.ys7.com/ezopen/h5/iframe?url=ezopen://EXPRVK@open.ys7.com/D44345285/1.hd.live&autoplay=1&accessToken=' +
    //         res.data.data.accessToken
    //     })
    //     .catch(err => {
    //       console.log(err, '请求失败')
    //     })
    // },
    //修改密码
    modifyPass() {
      this.$router.push('/modify')
    },
    getinfo() {
      const token = JSON.parse(window.sessionStorage.getItem('user-token'))
      if (token) {
        this.show = false
        if (token.enterpriseUserDTO.userName !== null) {
          this.userinfo = token.enterpriseUserDTO.userName
        }
        // console.log("2332543434", this.userinfo);
      }
    },
    loginOut() {
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
        .catch(() => {})
    },
    getOrder() {
      this.$router.push('/order')
    },
    // 获取员工信息
    getparter() {
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
    currentInfo(index) {
      if (this.currentNum !== index) {
        this.currentNum = index
      }
    },
    hide() {
      this.currentNum = null
    },
    getplay() {
      this.$axios({
        method: 'get',
        url: '/api/room/1001'
      }).then(res => {
        // this.video.source = res.data.roomAddress + res.data.roomNo;
        this.video.source =
          'https://www.xiubi.com.cn/group1/M00/00/02/rBH8OWBcOcGAUvbnbFRSneUPKTs436.MOV'
        // console.log("112", this.video.source);
        this.player1 = new Aliplayer(this.video, function(player) {
          console.log('The player is created')
        })

        this.video2.source = '//player.alicdn.com/video/aliyunmedia.mp4'
        // console.log("112", this.video.source);
        this.player2 = new Aliplayer(this.video2, function(player) {
          console.log('The player is created222')
          player.setVolume(0)
        })

        this.video3.source = '//player.alicdn.com/video/aliyunmedia.mp4'
        // console.log("112", this.video.source);
        this.player3 = new Aliplayer(this.video3, function(player) {
          player.setVolume(0)

          console.log('The player is created222')
        })
      })
    },
    replay(video, type) {
      switch (type) {
        case 1:
          this.player1 = new Aliplayer(video, function(player) {
            console.log('The player is created22')
          })
          break

        case 2:
          this.player2 = new Aliplayer(video, function(player) {
            console.log('The player is created22')
            player.setVolume(0)
          })
          break

        case 3:
          this.player3 = new Aliplayer(video, function(player) {
            console.log('The player is created22')
            player.setVolume(0)
          })
          break
      }
    },
    exchange(index) {
      switch (index) {
        case 2:
          let url = this.video.source
          let name = this.workshop
          this.video.source = this.video2.source
          this.video2.source = url
          this.workshop = this.workshop2
          this.workshop2 = name
          this.player1.dispose()
          this.player2.dispose()
          this.replay(this.video, 1)
          this.replay(this.video2, 2)
          break
        case 3:
          let urls = this.video.source
          let names = this.workshop
          this.video.source = this.video3.source
          this.video3.source = urls
          this.workshop = this.workshop3
          this.workshop3 = names
          this.player1.dispose()
          this.player3.dispose()
          this.replay(this.video, 1)
          this.replay(this.video3, 3)
      }
    }
  },
  created() {
    // this.getUrl()

    
    this.getinfo()
    Bus.$on('change', e => {
      console.log('vvvv', e)
      if (e.userName !== null) {
        this.userinfo = e.userName
      }
    })
  },
  mounted() {
    this.getparter(), this.getplay()
    let token = sessionStorage.getItem('user-token')

    if (token !== '' && token !== null) {
      this.ifToken = true
    } else {
      this.ifToken = false
    }
  }
}
</script>
<style lang="less" socped>
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

.nav-list {
  height: 35px;
  background: #000;
  padding: 0 55px;
  display: flex;
  // justify-content: space-between;
}
.player {
  width: 100%;
  height: calc(100vh - 70px);
  *zoom: 1;
  position: relative;
  z-index: -1;
}

// z-index: -1;
.player-init {
  position: absolute;
  width: 300px;
  height: 300px;
  z-index: 999;
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
</style>
