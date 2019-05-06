import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Contacts from '@/components/Contacts'
import AddContact from '../components/AddContact'
import EditContact from '../components/EditContact'
import SuiVue from 'semantic-ui-vue'

Vue.use(SuiVue)
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Contacts
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts,
      children: [
        { path: '/addContact', component: AddContact, name: 'addContact' },
        { path: '/editContact/:userId', component: EditContact, name: 'editContact' }
      ],
      meta:{
        showModal:true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
