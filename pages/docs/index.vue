<template>
  <div>
    <v-container>

    </v-container>
  </div>
</template>

<script>
import Model3D from "~/components/model3D";
const md5 = require('md5');
export default {

  name: "index",
  components: {Model3D},
  data() {
    return {

    }
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      await this.$axios.$get('/chat/list_sessions/').then((value => {
        console.log(value);
      }))
    }
  }
}
</script>
