<template>
  <div>
    <div class="contact-us">
      <div class="title">联系我们</div>
      <div class="user">
        <div class="user-info" v-for="(item,index) in user" :key="index">
          <div class="avatar"></div>
          <div class="user-name">{{item.name}}</div>
          <div class="user-work">{{item.work}}</div>
          <div class="user-name">{{item.phone}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      user:[
        {
          id:0,
          name:'kang',
          work:"laoban",
          phone:"123445"
        },
        {
          id:1,
          name:'kang',
          work:"laoban",
          phone:"123445"
        },
        {
          id:2,
          name:'kang',
          work:"laoban",
          phone:"123445"
        },
        
      ]
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
.title{
  font-size: 18px;
  margin-bottom: 10px;
}
.user {
  display:flex;
  justify-content:space-between;
  flex-wrap: wrap;
  .user-info {
    box-sizing: border-box;
    width: 150px;
    padding:20px;
    border-radius: 3px;
    background-color: rgba(92, 99, 110, 0.2);
    margin-bottom: 25px;
    > .avatar {
      width: 70px;
      height: 70px;
      margin:0 auto;
      border-radius:50%;
      background-color:yellow;
    }
    >div{
      text-align:center;
      width: 100%;
      background:#ecf5ff;
      margin-top: 10px;
   
    }
  }
}
</style>
