import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Meetups from '@/components/MeetUp/MeetUps'
import Meetup from '@/components/MeetUp/MeetUp'
import CreateMeetup from '@/components/MeetUp/CreateMeetUp'
import Profile from '@/components/User/profile'
import Signup from '@/components/User/signup'
import Signin from '@/components/User/signin'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      props: true, // 如果props被设置为true,route.params将会被设置为组件属性
      component: Meetup
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: CreateMeetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    }
  ],
  mode: 'history'
})
