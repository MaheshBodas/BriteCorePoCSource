// import { login, logout, getInfo } from '@/api/login'
// import { login, logout, getAccountDetails } from '@/api/auth'
import auth from '@/api/auth'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_LOGIN_NAME: (state, name) => {
      state.login_name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // log in
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        auth.login(username, userInfo.password).then(response => {
          const data = response
          console.log('Login Data')
          console.log(data)
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_LOGIN_NAME', username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // Get user information
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        auth.getCurrentUser().then(response => {
          const userdata = response
          console.log('User Data')
          console.log(userdata)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetAccountDetails({ commit, state }) {
      const username = state.login_name
      return new Promise((resolve, reject) => {
        auth.getAccountDetails(username).then(response => {
          const userdata = response
          console.log('getAccountDetails response')
          // console.log(userdata[0])
          console.log(userdata)
          // const userDataObj = userdata.results[0]
          const userDataObj = userdata[0]
          console.log(userDataObj)
          console.log(userDataObj.is_superuser)
          if (userDataObj.is_superuser === true) {
            commit('SET_ROLES', 'admin')
            commit('SET_NAME', userDataObj.username)
            commit('SET_AVATAR', './static/admin_office.gif')
          } else {
            commit('SET_ROLES', 'editor')
            commit('SET_NAME', userDataObj.username)
            commit('SET_AVATAR', './static/editor.gif')
          }
          resolve()
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    ProcessAccountDetails({ commit, state }, UserData) {
      if (UserData) {
        if (UserData.is_superuser) {
          commit('SET_ROLES', 'admin')
          commit('SET_NAME', UserData.username)
          commit('SET_AVATAR', './assets/spining-cube.gif')
        } else {
          commit('SET_ROLES', 'editor')
          commit('SET_NAME', UserData.username)
          commit('SET_AVATAR', './assets/vertical-c.gif')
        }
      }
    },
    // Sign out
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        auth.logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // Front end
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
