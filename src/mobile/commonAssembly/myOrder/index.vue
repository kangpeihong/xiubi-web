<template>
  <div>
    <navBar :title="title"></navBar>
    123-123
  </div>
</template>

<script>
import navBar from '../navBar'
export default {
  name: '',
  data () {
    return {
      title: {
        name: '我的订单',
        status: true
      },
    }
  },
  components:{
    navBar
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
</style>
