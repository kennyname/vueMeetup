import * as firebase from 'firebase'

export default {
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
    ]
  },
  mutations: {
    createMeetup (state, payload) {
      state.meetsupData.push(payload)
    },
    setLoadMeetsUp (state, payload) {
      state.meetsupData = payload
    },
    updateMeetup (state, payload) {
      const editMeetup = state.meetsupData.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        editMeetup.title = payload.title
      }
      if (payload.description) {
        editMeetup.description = payload.description
      }
      if (payload.date) {
        editMeetup.date = payload.date
      }
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
              location: obj[i].location,
              createId: obj[i].createId,
              date: obj[i].date
            })
          }
          commit('setLoadMeetsUp', meetsup)
          commit('setLoading', false)
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
    },
    createMeetUp ({commit, getters}, payload) {
      const meetup = {
        // id: payload.id, firebase會自動幫我們生成一組特殊id
        title: payload.title,
        description: payload.description,
        location: payload.location,
        date: payload.date.toISOString(),
        createId: getters.user.id
      }
      let key
      let imgUrl
      firebase.database().ref('data').push(meetup)
        .then(data => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.')) // abc.jpg 會回傳.jpg(檔名)
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(filedata => {
          console.log(filedata)
          imgUrl = filedata.metadata.downloadURLs[0]
          firebase.database().ref('data').child(key).update({test: imgUrl})
          return firebase.database().ref('data').child(key).update({imgUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup, // 解構賦值
            id: key,
            imgUrl: imgUrl
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateCreateMeetup ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('data').child(payload.id).update(updateObj)
        .then(() => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(err => {
          console.log(err)
          commit('setLoading', false)
        })
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
    }
  }
}
