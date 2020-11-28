<template>
  <div>
    <v-container>
      <v-simple-table>
        <template v-slot:default>
          <thead>
          <tr >
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Calories
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="item in list_sessions" :key="item.session_id"  @click="selectItem(item)">
            <td>{{ item.shared_as }}</td>
            <td>{{ item.session_id }}</td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
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
    return {list_sessions:[]}
  },
  created () {
    this.fetch()
  },
  methods: {
    async fetch () {
      await this.$axios.$get('/chat/list_sessions/').then((value => {
        this.list_sessions = value;
      }))
    },
    selectItem (item) {
      this.$route.push('/docs')

    }
  }
}
</script>
