<template>
  <div class="dashboard-container">
    <div class="dashboard-text" v-if="isAdminUser">Hello I am admin user</div>
    <div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ]),
    isAdminUser: function() {
      var isAdminUser = false
      console.log('this.roles')
      console.log(this.roles)
      if (this.roles === 'admin') {
        isAdminUser = true
      }
      console.log('isAdminUser')
      console.log(isAdminUser)
      return isAdminUser
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
