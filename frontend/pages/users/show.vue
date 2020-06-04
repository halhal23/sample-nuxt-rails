<template>
  <div>
    <h1>{{ member }}</h1>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['member'])
  }
}
</script>