<template>
  <div class="app-container calendar-list-container">
    <el-container style="height: 500px; border: 1px solid #eee"> 
      <el-header style="height: 90px; border: 1px solid #eee">
        <rotating-display v-bind:helpTextArray="carouselhelptext"></rotating-display>
      </el-header>            
      <el-main style="height: 350px; border: 1px solid #eee">                 
        <el-form ref="risktypeForm" :model="selectRiskType" label-position="left" label-width="130px" style='width: 100%;align:left; margin-left:5px;'>
          <el-row :gutter="20">        
            <el-col :span="16">                                   
              <el-form-item label="Select Risk Type" size="mini" prop="risk_type_name">                
                  <risk-type-list @change="selectRiskTypeChanged" :selectedType="selectRiskType"></risk-type-list>                                                
              </el-form-item>              
            </el-col>              
          </el-row> 
        </el-form>              
        <el-form :rules="propValidators_rules" ref="temp" :model="temp" v-if="temp.riskfields && temp.riskfields.length > 0" label-position="left" label-width="130px" style='width: 100%;align:left; margin-left:5px;'>          
          <el-row :gutter="20">    
            <el-col :span="8">   
              <el-form-item label="Risk Name" size="mini" prop="risk_name">
                <el-input  v-model="temp.risk_name"></el-input>
              </el-form-item>                                 
            </el-col>    
            <el-col :span="8">   
              <el-form-item label="Risk Description" size="mini">
                <el-input  v-model="temp.risk_description"></el-input>
              </el-form-item>  
          </el-col>              
        </el-row>      
        <el-row :gutter="20" v-for="i in rowCount" :key="i">
          <el-col :span="8" v-for="entry in itemCountInRow(i)" :key="entry.id">
            <el-form-item label="temp" size="mini" :prop ="entry.risk_type_field_name">              
              <span slot="label">{{ entry.risk_type_field_name | capitalize }}</span>
              <risk-input v-bind:input_type="entry" v-bind:dataval="temp"></risk-input>		
            </el-form-item>    
          </el-col>              
        </el-row>        
      </el-form>        
      <el-form v-if="temp.riskfields && temp.riskfields.length === 0">
        <el-row :gutter="20">        
          <el-col :span="8">                                   
            <el-form-item label="Invaid Type Name or No Data found" size="mini" prop="risk_type_name">                                
            </el-form-item>                                               
          </el-col>              
        </el-row> 
      </el-form>
    </el-main>
    <el-footer v-if="temp.riskfields && temp.riskfields.length > 0" style="text-align:right;font-size: 12px">
      <div style="padding: 10px;">      
        <el-button size="mini" type="primary" @click="createRiskTypeData">Submit</el-button>
      </div>
    </el-footer>            
    </el-container>  
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import RiskInput from '@/components/RiskInput'
import RiskTypeList from '@/components/RiskTypeList'
import RotatingDisplay from '@/components/RotatingDisplay'
import { RiskPostData, RiskCtrlConst } from './classes'
import { RiskFieldInstance } from '../RiskInput/classes'
import { RequiredValidatorBuilder, RequiredNumberValidatorBuilder } from './classes.js'
export default {
  name: 'create-risk-ctrl',
  components: {
    RiskInput,
    RiskTypeList,
    RotatingDisplay
  },
  data: function() {
    return {
      itemsPerRow: 2,
      tableKey: 0,
      listLoading: true,
      carouselhelptext: [],
      tempReset: {
        risk_name: '',
        risk_description: '',
        riskfields: []
      },
      temp: {},
      selectRiskType: {
        risktype: ''
      },
      propValidators_rules: {},
      riskobj: null,
      is_editing: false
    }
  },
  created() {
    // this.fetchData()
    this.populateHelpText()
  },
  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  computed: {
    ...mapGetters([
      'apiresult',
      'apiexception'
    ]),
    rowCount: function() {
      return Math.ceil(this.temp.riskfields.length / this.itemsPerRow)
    }
  },
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    itemCountInRow: function(index) {
      return this.temp.riskfields.slice((index - 1) * this.itemsPerRow, index * this.itemsPerRow)
    },
    selectRiskTypeChanged: function(selectedValue) {
      if (this.selectRiskType.risktype !== '') {
        this.fetchRiskFieldsData()
      } else {
        this.resetRiskFormData()
      }
    },
    populateHelpText() {
      var i
      for (i = 0; i < RiskCtrlConst.CarouselHelpText.length; i++) {
        this.carouselhelptext.push(RiskCtrlConst.CarouselHelpText[i])
      }
    },
    fetchRiskFieldsData() {
      // Populate RiskFields collection from data received from server
      this.listLoading = true
      this.$store.dispatch('getRiskType', this.selectRiskType.risktype).then(response => {
        if (this.apiresult === true) {
          this.resetRiskFormData()
          var risktypedata = response
          var risktypeobj = risktypedata[0]
          this.processRisktypeFieldOptionFromServer(risktypeobj)
          // Populate Prop validator map
          this.populateFieldPropValidatorArray()
          //
          this.listLoading = false
        }
      }).catch(() => {
        this.$notify({
          title: 'Error',
          message: this.apiexception,
          type: 'error',
          duration: 2000
        })
      })
    },
    resetRiskFormData() {
      this.riskobj = new RiskPostData()
      // this.temp = {}
      this.temp = this.tempReset
      this.temp.risk_name = ''
      this.temp.risk_description = ''
      this.temp.riskfields = []
      this.propValidators_rules = {}
      this.$nextTick(() => {
        if (this.$refs['temp'] != null) {
          this.$refs['temp'].clearValidate()
        }
      })
    },
    processRisktypeFieldOptionFromServer(risktypeobj) {
      if (risktypeobj && risktypeobj.risktype_risktypefields) {
        console.log('risktypeobj.risktype_risktypefields')
        console.log(risktypeobj.risktype_risktypefields.length)
        var risktypefieldoption = risktypeobj.risktype_risktypefields
        var i
        for (i = 0; i < risktypefieldoption.length; i++) {
          var risktype = risktypefieldoption[i].risktype
          var risktypefield = risktypefieldoption[i].id
          var risk_type_field_name = risktypefieldoption[i].risk_type_field_name
          var risk_type_field_enum = risktypefieldoption[i].risk_type_field_enum
          var risk_type_field_description = risktypefieldoption[i].risk_type_field_description
          var risk_field_value = ''
          if (risk_type_field_enum === 'currency' ||
          risk_type_field_enum === 'float') {
            risk_field_value = 0
          } else if (risk_type_field_enum === 'integer') {
            risk_field_value = 1
          }

          var riskInstance = new RiskFieldInstance(risktype, risktypefield, risk_type_field_name, risk_type_field_enum, risk_type_field_description, risk_field_value)
          this.temp.riskfields.push(riskInstance)
          this.temp[risk_type_field_name] = risk_field_value
        }
      }
    },
    populateFieldPropValidatorArray() {
      var oValidatorBuilder = null
      const propValidators = []
      this.propValidators_rules = []
      for (const v of this.temp.riskfields) {
        oValidatorBuilder = null
        if (v.risk_type_field_enum === 'text') {
          oValidatorBuilder = new RequiredValidatorBuilder(v.risk_type_field_name, 'blur')
        } else if (v.risk_type_field_enum === 'integer' || v.risk_type_field_enum === 'float') {
          oValidatorBuilder = new RequiredNumberValidatorBuilder(v.risk_type_field_name, 'blur')
        } else if (v.risk_type_field_enum === 'date') {
          oValidatorBuilder = new RequiredValidatorBuilder(v.risk_type_field_name, 'change')
        }
        if (oValidatorBuilder != null) {
          var ovalidationEntry = oValidatorBuilder.build()
          propValidators.push(ovalidationEntry)
          oValidatorBuilder = null
        }
      }
      // console.log(propValidators)
      oValidatorBuilder = new RequiredValidatorBuilder('risk_name', 'blur')
      if (oValidatorBuilder != null) {
        ovalidationEntry = oValidatorBuilder.build()
        propValidators.push(ovalidationEntry)
        oValidatorBuilder = null
      }
      const propValidatorsTypeKeyValue = propValidators.reduce((acc, cur) => {
        acc[cur.key] = cur.obj
        return acc
      }, {})
      this.propValidators_rules = propValidatorsTypeKeyValue
      // console.log(propValidatorsTypeKeyValue)
    },
    processRiskFields() {
      this.riskobj.risktype = this.selectRiskType.risktype
      this.riskobj.risk_name = this.temp.risk_name
      this.riskobj.risk_description = this.temp.risk_description
      for (const v of this.temp.riskfields) {
        this.riskobj.addRiskField(v.risktypefield, v.risk_field_value)
      }
    },
    createRiskTypeData() {
      this.$refs['temp'].validate((valid) => {
        if (valid) {
          if (this.temp.riskfields.length === 0) {
            this.$notify({
              title: 'Failure',
              message: 'You must add Risk Field(s)',
              type: 'error',
              duration: 2000
            })
            return
          }
          this.processRiskFields()
          // Post Risk Type object to server
          console.log('Posting data to server')
          var strPostData = JSON.stringify(this.riskobj)
          console.log(strPostData)
          // TBD
          this.$store.dispatch('createRisk', this.riskobj).then(response => {
            if (this.apiresult === true) {
              this.selectRiskTypeChanged(this.selectRiskType.risktype)
              this.$notify({
                title: 'Success',
                message: 'Risk created successfully',
                type: 'success',
                duration: 2000
              })
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
        }
      })
    }
  },
  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    // background-color: #B3C0D1;
    'riskfield-focus': function(el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>
<style scoped>
  .el-header {        
    line-height: 30px;
  }  
  .el-aside {
    color: #333;
  }
  @import url("https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.0/theme-chalk/index.css")
</style>