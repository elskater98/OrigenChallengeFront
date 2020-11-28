<template>
  <div>

  </div>
</template>

<script>
import Model3D from "~/components/model3D";
const axios = require('axios');
export default {
  name: "_id",
  components: {Model3D},
  data(){
    return {
      checkbox1: true,
      checkbox2: true,
      slider: {label: 'slider', val: 350, color: 'red'},
      textarea1: "",
      subtitle: "Subtitle",
      header: "Header",
      summary: "",
      connection: null,
      sent_local: new Set()
    }
  },
  methods: {
    sendChange() {
      let msg = JSON.stringify(this.getChanges());
      this.sent_local.add(md5(msg));
      this.connection.send(msg);
    },
    getChanges() {
      return {
        message: {
          checkbox1: this.$data.checkbox1,
          checkbox2: this.$data.checkbox2,
          slider: {label: 'slider', val: this.$data.slider.val, color: 'red'},
          textarea1: this.$data.textarea1,
          subtitle: this.$data.subtitle,
          header: this.$data.header,
          summary: this.$data.summary
        }
      };
    }
  },
  created() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("wss://josalhor.ddns.net:7987/ws/chat/example/")
    let x = this;
    this.connection.onmessage = function (event) {
      let aux = JSON.parse(event.data);
      const res = md5(JSON.stringify(aux));
      if (!x.sent_local.has(res)){
        x.checkbox1 = aux.message.checkbox1;
        x.checkbox2 = aux.message.checkbox2;
        x.slider = aux.message.slider;
        x.textarea1 = aux.message.textarea1;
        x.header = aux.message.header;
        x.summary = aux.message.summary;
      }
    }

    this.connection.onopen = function (event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

  },
}
</script>
