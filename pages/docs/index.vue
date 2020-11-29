<template>
  <div>
    <v-container>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Created Date
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in sessions" :key="item.session_id" @click="selectItem(item)">
            <td>{{ item.name }}</td>
            <td>{{ item.date_created }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-container>
  </div>
</template>

<script>
import Model3D from "~/components/model3D";
import Websocket from '../../components/websocket.vue';

const md5 = require('md5');
export default {

  name: "index",
  components: {Model3D, Websocket},
  data() {

    return {sessions: []}
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      await this.$axios.$get('/chat/sessions/').then((value => {
        this.sessions = value;
      }))

    },
    selectItem(item) {
      let route = this.$route.name + '/' + item.session_id;
      this.$router.push({path: route});
    }
  }
}
</script>
