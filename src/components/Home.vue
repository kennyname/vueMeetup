<template>
  <v-container>
    <v-layout>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular 
          indeterminate color="primary"
          :size="60"
          :width="3"
          v-if="loading"
        >
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-carousel style="cursor: pointer;" v-if="!loading">
          <v-carousel-item 
            style="cursor: pointer;"
            v-for="meetup in meetups" 
            :src="meetup.imgUrl" 
            :key="meetup.id"
            @click="GoMeetup(meetup.id)"
          >
            <div class="title">
              {{meetup.title}}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right mt-2">
        <v-btn large to="/meetups" class="info">Explore MeetsUp</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left mt-2">
        <v-btn large to="/meetup/new" class="info">Organize MeetsUp</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  export default {
    computed: {
      meetups () {
        return this.$store.getters.featureMeetups
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      GoMeetup (id) {
        this.$router.push('/meetups/' + id)
      }
    }
  }
</script>

<style scoped>
  .title{
    position: absolute;
    bottom: 50px;
    color: white;
    background-color: rgba(0,0,0,0.5);
    font-size: 2em;
    padding: 15px;
  }
</style>
