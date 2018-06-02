import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user_info: {}
  },
  mutations: {
    setUserValue(state, value) {
      console.log(value)
      state.user_info = value
    }
  }
})

export default store