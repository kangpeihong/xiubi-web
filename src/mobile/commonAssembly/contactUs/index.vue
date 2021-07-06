<template>
  <div>
    <div class="contact-us">
      <div class="title">联系我们</div>
      <div class="user">
        <div class="user-info" v-for="(item,index) in parterInfo" :key="index">
          <div class="avatar">
            <img :src="item.headAddress" alt="">
          </div>
          <div class="user-name">{{item.name}}</div>
          <div class="user-work">{{item.jobs}}</div>
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
      parterInfo:[
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
  mounted(){
    this.getParterInfo();
  },
  computed: {
  },
  methods: {
    // 获取员工的信息（头像，职位，电话）
    getParterInfo(){
      this.$request.get(this.$api.parterInfo).then(res => {
        console.log('res000',res);
        this.parterInfo = res.data.content;
      })
    }
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
      img{
        width: 100%;
      }
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
