<template>
  <v-app>
    <div>
      <v-toolbar dark>
        <!--<v-toolbar-title>Nuxt Template</v-toolbar-title>-->
        <!--<v-btn to="/" depressed nuxt>
          <v-icon medium>mdi-home</v-icon>
          Home
        </v-btn>-->
        <v-btn to="/docs" depressed nuxt>My Collabs</v-btn>
        <v-spacer></v-spacer>
        <div v-show="!isLogged">
          <v-btn depressed @click="signupDialog=true">
            <v-icon medium>mdi-account-plus</v-icon>
            Sign Up
          </v-btn>
          <v-btn depressed @click="loginDialog=true">
            <v-icon medium>mdi-account</v-icon>
            Log In
          </v-btn>
        </div>
        <div v-show="isLogged">
          <v-btn depressed @click="projectDialog=true">
            <v-icon medium>mdi-book</v-icon>
            Create Project
          </v-btn>
          <v-btn depressed @click="notDialog=true">
            <v-badge right color="secondary">
              <v-icon medium>mdi-bell-ring</v-icon>
              <span slot="badge"> 1 </span>
            </v-badge>
          </v-btn>
          <v-btn depressed @click="logout">Log out <v-icon>mdi-exit-to-app</v-icon>
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

      <v-dialog max-width="600px" v-model="notDialog">
        <v-card>
          <v-card-text>
            <!--for-->
            <v-banner two-line>
              <v-avatar
                slot="icon"
                color="deep-purple accent-4"
                size="40"
              >
                <v-icon
                  icon="mdi-lock"
                  color="white"
                >
                  mdi-lock
                </v-icon>
              </v-avatar>

              Three line text string example with two actions. One to two lines is preferable. Three lines should be
              considered the maximum string length on desktop in order to keep messages short and actionable.

              <template v-slot:actions>
                <v-btn
                  @click="acceptInvitation"
                  text
                  color="deep-purple accent-4"
                >Accept
                </v-btn>
                <v-btn
                  @click="rejectInvitation"
                  text
                  color="deep-purple accent-4"
                >Reject
                </v-btn>
              </template>
            </v-banner>

          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog max-width="600px" v-model="projectDialog">
        <v-card>
          <form method="post" @submit.prevent="createProject">
          <v-card-text>
            <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="projectName"
                      label="Project Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-container fluid>
                      <v-layout wrap>
                        <v-flex xs12>
                          <v-combobox multiple
                                      v-model="selectTags"
                                      label="Invite Users"
                                      append-icon
                                      chips
                                      deletable-chips
                                      class="tag-input"
                                      @keyup.tab="updateTags"
                                      @paste="updateTags">
                          </v-combobox>
                        </v-flex>
                      </v-layout>
                    </v-container>
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
              type="submit">Create
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
    return {
      selectTags:[],
      projectName: "",
      invite: [],
      username: "",
      password: "",
      sUsername: "",
      sPassword: "",
      loginDialog: false,
      signupDialog: false,
      notDialog: false,
      projectDialog: false,
      isLogged: AuthService.isLogged(),
      error: []
    }
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
      this.$axios.$post('/chat/account/register', {
        username: this.sUsername,
        password: this.sPassword
      }).then((value) => {
        console.log(value);
        this.signupDialog = false;
      }).catch((error) => {
        console.log(error)
      });
    },

    logout() {
      sessionStorage.removeItem("token");
      this.isLogged = AuthService.isLogged();
    },

    createProject(){
      console.log(this.selectTags,this.projectName);

      //Create Project
      /*this.$axios.$post('/chat/sessions/').then((value => {
        console.log(value)
      }));*/

      //Invite users
      if(this.selectTags.length > 1){
        this.$axios.$post('/').then((value => {
          console.log(value)
        }));
      }

      //Init Values
      this.projectDialog = false;
      this.projectName = "";
      this.selectTags = [];
    },

    acceptInvitation(){

    },

    rejectInvitation(){

    },
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    }
  }
}
</script>
