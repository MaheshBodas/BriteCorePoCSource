// import { login, logout, getInfo } from '@/api/login'
// import { login, logout, getAccountDetails } from '@/api/auth'
import auth from '@/api/auth'

const riskapi = {
  state: {
    apiresult: '',
    apiexception: ''
  },

  mutations: {
    SET_APIRESULT: (state, apiresult) => {
      console.log('inside SET_APIRESULT')
      state.apiresult = apiresult
      console.log(state.apiresult)
    },
    SET_APIEXCEPTION: (state, apiexception) => {
      state.apiexception = apiexception
    },
    SET_SUCCESS: (state, data) => {
      state.apiresult = data.apiresult
    }
  },

  actions: {
    ApiCallSuccess({ commit, state }, UserData) {
      console.log('Mutation ApiCallSuccess')
      commit('SET_APIRESULT', true)
      commit('SET_APIEXCEPTION', '')
    },
    ApiCallFail({ commit, state }, strDetailError) {
      console.log('Mutation ApiCallFail')
      console.log(strDetailError)
      commit('SET_APIRESULT', false)
      commit('SET_APIEXCEPTION', strDetailError)
    },
    // createRiskType risktypepostdata
    createRiskType({ commit }, risktypepostdata) {
      return new Promise((resolve, reject) => {
        auth.createRiskType(risktypepostdata).then(response => {
          const data = response
          console.log('createRiskType Response Data')
          console.log(data)
          resolve()
        }).catch(error => {
          console.log('Error in createRiskType')
          reject(error)
        })
      })
    },
    getRiskTypeKeys({ commit }) {
      return new Promise((resolve, reject) => {
        auth.getRiskTypeKeys().then(response => {
          const data = response
          console.log('getRiskTypeKeys Response Data')
          console.log(data)
          resolve(data)
        }).catch(error => {
          console.log('Error in getRiskTypeKeys')
          reject(error)
        })
      })
    },
    getRiskType({ commit }, risk_type_id) {
      return new Promise((resolve, reject) => {
        auth.getRiskType(risk_type_id).then(response => {
          const data = response
          console.log('getRiskType Response Data')
          console.log(data)
          resolve(data)
        }).catch(error => {
          console.log('Error in getRiskType')
          reject(error)
        })
      })
    },
    createRisk({ commit }, riskpostdata) {
      return new Promise((resolve, reject) => {
        auth.createRisk(riskpostdata).then(response => {
          const data = response
          console.log('createRisk Response Data')
          console.log(data)
          resolve()
        }).catch(error => {
          console.log('Error in createRisk')
          reject(error)
        })
      })
    },
    getRiskKeys({ commit }) {
      return new Promise((resolve, reject) => {
        auth.getRiskKeys().then(response => {
          const data = response
          console.log('getRiskKeys Response Data')
          console.log(data)
          resolve(data)
        }).catch(error => {
          console.log('Error in getRiskKeys')
          reject(error)
        })
      })
    },
    getRisk({ commit }, risk_id) {
      return new Promise((resolve, reject) => {
        auth.getRisk(risk_id).then(response => {
          const data = response
          console.log('getRisk Response Data')
          console.log(data)
          resolve(data)
        }).catch(error => {
          console.log('Error in getRisk')
          reject(error)
        })
      })
    },
    getRisks({ commit }, risk_type_id) {
      return new Promise((resolve, reject) => {
        auth.getRisks(risk_type_id).then(response => {
          const data = response
          console.log('getRisks Response Data')
          console.log(data)
          resolve(data)
        }).catch(error => {
          console.log('Error in getRisks')
          reject(error)
        })
      })
    }
  }
}

export default riskapi
