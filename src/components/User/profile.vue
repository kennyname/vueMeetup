<template>
  <v-container class="mt-1">
    <v-layout row>
      <v-flex xs12 sm12>
        <h2 class="grey--text">Your personal Meetups!</h2>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 md6 sm12 
        v-for="meet in meetup"
        :key="meet.id"
      >
        <v-card class="info mr-1 mb-1">
          <v-container>
            <v-layout row>
              <v-flex xs6 sm4 md4>
                <v-card-media
                  :src="meet.imgUrl"
                  height="130px"
                >
                </v-card-media>
              </v-flex>
              <v-flex xs8 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <div class="headline white--text mb-0">{{meet.title}}</div>
                    <span>{{meet.date | date}}</span>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/meetups/' + meet.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View
                  </v-btn>
                  <v-btn class="error small" @click="deletePersonalMeetup(meet.id)">Delete</v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row class="mt-5">
      <v-flex xs12 sm12>
        <h2 class="grey--text">Your Register Meetups!</h2>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12 md6 sm6 
        v-for="meet in registerMeetup"
        :key="meet.id"
      >
        <v-card class="info mr-1 mb-1">
          <v-container>
            <v-layout row>
              <v-flex xs6 sm4 md4>
                <v-card-media
                  :src="meet.imgUrl"
                  height="130px"
                >
                </v-card-media>
              </v-flex>
              <v-flex xs6 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <div class="headline white--text mb-0">{{meet.title}}</div>
                    <span>{{meet.date | date}}</span>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/meetups/' + meet.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View
                  </v-btn>
                  <appRegisterDialog :meetupId="meet.id">
                  </appRegisterDialog>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetup () {
        return this.$store.getters.loadPersonalMeetup
      },
      user () {
        return this.$store.getters.user
      },
      registerMeetup () {
        return this.$store.getters.registerMeetup
      }
    },
    methods: {
      deletePersonalMeetup (id) {
        this.$store.dispatch('deleteMeetup', id)
      }
    },
    created () {
      this.$store.dispatch('loadPersonalMeetupData', this.user.id)
      this.$store.dispatch('loadRegisterMeetup', this.user.id)
    }
  }
</script>

