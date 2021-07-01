<template>
  <div>
    <div class="shipMessage">
      <div class="title">发货信息</div>
      <div class="shipMessageInfo">
        2021-6-11公告: 最近几天因为工厂停电,所以没办法干活!
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shipMessage',
  components: {

  },
  data () {
    return {
      msg: ''
    }
  },
  created () {
  },
  computed: {
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
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

