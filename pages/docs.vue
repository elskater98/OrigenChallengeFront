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
                  <v-list-item-subtitle v-show="checkbox2">{{subtitle}}</v-list-item-subtitle>
                  {{ summary }}
                </v-list-item-content>
              </v-list-item>
            </v-card>
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
export default {
  name: "docs",
  data(){
    return {
      checkbox1:true,
      checkbox2:true,
      slider:{label:'slider',val:350,color:'red'},
      textarea1:"",
      subtitle:"subtitle",
      header:"Header",
      summary:"",
      connection:null
    }
  },
  created() {
    console.log("Starting connection to WebSocket Server")
    this.connection = new WebSocket("ws://josalhor.ddns.net:7987/ws/chat/example/")

    this.connection.onmessage = function (event) {
      console.log(event)
    }

    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
    }

  },
  methods:{
    sendChange(){
        this.connection.send(JSON.stringify(this.getChanges()));
    },
    getChanges(){
    return {message:{checkbox1:this.$data.checkbox1,
        checkbox2:this.$data.checkbox2,
        slider: {label:'slider',val:this.$data.slider.val,color:'red'},
        textarea1:this.$data.textarea1,
        subtitle:this.$data.subtitle,
        header:this.$data.header,
        summary:this.$data.summary}};
    }

  },
}
</script>

<style scoped>

</style>
