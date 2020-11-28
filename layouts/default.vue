<template>
  <v-app>
    <div>
      <v-toolbar dark>
        <!--<v-toolbar-title>Nuxt Template</v-toolbar-title>-->
        <v-btn to="/" depressed nuxt><v-icon medium>mdi-home</v-icon>Home</v-btn>
        <v-btn to="/docs" depressed nuxt>My Collab</v-btn>
        <v-spacer></v-spacer>
        <v-btn depressed @click="loginDialog=true">
          <v-icon medium>mdi-account</v-icon>
          Log in
        </v-btn>
      </v-toolbar>
      <v-dialog persistent
                max-width="600px"
                v-model="loginDialog">
        <v-card>
          <form>
            <v-card-title>
              <span class="headline">Log in</span>
            </v-card-title>
            <v-card-text>
              <v-container>

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Email"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="loginDialog = false">Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="login">Save
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>
      <Nuxt/>
    </div>
  </v-app>
</template>

<script>
export default {
  name: "default",
  data() {
    return {email: "", password: "", loginDialog: false}
  },
  methods: {
    login() {
      //TODO: HTTP REQ
      //TODO: CHECK RESPONSE
      //TODO: SEND ERROR OR CLOSE DIALOG AND SAVE DATA.
      this.loginDialog = false;
    }
  }
}
</script>
