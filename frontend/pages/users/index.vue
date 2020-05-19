<template>
  <div>
    <h1>users</h1>
    <button @click="getting"></button>
    <h1 v-for="user in users" :key="user.id">{{ user.name }}</h1>
    <el-button @click="logout" type="danger" round>ログアウト</el-button>
    <el-button @click="showMe" type="warning" round>Show Me</el-button>
    <el-button type="text" @click="dialogShowMe">click to open the Dialog</el-button>
    <img src="images/mountain-2.jpg" width="200px" height="200px">
    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="40%">
      <span>{{ email }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios }){
    // let users = await $axios.$get('/users')
    // console.log(users)
    // console.log('終了 asyncData /pages/users.vue')
    return {
      users: 12,
      dialogVisible: false,
      email: {}
    }
  },
  methods: {
    getting(){
      console.log(process.env.apiBaseUrl)
      console.log(this)

    },
    async logout(){
      await this.$auth.logout({
        data: {
          email: 'rails@gmail.com',
          password: 'password',
          password_confirmation: 'password'
        }
      }).then( res => {
        console.log('ログアウト成功')
        console.log(res)
        return res
      }).catch( err => {
        console.log('ログアウト失敗')
        console.log(err)
        return err
      })
    },
    async showMe(){
      await this.$axios.$get('/me').then( res => {
        console.log('↓show me')
        console.log(res)
      }).catch( err => {
        console.log('↓show me err')
        console.log(err)
      })
    },
    async dialogShowMe(){
      this.dialogVisible = true
      await this.$axios.$get('/me').then( res => {
        console.log('↓show me')
        console.log(res)
        this.email = res.data.email
      }).catch( err => {
        console.log('↓show me err')
        console.log(err)
        this.email = 'error'
      })
    }
  }
}
</script>