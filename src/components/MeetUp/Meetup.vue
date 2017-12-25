<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <div class="headline red--text">{{ meetup.title }}</div>
          </v-card-title>
          <v-card-media
            :src="meetup.imgUrl"
            height="400px"
          >
          </v-card-media>
          <v-card-text>
            <div class="info--text">{{ meetup.date | date}} - {{ meetup.location }}</div>
            <div>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="primary">Register</v-btn>
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
      }
    }
  }
</script>
