// import session from './session'
import session from '@/utils/request'

export default {
  login(username, password) {
    return session.post('/auth/login/', { username, password })
  },
  logout() {
    return session.post('/auth/logout/', {})
  },
  createAccount(username, password1, password2, email) {
    return session.post('/registration/', { username, password1, password2, email })
  },
  changeAccountPassword(password1, password2) {
    return session.post('/auth/password/change/', { password1, password2 })
  },
  sendAccountPasswordResetEmail(email) {
    return session.post('/auth/password/reset/', { email })
  },
  resetAccountPassword(uid, token, new_password1, new_password2) { // eslint-disable-line camelcase
    return session.post('/auth/password/reset/confirm/', { uid, token, new_password1, new_password2 })
  },
  getCurrentUser() {
    return session.get('/auth/user/')
  },
  getAccountDetails(username) {
    return session.get('/riskapi/v1/users/?username=' + username)
  },
  updateAccountDetails(data) {
    return session.patch('/auth/user/', data)
  },
  verifyAccountEmail(key) {
    return session.post('/registration/verify-email/', { key })
  },
  // Risk API related functions
  createRiskType(risktypepostdata) {
    return session.post('/riskapi/v1/risktypes/', risktypepostdata)
  },
  createRisk(riskpostdata) {
    return session.post('/riskapi/v1/risks/', riskpostdata)
  },
  getRiskType(risk_type_id) {
    return session.get('/riskapi/v1/risktypes/?id=' + risk_type_id)
  },
  getRiskTypeKeys() {
    return session.get('/riskapi/v1/risktypekeys/')
  },
  getRisk(risk_id) {
    return session.get('/riskapi/v1/risks/?id=' + risk_id)
  },
  getRiskKeys() {
    return session.get('/riskapi/v1/riskkeys/')
  },
  getRisks(risk_type_id) {
    return session.get('/riskapi/v1/risks/?id=' + risk_type_id)
  }
  // Risk API related functions
}
