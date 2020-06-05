<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>ログイン</span>
        <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
      </div>
      <div class="text item">
        <el-form ref="form" label-width="120px">
          <el-form-item label="メールアドレス">
            <el-input v-model="email"></el-input>
          </el-form-item>
          <el-form-item label="パスワード">
            <el-input v-model="password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="getapi" style="float: right;" type="primary" round>GET送信</el-button>
            <el-button @click="login" style="float: right;" type="success" round>ログイン</el-button>
          </el-form-item>
        </el-form>
      </div>
  </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async getapi(){
      await this.$axios.$get('/users').then( res => {
        console.log('↓GET送信 /pages/login')
        console.log(res)
      }).catch( err => {
        console.log('↓GETエラー /pages/login')
        console.log(err)
      })
    },
    async login(){
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password,
          password_confirmation: this.password
        }
      }).then( res => {
        console.log('ログイン成功' + ' /pages/login.js')
        console.log(res)
        console.log(this)
        this.$store.commit('setMember', res.data.data )
        this.$notify({
          type: 'success',
          title: 'ログインしました。',
          message: `${res.data.data.uid}としてログインしました。`,
          position: 'top-left',
          duration: 2000
        })
        return res
      }).catch( err => {
        console.log('ログイン失敗' + ' /pages/login.js')
        console.log(err)
        this.$notify({
          type: 'success',
          title: 'ログアウト',
          message: `ログインしました。`,
          position: 'top-left',
          duration: 2000
        })
        return err
      })
    }
  },
  mounted(){
    console.log(this)
  }
}
</script>



<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>