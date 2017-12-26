// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.css'
import App from './App'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import alert from './components/share/alert'

Vue.use(Vuetify)
Vue.filter('date', DateFilter)
Vue.config.productionTip = false
Vue.component('appAlert', alert)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyA6kLPgNmzQUDg_DY0PzKhsc6Lcrv4Bmjk',
      authDomain: 'meetups-fe306.firebaseapp.com',
      databaseURL: 'https://meetups-fe306.firebaseio.com',
      projectId: 'meetups-fe306',
      storageBucket: 'meetups-fe306.appspot.com'
    })
  }
})
