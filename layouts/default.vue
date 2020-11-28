<template>
  <v-app>
    <div>
      <v-toolbar dark>
        <!--<v-toolbar-title>Nuxt Template</v-toolbar-title>-->
        <v-btn to="/" depressed nuxt>
          <v-icon medium>mdi-home</v-icon>
          Home
        </v-btn>
        <v-btn to="/docs" depressed nuxt>My Collabs</v-btn>
        <v-spacer></v-spacer>
        <div v-show="!isLogged">
          <v-btn depressed @click="signupDialog=true">
            <v-icon medium>mdi-account</v-icon>
            Sign Up
          </v-btn>
          <v-btn depressed @click="loginDialog=true">
            <v-icon medium>mdi-account</v-icon>
            Log In
          </v-btn>
        </div>
        <div v-show="isLogged">
          <v-btn depressed @click="logout">
            <v-icon medium>mdi-exit</v-icon>
            Log Out
          </v-btn>
        </div>

      </v-toolbar>
      <!-- Dialogs -->

      <v-dialog persistent
                max-width="600px"
                v-model="loginDialog">
        <v-card>
          <form @submit.prevent="login()">
            <v-card-title>
              <span class="headline">Log in</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="username"
                      label="Username"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="password"
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
                type="submit">Save
              </v-btn>
            </v-card-actions>
          </form>
        </v-card>
      </v-dialog>

      <v-dialog persistent
                max-width="600px"
                v-model="signupDialog">
        <v-card>
          <form @submit.prevent="signup">
            <v-card-title>
              <span class="headline">Sign Up</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sUsername"
                      label="Username"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      v-model="sPassword"
                      label="Password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="signupDialog = false">Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                type="submit">Register
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

import AuthService from "~/services/AuthService";
const axios = require('axios');

export default {
  name: "default",
  data() {
    return {username: "", password: "",sUsername: "", sPassword: "", loginDialog: false, signupDialog: false, isLogged: AuthService.isLogged(),error:[]}
  },
  methods: {
    async login() {
      try {
        await this.$auth.loginWith('local', {
          data: {
            username: this.username,
            password: this.password
          }
        }).then((value => {
          sessionStorage.setItem("token", value.data.access);
          this.isLogged = AuthService.isLogged();
          this.loginDialog = false;
        }));
      } catch (e) {
        this.error = e.response.data.message
      }
    },
    signup() {
      this.$axios.$post('/chat/account/register',{username:this.sUsername,password:this.sPassword}).then((value)=>{
        console.log(value);
      }).catch((error)=>{
        console.log(error)
      });
      this.signupDialog = false;
    },
    logout() {
      sessionStorage.removeItem("token");
      this.isLogged = AuthService.isLogged();
    }
  }
}
</script>
