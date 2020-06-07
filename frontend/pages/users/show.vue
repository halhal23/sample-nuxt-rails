<template>
  <div v-if="member">
    <h1 v-if="member">{{ member.uid }}</h1>
    <h1 v-if="member">{{ member.name }}</h1>
    <el-input :placeholder="member.email" size="mini" style="width: 200px;" v-model="email"></el-input>
    <el-input :placeholder="member.name" size="mini" style="width: 200px;" v-model="name"></el-input>
    <el-upload
      class="upload-demo"
      action="#"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-change="onUpload()"
      list-type="picture">
      <el-button size="small" type="primary">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
    <el-button @click="updateUser">送信</el-button>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data(){
    return {
      email: '',
      name: '',
      fileList: [],
      image: ''
    }
  },
  computed: {
    ...mapGetters(['member'])
  },
  methods: {
    async updateUser(){
      console.log('image desu')
      console.log(this.image)
      await this.$axios.$put( process.env.browserBaseUrl + '/auth', {
        email: this.email,
        name: this.name,
        image: this.image
      }).then( res => {
        console.log('res desu')
        console.log(res)
        this.$store.commit('setMember', res.data )
      }).catch( err => {
        console.log(err)
      })
    },
    onUpload(file, fileList){
      console.log('onUpload')
     
      console.log(file)
      console.log(fileList)
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePreview(file) {
        console.log('file')
        console.log(file);
        this.image = file.raw
    }
  }
}
</script>