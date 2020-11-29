<template>
  <div>
    <div v-if="this.$route.params.id % 3 == 0">
      <loop></loop>
    </div>
    <div v-if="this.$route.params.id % 3 == 1">
      <model3-d></model3-d>
    </div>
    <div v-if="this.$route.params.id % 3 == 2">
      <cube></cube>
    </div>
    <websocket></websocket>
  </div>
</template>

<script>
import Model3D from "~/components/model3D";
import Websocket from "~/components/websocket";

export default {
  name: "_id",
  components: {Websocket, Model3D}

}
</script>
