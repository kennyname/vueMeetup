<template>
  <v-dialog persistent v-model="registerDialog" width="350px">
    <v-btn class="primary" accent slot="activator">
      {{ userIsRegister ? 'UNREGISTER' : 'REGISTER'}}
    </v-btn>
    <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegister">Unregister from Meetups ?</v-card-title>
            <v-card-title v-else>Register for Meetups ?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title>You can always change your decision later</v-card-title>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-btn class="green--text darken-1" flat @click="onAgree">Confirm</v-btn>
              <v-btn class="red--text darken-1" flat @click="registerDialog=false">Cancel</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetupId'],
    data () {
      return {
        registerDialog: false
      }
    },
    computed: {
      userIsRegister () {
        return this.$store.getters.user.registerMeetUp.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0 // 因為找不到的話會回傳-1 找到的話會回傳所引值
      }
    },
    methods: {
      onAgree () {
        if (this.userIsRegister) {
          this.$store.dispatch('unRegisterForMeetUp', this.meetupId)
        } else {
          this.$store.dispatch('registerForMeetUp', this.meetupId)
        }
      }
    }
  }
</script>