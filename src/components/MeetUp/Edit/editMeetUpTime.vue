<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Time
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Time</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-time-picker v-model="editTime" style="width: 100%" format="24hr">
              <template slot-scope="{ save, cancel }">
                <v-btn class="blue--text" flat @click="onSaveChange">Save</v-btn>
                <v-btn class="blue--text" flat @click="editDialog=false">Close</v-btn>
              </template>
            </v-time-picker>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        editDialog: false,
        editTime: null
      }
    },
    methods: {
      onSaveChange () {
        const newDate = new Date(this.meetup.date)
        const hours = this.editTime.match(/^(\d+)/)[0]
        const minutes = this.editTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updateCreateMeetup', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    created () {
      this.editTime = new Date(this.meetup.date)
    }
  }
</script>