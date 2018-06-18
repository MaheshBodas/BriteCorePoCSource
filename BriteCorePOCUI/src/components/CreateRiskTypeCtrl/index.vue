<template>
  <div class="app-container calendar-list-container">
  <el-container style="height: 500px;width:100%; border: 1px soclid #eee">
    <div v-if="isAdminUser" style="height: 500px;width:100%; border: 1px soclid #eee">
      <el-header style="height: 90px; border: 1px solid #eee">
        <rotating-display v-bind:helpTextArray="carouselhelptext"></rotating-display>
      </el-header>       
      <el-main style="height: 350px; border: 1px solid #eee">  
          <el-form :rules="risktype_rules" ref="risktypeForm" :model="risktypepostdata" label-position="left" label-width="130px" style='width: 100%;align:left; margin-left:5px;'>            
            <el-row :gutter="20">
              <el-col :span="8">                   
                  <el-form-item label="Type Name" size="mini" prop="risk_type_name">
                    <el-input v-model="risktypepostdata.risk_type_name"></el-input>
                  </el-form-item>                                     
              </el-col>
              <el-col :span="8">                   
                  <el-form-item label="Type Description" size="mini">
                    <el-input v-model="risktypepostdata.risk_type_description"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="5">
              <el-col :span="8">
                <div style="padding: 5px;">                                  
                  <el-button size="mini"  @click="handleCreate" type="primary" icon="el-icon-edit">Add Type Field</el-button>                    
                </div>
              </el-col>
            </el-row>          
          </el-form>
        <el-row :gutter="20">        
          <el-col :span="16">                          
            <el-table :key='tableKey' :data="risktypefields" v-if="risktypefields.length > 0" v-loading="listLoading" element-loading-text="Give me some more time" border fit highlight-current-row
                  style="width: 100%">        
              <el-table-column min-width="150px" label="Field Name">
                <template slot-scope="scope">
                  <span  @click="handleUpdate(scope.row)">{{scope.row.risk_type_field_name}}</span>          
                </template>
              </el-table-column>
              <el-table-column min-width="150px" label="Field Description">
                <template slot-scope="scope">
                  <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.risk_type_field_description}}</span>          
                </template>
              </el-table-column>
              <el-table-column min-width="150px" label="Field Enum" >
                <template slot-scope="scope">
                  <span class="link-type" @click="handleUpdate(scope.row)">{{scope.row.risk_type_field_enum}}</span>          
                </template>
              </el-table-column>
              <el-table-column align="center" label="Action" width="230" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">Edit</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row)">Delete
                  </el-button>
                </template>
              </el-table-column>
            </el-table>              
            <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
                <el-form :rules="risktypefield_rules" ref="risktypefieldForm" :model="newRiskTypeField" label-position="left" label-width="120px" style='width: 400px; margin-left:50px;'>
                  <el-form-item label="Name" size="mini" prop="risk_type_field_name">
                    <el-input v-if="dialogStatus=='create'" v-model="newRiskTypeField.risk_type_field_name" @blur="setLowerCase"></el-input>
                    <el-input v-else :disabled="true" v-model="newRiskTypeField.risk_type_field_name"></el-input>
                  </el-form-item>
                  <el-form-item label="Type" size="mini" prop="risk_type_field_enum">              
                    <risk-field-type-list :selectedType="newRiskTypeField"/>              
                  </el-form-item>        
                  <el-form-item label="Description" size="mini">
                    <el-input v-model="newRiskTypeField.risk_type_field_description"></el-input>
                  </el-form-item>        
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false" size="mini">Cancel</el-button>
                  <el-button v-if="dialogStatus=='create'" size="mini" type="primary" @click="createRiskTypeFieldData">Confirm</el-button>            
                  <el-button v-else type="primary" size="mini" @click="updateRiskTypeFieldData">Confirm</el-button>            
                </div>
            </el-dialog>  
          </el-col>
        </el-row>  
      </el-main>
      <el-footer style="text-align:right;font-size: 12px">
          <div style="padding: 10px;">      
            <el-button size="mini" type="primary" @click="createRiskTypeData">Submit</el-button>
          </div>
      </el-footer>
    </div>
    <div v-else style="height: 500px;width:100%; border: 1px soclid #eee" class="dashboard-text">      
        You do not have permission to access this page. Please contact Site Admin.
    </div>   
    </el-container>  
  </div>
</template>

<script>
import RiskFieldTypeList from '@/components/RiskFieldTypeList'
import RotatingDisplay from '@/components/RotatingDisplay'
import { RiskTypeData, RiskTypeCtrlConst } from './classes'
import { mapGetters } from 'vuex'
// import { createRiskType } from '../models/riskapi'
// import auth from '@/api/auth'
export default {
  name: 'create-risk-type-ctrl',
  computed: {
    ...mapGetters([
      'apiresult',
      'apiexception',
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
  },
  components: {
    // CurrencyInput,
    // RiskInput,
    RiskFieldTypeList,
    RotatingDisplay
    // CreateRiskTypeCtrl
    // RiskInputGrid
  },
  data: function() {
    return {
      tableKey: 0,
      listLoading: true,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: 'Edit',
        create: 'Create'
      },
      risktypefield_rules: {
        risk_type_field_enum: [{ required: true, message: 'Risk Field Type is required', trigger: 'change' }],
        risk_type_field_name: [{ required: true, message: 'Risk Field Type name is required', trigger: 'blur' }]
      },
      risktype_rules: {
        risk_type_name: [{ required: true, message: 'Risk Type name is required', trigger: 'blur' }]
      },
      tempReset: {
        risk_name: '',
        risk_description: '',
        riskfields: []
      },
      temp: {
        'risk_type_name': 'Automobile2',
        'risk_type_description': 'Automobile created via UI',
        'risktype_risktypefields': [{ 'risk_type_field_name': 'model', 'risk_type_field_enum': 'text', 'risk_type_field_description': 'Model of automobile' }]
      },
      risktypefields: [],
      risktypepostdata: null,
      carouselhelptext: [],
      // new_risk_type_field_name: '',
      // new_risk_type_field_enum: '',
      // new_risk_type_field_description: '',
      // newRiskTypeField: {},
      newRiskTypeField: {
        id: undefined,
        risk_type_field_name: '',
        risk_type_field_enum: 'text',
        risk_type_field_description: ''
      },
      selectedType: {
        risk_type_field_enum: 'text'
      },
      is_editing: false
    }
  },
  created() {
    this.populateHelpText()
    this.fetchData()
  },
  filters: {
    pluralize: function(n) {
      return n === 1 ? 'item' : 'items'
    }
  },
  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    fetchData() {
      this.risktypepostdata = new RiskTypeData()
      // this.newRiskTypeFieldData = new RiskTypeFieldData()
      this.listLoading = false
    },
    populateHelpText() {
      var i
      for (i = 0; i < RiskTypeCtrlConst.CarouselHelpText.length; i++) {
        this.carouselhelptext.push(RiskTypeCtrlConst.CarouselHelpText[i])
      }
    },
    setLowerCase() {
      this.newRiskTypeField.risk_type_field_name = this.newRiskTypeField.risk_type_field_name.toLowerCase()
    },
    isDuplicateRiskTypeField: function() {
      var isDuplicateRiskTypeField = true
      // var value = this.newRiskTypeField.risk_type_field_name.toLowerCase()
      var value = this.newRiskTypeField.risk_type_field_name
      var iIndex = this.risktypefields.findIndex((node) => node.risk_type_field_name === value)
      if (iIndex === -1) {
        isDuplicateRiskTypeField = false
      }
      return isDuplicateRiskTypeField
    },
    addRiskTypeField: function() {
      var bRiskTypeFieldAdded = false
      var bIsDuplicateRiskTypeField = this.isDuplicateRiskTypeField()
      this.newRiskTypeField.id = new Date().getTime()
      if (bIsDuplicateRiskTypeField === false) {
        this.risktypefields.push(this.newRiskTypeField)
        bRiskTypeFieldAdded = true
      }
      return bRiskTypeFieldAdded
    },
    editRiskTypeField() {
      // var bRiskTypeFieldEdited = false
      for (const v of this.risktypefields) {
        if (v.id === this.newRiskTypeField.id) {
          const index = this.risktypefields.indexOf(v)
          this.risktypefields.splice(index, 1, this.newRiskTypeField)
          break
        }
      }
    },
    selectChangedAdd: function(selectedValue) {
      // alert('selectChanged')
      // alert(selectedValue)
      this.newRiskTypeField.risk_type_field_enum = selectedValue
    },
    resetRiskFieldType() {
      this.newRiskTypeField = {
        id: undefined,
        risk_type_field_name: '',
        risk_type_field_enum: 'text',
        risk_type_field_description: ''
      }
    },
    handleCreate() {
      this.resetRiskFieldType()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['risktypefieldForm'].clearValidate()
      })
    },
    createRiskTypeFieldData() {
      this.$refs['risktypefieldForm'].validate((valid) => {
        if (valid) {
          var bIsRiskTypeFieldAdded = this.addRiskTypeField()
          if (bIsRiskTypeFieldAdded) {
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: 'Risk Type Field added to collection',
              type: 'success',
              duration: 2000
            })
          } else {
            this.$notify({
              title: 'Error',
              message: 'Duplicate Risk Type Field',
              type: 'error',
              duration: 2000
            })
          }
        }
      })
    },
    handleUpdate(row) {
      this.newRiskTypeField = Object.assign({}, row) // copy obj
      // this.temp.timestamp = new Date(this.temp.timestamp)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['risktypefieldForm'].clearValidate()
      })
    },
    updateRiskTypeFieldData() {
      this.$refs['risktypefieldForm'].validate((valid) => {
        if (valid) {
          this.editRiskTypeField()
          this.dialogFormVisible = false
          this.$notify({
            title: 'Success',
            message: 'Risk Type Field updated in collection',
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    handleDelete(row) {
      // this.risktypefields.splice(this.risktypefields.indexOf(risktypefield), 1)
      const index = this.risktypefields.indexOf(row)
      this.risktypefields.splice(index, 1)
      this.$notify({
        title: 'Success',
        message: 'Successfully deleted',
        type: 'success',
        duration: 2000
      })
    },
    resetRiskTypeFormData() {
      this.risktypefields = []
      this.risktypepostdata.resetRiskTypeData()
    },
    processRiskTypeFields() {
      for (const v of this.risktypefields) {
        this.risktypepostdata.addRiskTypeField(v.risk_type_field_name, v.risk_type_field_enum, v.risk_type_field_description)
      }
    },
    createRiskTypeData() {
      this.$refs['risktypeForm'].validate((valid) => {
        if (valid) {
          if (this.risktypefields.length === 0) {
            this.$notify({
              title: 'Failure',
              message: 'You must add Risk Type Field(s)',
              type: 'error',
              duration: 2000
            })
            return
          }
          this.processRiskTypeFields()
          // Post Risk Type object to server
          console.log('Posting data to server')
          var strPostData = JSON.stringify(this.risktypepostdata)
          console.log(strPostData)
          this.$store.dispatch('createRiskType', this.risktypepostdata).then(() => {
            if (this.apiresult === true) {
              this.$notify({
                title: 'Success',
                message: 'RiskType Created successfully',
                type: 'success',
                duration: 2000
              })
              this.resetRiskTypeFormData()
            }
          }).catch(() => {
            this.$notify({
              title: 'Error',
              message: this.apiexception,
              type: 'error',
              duration: 2000
            })
          })
        }
      })
    }
  },
  // a custom directive to wait for the DOM to be updated
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    // background-color: #B3C0D1;
    'risktypefield-focus': function(el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>
<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/element-ui/2.4.0/theme-chalk/index.css")
</style>