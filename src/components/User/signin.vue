<template>
  <v-container class="mt-2">
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3>
        <appAlert @closeTab="closeTab" :text="error.message"></appAlert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="onSignIn">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="email"
                      label="E-mail"
                      id="email"
                      v-model="email"
                      type="email"
                      required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required
                    >
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit"
                      :disabled="loading"
                      :loading="loading"
                      class="success"
                    >
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                      Sign In
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
              <v-layout row>
                <v-flex xs12>
                  <v-btn type="submit"
                  :disabled="loading"
                  :loading="loading"
                  @click="onGoogleSignIn"
                  class="error"
                >
                    <v-icon left>fa-google-plus</v-icon>
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                    Login with google
                  </v-btn>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <v-btn type="submit"
                  :disabled="loading"
                  :loading="loading"
                  @click="onFacebookSignIn"
                  class="primary"
                >
                    <v-icon left>fa-facebook-square</v-icon>
                    <span slot="loader" class="custom-loader">
                      <v-icon light>cached</v-icon>
                    </span>
                    Login with facebook
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      error () {
        return this.$store.getters.error
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    watch: {
      user (value) {
        if (value !== null && value !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignIn () {
        this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
      },
      closeTab () {
        this.$store.dispatch('clearError')
      },
      onGoogleSignIn () {
        this.$store.dispatch('GoogleSignIn')
      },
      onFacebookSignIn () {
        this.$store.dispatch('facebookSignIn')
      }
    }
  }
</script>




