<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn accent slot="activator">
      Edit Date
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>Edit Meetup Date</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-date-picker v-model="editDate" style="width: 100%">
              <template slot-scope="{ save, cancel }">
                <v-btn class="blue--text" flat @click="onSaveChange">Save</v-btn>
                <v-btn class="blue--text" flat @click="editDialog=false">Close</v-btn>
              </template>
            </v-date-picker>
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
        editDate: null
      }
    },
    methods: {
      onSaveChange () {
        const newDate = new Date(this.meetup.date)
        const newDay = new Date(this.editDate).getUTCDate()
        const newMonth = new Date(this.editDate).getUTCMonth()
        const newYear = new Date(this.editDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch('updateCreateMeetup', {
          id: this.meetup.id,
          date: newDate
        })
      }
    },
    created () {
      // this.meetup.date 值 和下面的 new Date(this.meetup.date).toISOString()雖然一樣 但前者只是字串 如果用new date()的話不會變成物件也就不能操作setUTCdate等方法
      this.editDate = new Date(this.meetup.date).toISOString() // 初始化時間 datePicker Must use ISO 8601 format.
    }
  }
</script>