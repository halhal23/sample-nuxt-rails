<template>
  <div>
    <h2 @click="getShops">
      ぐるなびAPI
    </h2>
    <el-button @click="increment" style="padding: 10px 20px;" type="success" round>{{ count }}</el-button>
    <h3 v-for="s in shops" :key="s.id">{{ s.name }}</h3>
    <h2 @click="getDecoies">デコイを取得</h2>
    <ul v-if="decoies">
      <li v-for="d in decoies" :key="d.id">
        <span @click="setDecoy(d)">{{ d.name }}</span>
        <span @click="deleteDecoy(d.id)" style="padding-left: 20px">[x]</span>
      </li>
    </ul>
    <input v-model="newDecoy" type="text">
    <button @click="createDecoy">create</button>
    <input v-model="editDecoy" type="text">
    <button @click="updateDecoy(editId)">update</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data(){
    return {
      shops: {},
      decoies: [],
      newDecoy: '',
      editDecoy: '',
      editId: ''
    }
  },
  methods: {
    getShops(){
      this.$axios.$get('/api/', {
        params: {
          keyid: "cccd05138db6e13ac16bf8e63a21cd2d",
          name: "肉"
        }
      }).then( res => {
        console.log('成功です。')
        console.log(res)
        this.shops = res.rest
        console.log(process.env.apiBaseUrl)
        console.log(process.env.browserBaseUrl)
      }).catch( err => {
        console.log('失敗です。')
        console.log(err)
      })
    },
    getDecoies(){
      this.$axios.$get( process.env.browserBaseUrl + '/decoies').then( res => {
        console.log(res)
        this.decoies = res
      }).catch( err => {
        console.log('decoies cant be get')
        console.log(err)
      })
    },
    createDecoy(){
      this.$axios.$post(process.env.browserBaseUrl + '/decoies', {
          name: this.newDecoy
      }).then(res => {
        console.log('create decoy')
        console.log(res)
        this.decoies = res
      }).catch(err => {
        console.log('error create decoy')
        console.log(err)
      })
    },
    deleteDecoy(did){
      this.$axios.$delete(process.env.browserBaseUrl + `/decoies/${did}`, {
      }).then(res => {
        console.log('destroy decoy')
        console.log(res)
        this.decoies = res
      }).catch(err => {
        console.log('error destroy decoy')
        console.log(err)
      })
    },
    updateDecoy(did){
      this.$axios.$patch(process.env.browserBaseUrl + `/decoies/${did}`, {
        name: this.editDecoy
      }).then(res => {
        console.log('update decoy')
        console.log(res)
        this.decoies = res
      }).catch(err => {
        console.log('error update decoy')
        console.log(err)
      })
    },
    setDecoy(d){
      this.editDecoy = d.name
      this.editId = d.id
    },
    ...mapActions('count', ['increment'])
  },
  computed: {
    ...mapGetters('count', ['count'])
  }
}
</script>

<style scoped>
li {
  padding: 5px;
  font-size: 20px;
}
</style>