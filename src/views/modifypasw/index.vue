<template>
    <el-card class="modify">
        <div slot="header" class="clearfix">
            <span>修改密码</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click.native="close">关闭</el-button>
        </div>
        新密码：<el-input v-model="password">

        </el-input>
        <el-button type="primary" class="btn" @click="modify">确认修改</el-button>
    </el-card>
</template>

<script>

export default {
  data () {
    return {
      password: ''
    }
  },
  methods: {
    modify () {
      if (!this.password.trim()) {
        this.$message('密码不能为空')
        return
      }
      const id = JSON.parse(window.sessionStorage.getItem('user-token')).enterpriseUserDTO.id
      console.log(id)
      this.$axios({
        method: 'put',
        url: '/api/xwEnterprise/update/pass',
        data: {
          id: id,
          pass: this.password
        }
      }).then(res => {
        console.log(res)
        window.sessionStorage.removeItem('user-token')

        this.$message('修改成功，请重新登录！')
        window.location.reload()
        this.$store.state.loginShow = true;
      })
    },
    close () {
      console.log(1111111111111)
      this.$router.push('/')
    }
  }

}
</script>

<style lang='less' scoped>
.modify{
        height: 250px;
        width: 400px;
        position:absolute;
        left: 50%;
        top:40%;
        transform: translate(-50%,-50%);
        .btn{
            margin-left: 135px;
            margin-top: 30px;
        }
    }
</style>
