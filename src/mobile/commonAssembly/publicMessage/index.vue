<template>
  <div>
    <div class="publicMessage">
      <div class="title">公告信息</div>
      <div class="publicMessageInfo">
        <div>{{publicTime | formatData}}公告:{{ info }}</div> 
        <div class="ship">发货：</div>
      <van-notice-bar :scrollable="false">
        <van-swipe
          vertical
          class="notice-swipe"
          :autoplay="3000"
          :show-indicators="false"
        >
          <van-swipe-item v-for="(item,index) in expressData" :key="index">
            {{item.dateTime | formatData}} <span>:</span> {{ item.info }}
          </van-swipe-item>
        </van-swipe>
      </van-notice-bar>
      </div>
      
    </div>
  </div>
</template>

<script>
import utils from "../../../assets/js/utils";

export default {
  name: '',
  data () {
    return {
      msg: '',
      info:null,
      publicTime:null,
      expressData: null,
    }
  },
  created () {
  },
  mounted(){

    // 公告信息
    this.$request.get(this.$api.newPublicMessage).then(res => {
      // console.log("ddd", res);
      this.info = res.data.info;
      this.publicTime = res.data.dateTime; 
    });

     // 发货信息
    this.$request.get(this.$api.publicMessage).then(res => {
      this.expressData = res.data;
    });

   
  },
  computed: {
  },
  filters: {
    formatData (time) {
      return utils.format(time, "yyyy-MM-dd");
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.publicMessage {
  .title {
    font-size: 18px;
  }
  .publicMessageInfo {
    margin-top: 10px;
    background-color: rgba(92, 99, 110, 0.2);
    padding: 5px 5px;
    border-radius: 3px;
  }
}
.notice-swipe {
  height: 30px;
  line-height: 30px;
}

.van-notice-bar {
  height: 35px;
  background-color:transparent;
  padding:0;
  color: #000 !important;
  border-radius: 3px !important;
}
.ship{
  margin-top: 15px;
}
.shipMessage {
  .title {
    font-size: 18px;
  }
  
}
</style>

