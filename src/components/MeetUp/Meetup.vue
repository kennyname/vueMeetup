<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
          indeterminate color="primary"
          :size="60"
          :width="3"
        >
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div class="headline red--text">{{ meetup.title }}</div>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <appEditMeetUp :meetup="meetup"></appEditMeetUp>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imgUrl"
            height="400px"
          >
          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date}} - {{ meetup.location }}</div>
            <div>
              <appEditMeetUpDate :meetup="meetup" v-if="userIsCreator"></appEditMeetUpDate>
              <appEditMeetUpTime :meetup="meetup" v-if="userIsCreator"></appEditMeetUpTime>
            </div>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <appRegisterDialog 
              :meetupId="meetup.id"
              v-if="userIsAuthenticated && !userIsCreator"
            >
            </appRegisterDialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadMeetup(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.meetup.createId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
