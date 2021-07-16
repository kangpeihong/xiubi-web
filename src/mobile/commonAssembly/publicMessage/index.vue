<template>
  <div>
    <div class="publicMessage">
      <div class="title">公告信息</div>
      <div class="publicMessageInfo">
        <span>{{publicTime | formatData}}公告:</span> {{ info }}
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
</style>

