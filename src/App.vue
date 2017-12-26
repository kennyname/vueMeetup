<template>
  <v-app>
    <v-navigation-drawer temporary fixed v-model="sideNav">
      <v-list>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title" 
          @click=""
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click=""  v-if="isAuthenticate" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Logout</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar class="red" dark>
      <v-toolbar-side-icon 
        @click.stop="sideNav=!sideNav"
        class="hidden-sm-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor:pointer;">DevMeetUp</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link"
        >
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        <v-btn flat v-if="isAuthenticate" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItem = [
          { icon: 'face', title: 'Sign Up', link: '/signup' },
          { icon: 'lock_open', title: 'Sign In', link: '/signin' }
        ]
        if (this.isAuthenticate) {
          menuItem = [
            { icon: 'supervisor_account', title: 'View MeetUp', link: '/meetups' },
            { icon: 'room', title: 'Organize MeetUp', link: '/meetup/new' },
            { icon: 'person', title: 'Profile', link: '/profile' }
          ]
        }
        return menuItem
      },
      isAuthenticate () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main';
</style>
