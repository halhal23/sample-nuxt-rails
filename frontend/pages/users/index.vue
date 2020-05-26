<template>
  <div>
    <h1>users</h1>
    <button @click="getting"></button>
    <h1 v-for="user in users" :key="user.id">{{ user.name }}</h1>
    <el-button @click="logout" type="danger" round>ログアウト</el-button>
    <el-button @click="showMe" type="warning" round>Show Me</el-button>
    <el-button type="text" @click="dialogShowMe">click to open the Dialog</el-button>
    <img src="~/static/images/mountain-2.jpg" width="200px" height="200px">
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


    <el-table
      v-if="tableData"
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名前"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="メールアドレス"
        width="180">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="登録日時">
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  async asyncData({ $axios, store }){
    if (process.browser){
        console.log('process.browser /pages/users')
        return {
        users: 12,
        dialogVisible: false,
        email: {},
        tableData: false
      }
    }
    let members = await $axios.$get(process.env.apiBaseUrl + '/members/index')
    console.log(members)
    console.log(store.$auth.$state.loggedIn) 
    return {
      users: 12,
      dialogVisible: false,
      email: {},
      tableData: members.data
    }
  },

  methods: {
    getting(){
      console.log(process.env.apiBaseUrl)
      console.log(this)

    },
    async logout(){
      console.log(this.$store)
      await this.$auth.logout({
        data: {
          email: 'python@gmail.com'
        }
      }).then( res => {
        console.log('ログアウト成功')
        this.$store.commit('setMember', { member: null })
        console.log(res)
        return res
      }).catch( err => {
        console.log('ログアウト失敗')
        console.log(err)
        return err
      })
    },
    async showMe(){
      await this.$axios.$get(process.env.browserBaseUrl + '/me').then( res => {
        console.log('↓show me')
        console.log(res)
      }).catch( err => {
        console.log('↓show me err')
        console.log(err)
      })
    },
    async dialogShowMe(){
      this.dialogVisible = true
      await this.$axios.$get(process.env.browserBaseUrl + '/me').then( res => {
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