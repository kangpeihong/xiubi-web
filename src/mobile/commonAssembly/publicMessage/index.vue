<template>
  <div>

    <div class="publicMessage"> 
      <div class="title">公告信息</div>
      <div class="publicMessageInfo">
        2021-6-11公告: 最近几天因为工厂停电,所以没办法干活!
      </div>
    </div>
  </div>
</template>

<script>
export default {
name:'',
  data () {
    return {
      msg: ''
    }
  },
created(){
},
computed:{
},
  methods: {

  }
}
</script>

<style lang="less" scoped>

.publicMessage{
  .title{
    font-size: 18px;
  }
  .publicMessageInfo{
    margin-top: 10px;
    background-color: rgba(92,99,110,0.2);
    padding: 5px 5px;
    border-radius: 3px;
  }
}
</style>

