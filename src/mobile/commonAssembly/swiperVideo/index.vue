<template>
  <div>
    <van-swipe class="my-swipe" height="210" :autoplay="100000" indicator-color="white">
      <van-swipe-item class="my-swipe-box">
        <div class="title">车间一</div>
        <div id='player-con1'>

        </div>
      </van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      player1:'',
      video1: {
        id: 'player-con1',
        source: '',
        width: '100%',
        height: '210px',
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
    }
  },
  created () {
  },
  mounted() {
    this.getPlay();
  },
  computed: {
  },
  methods: {
    getPlay(){
      this.video1.source = "//player.alicdn.com/video/aliyunmedia.mp4"
      this.player1 = new Aliplayer(this.video1, function (player) {
          console.log('The player is created222')
          player.setVolume(0)
        })
    }
  }
}
</script>

<style scoped lang="less">
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}

.my-swipe-box{
  position: relative;
  .title{ 
    width: 60px;
    height: 30px;
    line-height:30px;
    position: absolute;
    z-index: 999;
    font-size: 14px;
  }
}

</style>
