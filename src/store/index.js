import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    meetsupData: [
      {
        imgUrl: 'http://static6.businessinsider.com/image/58753f70ee14b6a27b8b4972/7-billion-dollar-mega-projects-that-will-transform-new-york-city-by-2035.jpg',
        title: 'New York',
        id: 'asdasdas12456461',
        date: new Date(),
        location: 'New York',
        description: 'New York !!!'
      },
      {
        imgUrl: 'http://www.businesseurope.org/wp-content/uploads/2017/03/paris.jpg',
        title: 'Paris',
        id: 'asdasdas12456451',
        date: new Date(),
        location: 'Paris',
        description: 'Paris !!!'
      }
    ],
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.meetsupData.push(payload)
    },
    setLoadMeetsUp (state, payload) {
      state.meetsupData = payload
    },
    setUser (state, payload) {
      state.user = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    loadMeetsUp ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('data').once('value')
        .then(data => {
          const meetsup = []
          const obj = data.val()// firebase 內建 val()是一個物件
          for (let i in obj) { // for...in是來用物件迴圈的
            meetsup.push({
              id: i,
              title: obj[i].title,
              description: obj[i].description,
              imgUrl: obj[i].imgUrl,
              location: obj[i].location
            })
          }
          commit('setLoadMeetsUp', meetsup)
          commit('setLoading', false)
        })
        .catch(err => {
          commit('setLoading', true)
          console.log(err)
        })
    },
    createMeetUp ({commit}, payload) {
      const meetup = {
        // id: payload.id, firebase會自動幫我們生成一組特殊id
        title: payload.title,
        description: payload.description,
        imgUrl: payload.imgUrl,
        location: payload.location,
        date: payload.date.toISOString()
      }
      firebase.database().ref('data').push(meetup)
        .then(data => {
          const key = data.key
          commit('createMeetup', {
            ...meetup, // 解構賦值
            id: key
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            user: user.uid,
            registerMeetUp: []
          }
          commit('setUser', newUser)
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.log(err)
        })
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            user: user.uid,
            registerMeetUp: []
          }
          commit('setUser', newUser)
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.log(err)
        })
    },
    clearError ({commit}) {
      commit('clearError')
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registerMeetUp: []})
    },
    logout ({commit}) {
      commit('setUser', null)
    }
  },
  getters: {
    loadMeetups (state) {
      return state.meetsupData.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featureMeetups (state, getters) {
      return getters.loadMeetups.slice(0, 5)
    },
    loadMeetup (state) {
      return (meetUpId) => {
        return state.meetsupData.find((meetup) => {
          return meetup.id === meetUpId
        })
      }
    },
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    loading (state) {
      return state.loading
    }
  }
})
