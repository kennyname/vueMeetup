import Vue from 'vue'
import Vuex from 'vuex'
import meetup from './meetup/index'
import user from './user/index'
import share from './share/index'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    meetup,
    user,
    share
  }
})
