import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import riskapi from './modules/riskapi'
import auth from './modules/auth'
// import types from './modules/types'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    // types,
    riskapi,
    user
  },
  getters
})

export default store
