<template>
  <div>
    <model3-d></model3-d>
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
