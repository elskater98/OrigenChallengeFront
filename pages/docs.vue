<template>
  <div>
    <v-container>
      <v-row>
        <v-col></v-col>
        <v-col>
          <v-row>
            <v-combobox
              solo
              v-model="comboboxSelect"
              :items="comboboxItems"
              outlined
              dense>
            </v-combobox>
          </v-row>

          <v-row>
            <v-checkbox
              v-model="checkbox1"
              :label="'Checkbox1'"
            ></v-checkbox>
            <v-checkbox
              v-model="checkbox2"
              :label="'Checkbox2'"
            ></v-checkbox>
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
      checkbox1:false,
      checkbox2:false,
      slider1:0,
      textarea1:"",
      comboboxSelect:[],
      comboboxItems:['Red','Blue','Green']
    }
  }
}
</script>

<style scoped>

</style>
