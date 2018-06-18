import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
import { Message } from 'element-ui'
import store from '../store'
// import { getToken } from '@/utils/auth'

// Create axios instance
/*
const service = axios.create({
  baseURL: process.env.BASE_API, // api of base_url
  timeout: 15000 // Request timeout
})
*/
const CSRF_COOKIE_NAME = 'csrftoken'
const CSRF_HEADER_NAME = 'X-CSRFToken'

const session = axios.create({
  xsrfCookieName: CSRF_COOKIE_NAME,
  xsrfHeaderName: CSRF_HEADER_NAME
})
// Request interceptor
session.interceptors.request.use(config => {
  // if (store.getters.token) {
  //  config.headers['X-Token'] = getToken() // Let each request carry a custom token Please modify it according to the actual situation
  // }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// Response interceptor
session.interceptors.response.use(
  response => {
    const res = response.data
    console.log(response)
    // TBD
    store.dispatch('ApiCallSuccess').then(() => {
      // Message.error('Verification failed, please log in again')
      // next({ path: '/login' })
    })
    // TBD
    return res
  },
  error => {
    console.log('err' + error)// for debug
    // TBD
    if (error.response.data) {
      var strDetailError = JSON.stringify(error.response.data)
      store.dispatch('ApiCallFail', strDetailError).then(() => {
      })
    }
    // TBD
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default session
