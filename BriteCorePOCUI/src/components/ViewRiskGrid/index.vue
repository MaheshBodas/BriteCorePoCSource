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
        <el-form v-if="riskinstances && riskinstances.length > 0" label-position="left"  style='width: 100%;align:left; margin-left:5px;'>          
          <el-table :data="riskinstances" v-loading="listLoading" element-loading-text="Give me some more time" border fit highlight-current-row
            style="width: 100%">       
            <el-table-column  label="Risk Name">
              <template slot-scope="scope">
                <span>{{scope.row.risk_name}}</span>
              </template>
            </el-table-column>             
            <el-table-column :key='columnName' v-for='(columnName, index) in columnNames' :label="columnName | capitalize">              
                <template slot-scope="scope">
                  <div v-if="scope.row.risk_riskfields[index].risk_type_field_enum === 'currency'">
                    {{ scope.row.risk_riskfields[index].risk_field_value | currencyFilter}}
                  </div>
                  <div v-else>
                    {{scope.row.risk_riskfields[index].risk_field_value}}
                  </div>
                </template>              
            </el-table-column>          
          </el-table>
        </el-form>
      <el-form v-if="!riskinstances">
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
import { mapGetters } from 'vuex'
import RiskTypeList from '@/components/RiskTypeList'
import RotatingDisplay from '@/components/RotatingDisplay'
import { RiskCtrlConst } from './classes'

export default {
  name: 'view-risk-grid',
  components: {
    RiskTypeList,
    RotatingDisplay
  },
  data: function() {
    return {
      listLoading: true,
      carouselhelptext: [],
      selectRiskType: {
        risktype: ''
      },
      riskinstances: null,
      columnNames: null
    }
  },
  created() {
    // this.fetchData()
    this.populateHelpText()
  },
  computed: {
    ...mapGetters([
      'apiresult',
      'apiexception'
    ])
  },
  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  filters: {
    capitalize: function(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    currencyFilter(curvalue) {
      if (arguments.length === 0) {
        return null
      }
      var floatVal = parseFloat(curvalue)
      return '$ ' + floatVal.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    }
  },
  methods: {
    selectRiskTypeChanged: function(selectedValue) {
      if (this.selectRiskType.risktype !== '') {
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
      this.$store.dispatch('getRisks', this.selectRiskType.risktype).then(response => {
        if (this.apiresult === true) {
          this.resetRiskFormData()
          this.riskinstances = response
          this.processRiskInstancesDataFromServer()
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
      this.riskinstances = null
      this.columnNames = []
    },
    processRiskInstancesDataFromServer() {
      if (this.riskinstances) {
        console.log('this.riskinstances')
        console.log(this.riskinstances.length)
        var i
        if (this.riskinstances && this.riskinstances.length > 0) {
          var riskinstance = this.riskinstances[0]
          if (riskinstance.risk_riskfields && riskinstance.risk_riskfields.length > 0) {
            var riskfields = riskinstance.risk_riskfields
            for (i = 0; i < riskfields.length; i++) {
              var risk_type_field_name = riskfields[i].risk_type_field_name
              this.columnNames.push(risk_type_field_name)
            }
          }
        }
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