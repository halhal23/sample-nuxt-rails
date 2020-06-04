<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新規登録</span>
        <el-button style="float: right; padding: 3px 0" type="text">Operation button</el-button>
      </div>
      <div class="text item">
        <el-form ref="form" label-width="200px">
          <el-form-item label="名前">
            <el-input v-model="name"></el-input>
          </el-form-item>
          <el-form-item label="メールアドレス">
            <el-input v-model="email"></el-input>
          </el-form-item>
          <el-form-item label="パスワード">
            <el-input v-model="password" show-password></el-input>
          </el-form-item>
          <el-form-item label="パスワード（確認用）">
            <el-input v-model="password_confirmation" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="signUp" style="float: right;" type="success" round>送信</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  auth: false,
  data(){
   return {
     name: '',
     email: '',
     password: '',
     password_confirmation: ''
    }
  },

  methods: {
    async signUp(){
      console.log('signUp start /pages/users/new')
      await this.$axios.$post(process.env.browserBaseUrl + '/auth', {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.password_confirmation
      }).then(res => {
        console.log('↓ res signUp成功')
        console.log(res)
      }).catch(err => {
        console.log('↓ err signUp失敗')
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
.el-input {
  width: 200px;
}
</style>