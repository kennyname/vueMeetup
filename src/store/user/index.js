import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    registerForMeetUp (state, payload) {
      const id = payload.id
      if (state.user.registerMeetUp.findIndex(meetup => meetup.id === id) >= 0) { // 已經register的直接return
        return
      }
      state.user.registerMeetUp.push(id)
      state.user.fbkeys[id] = payload.fbkey // 建立新屬性fbkeys => fbkeys{ dasdasfasgfs:sdfdsfsdfdsf}
    },
    unRegisterUserMeetUp (state, payload) {
      const registerMeetUp = state.user.registerMeetUp
      registerMeetUp.splice(registerMeetUp.findIndex(meetup => {
        return meetup.id === payload
      }), 1)
      Reflect.deleteProperty(state.user.fbkeys, payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    GoogleSignIn ({commit}) {
      commit('setLoading', true)
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().languageCode = 'zh-TW'
      firebase.auth().signInWithPopup(provider)
        .then(function (result) {
          commit('setLoading', false)
        })
      .catch(function (error) {
        commit('setLoading', false)
        console.log(error)
      })
    },
    facebookSignIn ({commit}) {
      commit('setLoading', true)
      var provider = new firebase.auth.FacebookAuthProvider()
      provider.addScope('user_birthday')
      firebase.auth().languageCode = 'zh-TW'
      provider.setCustomParameters({
        'display': 'popup'
      })
      firebase.auth().signInWithPopup(provider)
        .then(function (result) {
          commit('setLoading', false)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    registerForMeetUp ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registration')
        .push(payload)
        .then((data) => {
          commit('setLoading', false)
          commit('registerForMeetUp', {id: payload, fbkey: data.key})
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    unRegisterForMeetUp ({commit, getters, dispatch}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbkeys) {
        return
      }
      const fbkey = user.fbkeys[payload]
      firebase.database().ref('/users/' + user.id + '/registration/').child(fbkey).remove()
        .then(() => {
          commit('setLoading', false)
          commit('unRegisterUserMeetUp', payload)
          dispatch('loadRegisterMeetup', user.id)
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
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
            registerMeetUp: [],
            fbkeys: {}
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
            registerMeetUp: [],
            fbkeys: {}
          }
          commit('setUser', newUser)
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.log(err)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registerMeetUp: [], fbkeys: {}})
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registration/').once('value')
        .then(data => {
          const dataPairs = data.val()
          const registerdMeetup = []
          const swappedPairs = {}
          for (let key in dataPairs) {
            registerdMeetup.push(dataPairs[key])
            swappedPairs[dataPairs[key]] = key
          }
          const updateUser = {
            id: getters.user.id,
            registerMeetUp: registerdMeetup,
            fbkeys: swappedPairs
          }
          commit('setLoading', false)
          commit('setUser', updateUser)
        })
        .catch(err => {
          console.log(err)
        })
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
