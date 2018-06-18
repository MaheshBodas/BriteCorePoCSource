/* https://jsfiddle.net/bgzhw68m/405/ */
<template> 
  <el-select v-model="selectedType.riskinstance" size="mini" @change="selectChanged" clearable placeholder="Select RiskInstance">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.text"
      :value="item.value">
    </el-option>
  </el-select>  
</template> 

<script>
import { mapGetters } from 'vuex'
window.riskinstanceoptions = [
  { id: 1, risk_name: 'Mercedes 111', risk_description: 'Risk policy for Mercedes 111' },
  { id: 2, risk_name: 'Toyota 1', risk_description: 'Risk policy for Toyota' }
]
export default {
  name: 'risk-instance-list',
  props: {
    preSelect: String,
    selectedType: Object
  },
  computed: {
    ...mapGetters([
      'apiresult',
      'apiexception'
    ])
  },
  data: function() {
    return {
      // value: '',
      options: []
    }
  },
  /*
   watch: {
     preSelect: function(val) {
       // alert('In watch')
       this.value = this.preSelect
       this.selectedType.risk_type_field_enum = this.preSelect
     }
   },
   */
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      // this.value = this.preSelect
      // this.selectedType.risk_type_field_enum = this.preSelect
      this.selectedType.riskinstance = ''
      var riskinstanceoptions = []
      // TBD Original
      /*
      var i
      for (i = 0; i < window.riskinstanceoptions.length; i++) {
        this.options.push({ text: window.riskinstanceoptions[i].risk_name, value: window.riskinstanceoptions[i].id })
      }
      */
      // TBD Original
      // TBD
      this.$store.dispatch('getRiskKeys').then(response => {
        if (this.apiresult === true) {
          riskinstanceoptions = response
          var i
          // write response
          console.log('getRiskKeys in RiskList')
          console.log(riskinstanceoptions)
          for (i = 0; i < riskinstanceoptions.length; i++) {
            this.options.push({ text: riskinstanceoptions[i].risk_name, value: riskinstanceoptions[i].id })
          }
        }
      }).catch(() => {
        this.$notify({
          title: 'Error',
          message: this.apiexception,
          type: 'error',
          duration: 2000
        })
      })
      // TBD
    },
    selectChanged: function(value) {
      // alert('Emitting change event')
      // alert(value)
      this.$emit('change', value)
    }
  }
}
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.0/theme-chalk/index.css")
</style>
