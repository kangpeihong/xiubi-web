<template>
  <div>
    <div class="shipMessage">
      <div class="title">发货信息</div>
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
</template>

<script>
import utils from "../../../assets/js/utils";
export default {
  name: 'shipMessage',
  components: {

  },
  data () {
    return {
      expressData: null,
    }
  },
  created () {
  },
  mounted () {
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
.notice-swipe {
  height: 40px;
  line-height: 40px;
}

.van-notice-bar {
  margin-top: 10px;
  background-color: rgba(92, 99, 110, 0.2) !important;
  color: #000 !important;
  border-radius: 3px !important;
}
.shipMessage {
  .title {
    font-size: 18px;
  }
  .shipMessageInfo {
    margin-top: 10px;
    background-color: rgba(92, 99, 110, 0.2);
    padding: 5px 5px;
    border-radius: 3px;
  }
}
</style>

