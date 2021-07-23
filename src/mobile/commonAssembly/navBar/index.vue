<template>
  <div>
    <van-nav-bar v-if="title.status" :title="title.name" />
    <van-nav-bar v-else :title="title.name" >
      <template #left>
        <span class="user-name" v-permission="{action:tokenStatus,effect:'limit'}">{{userName}}</span>
        <span class="user-name" v-noLimit="{action:tokenStatus}" @click="login">登陆</span>
      </template>
      <template #right>
        <van-icon v-permission="{action:tokenStatus}" name="bars" @click="menuRight" size="25" />
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'navbar',
  data () {
    return {
      userTitle: 'userTitle',
      userName:'',
    }
  },
  props: ['title','LoginShow'],
  created () {
    
    if(sessionStorage.getItem('user-token')){
      this.userName = JSON.parse(sessionStorage.getItem('user-token')).enterpriseUserDTO.userName;
    }
  },
  computed: {
    ...mapState(['tokenStatus'])
  },
  methods: {
    menuLeft(){
      // this.$store.commit('setMenuLeft', !this.$store.state.menuLeft)
    },
    menuRight(){
      this.$store.commit('setMenuRight', !this.$store.state.menuRight)
    },
    login(){
      this.$parent.openLoginPage()
    }
  }
}
</script>

<style lang='less' scoped>

.user-name{
  color:#1989fa;
}
</style>
