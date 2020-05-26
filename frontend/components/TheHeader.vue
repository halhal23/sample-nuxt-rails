<template>
  <div>
    <ul>
      <li>
        <nuxt-link to="/">HOME</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/users">USERS</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/login">LOGIN</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/users/new">NEW</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/gnavi">GNAVI</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/map">MAP</nuxt-link>
      </li>
      <li>
        {{ loginMsg }}
      </li>
      <li v-if="member">
        {{ member.uid }}
      </li> 
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    loginMsg(){
      return this.$store.state.auth.loggedIn ? "ログイン中" : "未ログイン"
    },
    ...mapGetters(['member', 'isLoggedIn'])
  }
}
</script>

<style scoped>
ul {
  display: flex;
  padding-top: 30px;
}
li {
  list-style: none;
  font-size:  15px;
  margin-right: 50px;
}
a {
  text-decoration: none;
}
</style>
