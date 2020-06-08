<template>
  <div v-if="member">
    <h1 v-if="member">{{ member.uid }}</h1>
    <h1 v-if="member">{{ member.name }}</h1>
    <h1 v-if="member.image.url"><img :src="member.image.url" width="100px" height="100px"></h1>
    <el-input :placeholder="member.email" size="mini" style="width: 200px;" v-model="email"></el-input>
    <el-input :placeholder="member.name" size="mini" style="width: 200px;" v-model="name"></el-input>
    <el-upload
      class="upload-demo"
      action="#"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :on-change="handleAdd"
      list-type="picture">
      <el-button size="small" type="primary">Click to upload</el-button>
      <div slot="tip" class="el-upload__tip">jpg/png files with a size less than 500kb</div>
    </el-upload>
    <el-button @click="updateUser">送信</el-button>
    <input type="file" v-on:change="testChange">
    <!-- <input
      ref="image"
      type="file"
      style="display: none"
      accept="image/*"
      @change="onFilePicked"
    /> -->
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
      image: {},
      imageFile: ""
    }
  },
  computed: {
    ...mapGetters(['member'])
  },
  methods: {
    async updateUser(){
      console.log('image desu')
      console.log(this.fileList[0])
      console.log(this.fileList[0].raw)

      // formData
      let formData = new FormData()
      formData.append("name", this.name)
      formData.append("email", this.email)
      formData.append("image", this.imageFile)

      await this.$axios.$put( process.env.browserBaseUrl + '/auth', formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
      }).then( res => {
        console.log('res desuyo')
        console.log(res)
        this.$store.commit('setMember', res.data )
      }).catch( err => {
        console.log(err)
      })
      // await this.$axios.$put( process.env.browserBaseUrl + '/auth', {
      //   email: this.email,
      //   name: this.name,
      //   image: this.fileList[0].raw
      // }).then( res => {
      //   console.log('res desu')
      //   console.log(res)
      //   this.$store.commit('setMember', res.data )
      // }).catch( err => {
      //   console.log(err)
      // })
    },
    handleAdd: function (file, fileList) {
      this.fileList = fileList
      this.imageFile = fileList[0].raw
      console.log('handleAdd')
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
    },
   testChange(){
     console.log('test change')
     console.log(event.target.files)
   }
  }
}
</script>