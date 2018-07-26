import Vuex from 'vuex'
import Vue from 'vue'
import Cookie from 'js-cookie'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user_info: {}
  },
  mutations: {
    setUserValue(state, value) {
      
      state.user_info = value
      Cookie.set('user_name', value.student_lastName + value.student_givenName)
    }
  }
})

export default store