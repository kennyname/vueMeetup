<template>
  <v-container class="mt-1">
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="grey--text">Create a MeetUp</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                required
                v-model="title"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="location"
                label="Location"
                id="location"
                required
                v-model="location"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="imgUrl"
                label="Image-URL"
                id="imgUrl"
                required
                v-model="imgUrl"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imgUrl" height="150">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="description"
                label="Description"
                id="description"
                required
                multi-line
                v-model="description"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
             <h2 class="grey--text mb-2">Choose Date and Time</h2>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-3">
            <v-flex xs12 sm6 offset-sm3>
              <v-date-picker landscape v-model="date"></v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row class="mb-3">
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker landscape format="24hr" v-model="time"></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" 
                  :disabled="!isValid"
                  @click="OnCreateMeetUp()"
              >
              Create MeetUp
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        title: '',
        description: '',
        location: '',
        imgUrl: '',
        date: new Date().toISOString(),
        time: new Date()
      }
    },
    computed: {
      isValid () {
        return this.title !== '' &&
              this.description !== '' &&
              this.location !== '' &&
              this.imgUrl !== ''
      },
      submitDate () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        }
        // } else {
        //   date.setHours(this.time.getHours())
        //   date.setMinutes(this.time.getMinutes())
        // }還沒用到
        return date
      }
    },
    methods: {
      OnCreateMeetUp () {
        if (!this.isValid) {
          return
        }
        const meetUpData = {
          id: 'dasd46841313fdsf',
          title: this.title,
          description: this.description,
          location: this.location,
          imgUrl: this.imgUrl,
          date: this.submitDate
        }
        this.$store.dispatch('createMeetUp', meetUpData)
        this.$router.push('/meetups')
      }
    }
  }
</script>
