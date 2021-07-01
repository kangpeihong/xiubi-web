<template>
  <div>
    <van-nav-bar v-if="title.status" :title="title.name" />
    <van-nav-bar v-else :title="title.name" >
      <template #left>
        <van-icon name="contact" @click="menuLeft" size="25" />
      </template>
      <template #right>
        <van-icon name="bars" @click="menuRight" size="25" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      userTitle: 'userTitle',
    }
  },
  props: ['title'],
  created () {
  },
  computed: {
  },
  methods: {
    menuLeft(){
      this.$store.commit('setMenuLeft', !this.$store.state.menuLeft)
    },
    menuRight(){
      this.$store.commit('setMenuRight', !this.$store.state.menuRight)
    }
  }
}
</script>

<style lang='less' scoped>
</style>
