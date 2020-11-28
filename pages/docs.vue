<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-row>
            <v-card
              class="mx-auto"
              :width="slider.val"
              outlined>
              <v-list-item three-line>
                <v-list-item-content>
                  <v-list-item-title v-show="checkbox1" class="headline mb-1">
                    {{ header }}
                  </v-list-item-title>
                  <v-list-item-subtitle v-show="checkbox2">{{ subtitle }}</v-list-item-subtitle>
                  {{ summary }}
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-row>
          <v-row>
            <model3-d></model3-d>
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-slider
              @change="sendChange"
              v-model="slider.val"
              :label="slider.label"
              :thumb-color="slider.color"
              max="450"
              min="250"
              thumb-label
            ></v-slider>
          </v-row>
          <v-row>
            <v-checkbox
              @change="sendChange"
              v-model="checkbox1"
              :label="'Header'"
            ></v-checkbox>
            <v-checkbox style="margin-left: 10%"
                        v-model="checkbox2"
                        :label="'Subtitle'"
                        @change="sendChange"
            ></v-checkbox>
          </v-row>
          <v-row>
            <v-text-field v-model="header" label="Header"></v-text-field>
          </v-row>
          <v-row>
            <v-text-field v-model="subtitle" label="Subtitle"></v-text-field>
          </v-row>
          <v-row>
            <v-textarea
              @keyup="sendChange"
              filled
              name="input-7-4"
              label="Filled textarea"
              v-model="summary"
            ></v-textarea>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Model3D from "~/components/model3D";
const md5 = require('md5');
export default {

  name: "docs",
  components: {Model3D},
  data() {
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
    this.connection = new WebSocket("ws://josalhor.ddns.net:7987/ws/chat/example/")
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

<style scoped>

</style>
