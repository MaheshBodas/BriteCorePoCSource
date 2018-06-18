<template>
  <div class="app-container calendar-list-container">
    <el-container style="height: 500px; border: 1px solid #eee"> 
      <el-header style="height: 90px; border: 1px solid #eee">
        <rotating-display v-bind:helpTextArray="carouselhelptext"></rotating-display>
      </el-header>            
      <el-main style="height: 350px; border: 1px solid #eee">                 
        <el-form ref="risktypeForm" :model="selectRiskInstance" label-position="left" label-width="130px" style='width: 100%;align:left; margin-left:5px;'>
          <el-row :gutter="20">        
            <el-col :span="16">                                   
              <el-form-item label="Select Risk Type" size="mini" prop="risk_type_name">                
                  <risk-instance-list @change="selectRiskInstanceChanged" :selectedType="selectRiskInstance"></risk-instance-list>                                                
              </el-form-item>              
            </el-col>              
          </el-row> 
        </el-form>
        <el-form :model="riskobj" v-if="riskobj && riskobj.riskfields && riskobj.riskfields.length > 0" label-position="left" label-width="130px" style='width: 100%;align:left; margin-left:5px;'>          
          <el-row :gutter="20">    
            <el-col :span="8">   
              <el-form-item label="Risk Name" size="mini" prop="name">
                <el-input readonly v-model="riskobj.risk_name"></el-input>
              </el-form-item>                                 
            </el-col>    
            <el-col :span="8">   
              <el-form-item label="Risk Description" size="mini">
                <el-input readonly v-model="riskobj.risk_description"></el-input>
              </el-form-item>  
          </el-col>              
        </el-row>      
        <el-row :gutter="20" v-for="i in rowCount" :key="i">
          <el-col :span="8" v-for="entry in itemCountInRow(i)" :key="entry.id">
            <el-form-item label="riskobj" size="mini" :prop ="entry.risk_type_field_name">              
              <span slot="label">{{ entry.risk_type_field_name | capitalize }}</span>
              <risk-input v-bind:input_type="entry" is-readonly></risk-input>		
            </el-form-item>    
          </el-col>              
        </el-row>        
      </el-form>             
      <el-form v-if="riskobj && riskobj.riskfields && riskobj.riskfields.length === 0">
        <el-row :gutter="20">        
          <el-col :span="8">                                   
            <el-form-item label="Invaid Type Name or No Data found" size="mini" prop="risk_type_name">                                
            </el-form-item>                                               
          </el-col>              
        </el-row> 
      </el-form>
    </el-main>             
    </el-container>  
  </div>
</template>

<script>
// import RiskFieldTypeList from '@/components/RiskFieldTypeList'
import { mapGetters } from 'vuex'
import RiskInput from '@/components/RiskInput'
import RiskInstanceList from '@/components/RiskInstanceList'
import RotatingDisplay from '@/components/RotatingDisplay'
import { Risk, RiskCtrlConst } from './classes'
import { RiskFieldInstance } from '../RiskInput/classes'
export default {
  name: 'view-risk-ctrl',
  components: {
    // CurrencyInput,
    RiskInput,
    RiskInstanceList,
    RotatingDisplay
    // RiskFieldTypeList
    // CreateRiskTypeCtrl
    // RiskInputGrid
  },
  data: function() {
    return {
      itemsPerRow: 2,
      readonly: true,
      listLoading: true,
      carouselhelptext: [],
      selectRiskInstance: {
        riskinstance: ''
      },
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
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  computed: {
    ...mapGetters([
      'apiresult',
      'apiexception'
    ]),
    rowCount: function() {
      if (this.riskobj !== null) {
        return Math.ceil(this.riskobj.riskfields.length / this.itemsPerRow)
      } else {
        return 0
      }
    }
  },
  methods: {
    itemCountInRow: function(index) {
      return this.riskobj.riskfields.slice((index - 1) * this.itemsPerRow, index * this.itemsPerRow)
    },
    selectRiskInstanceChanged: function(selectedValue) {
      // this.resetRiskFormData()
      if (this.selectRiskInstance.riskinstance !== '') {
        this.fetchRiskInstanceData()
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
    fetchRiskInstanceData() {
      this.listLoading = true
      this.$store.dispatch('getRisk', this.selectRiskInstance.riskinstance).then(response => {
        if (this.apiresult === true) {
          this.resetRiskFormData()
          var riskdata = response
          var riskobj = riskdata[0]
          this.processRiskInstanceDataFromServer(riskobj)
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
    processRiskInstanceDataFromServer(riskinstance) {
      if (riskinstance && riskinstance.risk_riskfields) {
        console.log('riskinstance.risk_riskfields')
        console.log(riskinstance.risk_riskfields.length)
        var i
        // this.resetRiskFormData()
        this.riskobj.id = riskinstance.id
        this.riskobj.risktype = riskinstance.risktype
        this.riskobj.risk_type_name = riskinstance.risk_type_name
        this.riskobj.risk_name = riskinstance.risk_name
        this.riskobj.risk_description = riskinstance.risk_description
        // Populate RiskFields collection from data received from server
        var riskfields = riskinstance.risk_riskfields
        // this.riskobj = new Risk(id, risktype, risk_type_name, risk_name, risk_description, riskfields)
        for (i = 0; i < riskfields.length; i++) {
          // var rfid = riskfields[i].id
          var risktypefield = riskfields[i].risktypefield
          // var risk = riskfields[i].risk
          var risk_type_field_name = riskfields[i].risk_type_field_name
          var risk_type_field_enum = riskfields[i].risk_type_field_enum
          var risk_field_value = riskfields[i].risk_field_value
          if (risk_type_field_enum === 'currency') {
            risk_field_value = parseFloat(riskfields[i].risk_field_value)
          }
          var riskFieldInstance = new RiskFieldInstance(this.riskobj.risktype, risktypefield, risk_type_field_name, risk_type_field_enum, '', risk_field_value)
          // console.log(riskInstance)
          this.riskobj.riskfields.push(riskFieldInstance)
        }
      }
    },
    resetRiskFormData() {
      this.riskobj = new Risk()
      this.riskobj.risk_name = ''
      this.riskobj.risk_description = ''
      this.riskobj.riskfields = []
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