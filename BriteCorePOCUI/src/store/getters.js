const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  apiresult: state => state.riskapi.apiresult,
  apiexception: state => state.riskapi.apiexception
}
export default getters
