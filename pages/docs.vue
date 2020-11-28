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
          <v-row>
        {{this.$data}}
          </v-row>
        </v-col>
        <v-col>
          <v-row>
            <v-slider
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
              v-model="checkbox1"
              :label="'Header'"
            ></v-checkbox>
            <v-checkbox style="margin-left: 10%"
                        v-model="checkbox2"
                        :label="'Subtitle'"
            ></v-checkbox>
          </v-row>
          <v-row>
            <v-textarea
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
      summary:""
    }
  },
  methods:{
    sendChange(){

    },

    getChanges(){

    }

  }
}
</script>

<style scoped>

</style>
