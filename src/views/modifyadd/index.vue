<template>
    <div class="register">
        <el-card>
            <div slot="header" class="clearfix">
            <span>修改收货信息</span>
            <el-button style="float: right; padding: 3px 0" type="text" @click.native="onCancel ">关闭</el-button>
        </div>
            <el-form :model="info" ref="form" label-width="80px"  >
                <el-form-item prop="consignee" label="收货人"
            :rules="[
                    {required: true,message: '请输入收货人名称',trigger: 'blur'}

                    ]">
          <el-input v-model="info.consignee"></el-input>
        </el-form-item>
        <el-form-item prop="telephone" label="收货电话"
            :rules="[
                     { required: true, message: '请输入注册电话', trigger: 'blur' },
                    {pattern: /^1[34578]\d{9}$/, message: '电话号输入有误'}
                    ]">
          <el-input v-model="info.telephone"></el-input>
        </el-form-item>
        <el-form-item prop="harvestAddress" label="收货地址"
            :rules="[
                     { required: true, message: '请输入收货地址', trigger: 'blur' },

                    ]">
          <el-input v-model="info.harvestAddress"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="onSubmit" >立即修改</el-button>
         <el-button @click="onCancel">取消修改</el-button>
        </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import Bus from '../../utils/bus.js'

const info = JSON.parse(window.sessionStorage.getItem('user-token'))
export default {
  data () {
    return {

      info: {
        loginPhone: '',
        password: '',
        accountOpening: '',
        bankAccount: '',
        consignee: '',
        creditCode: '',
        enterpriseName: '',
        harvestAddress: '',
        phoneNumber: '',
        registeredAddress: '',
        telephone: ''
      }

    }
  },
  created () {
    this.info = info.xwEnterpriseDTO
  },
  methods: {
    onSubmit () {
      this.$axios({
        method: 'put',
        url: '/api/xwEnterprise',
        data: this.info
      }).then(res => {
        console.log(res)
        info.xwEnterpriseDTO = this.info
        window.sessionStorage.setItem('user-token', JSON.stringify(info))
        Bus.$emit('change', this.info)

        this.$router.push('/order')
      }).catch(err => {
        console.log(err)
      })
    },
    onCancel () {
      this.$router.push('/order')
    }
  }
}
</script>

<style lang="less" scoped>
.register{
        height: 650px;
        width: 400px;
        position:absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%,-50%);
        padding-right: 40px;
    }
</style>
