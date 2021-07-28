<template>
  <div class="err">
    <div class="err-img">
      <img alt src="../assets/images/sorry.jpeg" />
    </div>
    <div class="err-title">正在加快适配移动端中,请先移步pc端查看!</div>
  </div>
</template>

<script>
export default {
  name: '',
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
.err {
  color: #000000;
  font-size: 18px;
  padding-top: 100px;
  text-align: center;
  .err-img {
    margin: 0 auto;
    width: 300px;
    > img {
      width: 100%;
    }
  }
  .err-title {
    margin-top: 65px;
  }
}
</style>
