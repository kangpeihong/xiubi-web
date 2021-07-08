<template>
  <div>
    <navBar :title="title"></navBar>

  </div>
</template>

<script>
import navBar from '../navBar'

export default {
  name: '',
  data () {
    return {
      title: {
        name: '收货信息',
        status: true,
      },
    }
  },
  components: {
    navBar,
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