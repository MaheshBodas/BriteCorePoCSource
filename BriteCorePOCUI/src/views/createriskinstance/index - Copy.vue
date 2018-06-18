<template>
  <div id="app-container">
    <br/>
    <!-- <risk-input v-bind:input_type="risk"></risk-input>
    <risk-input-grid v-for="gridRow in gridData" :key="gridRow.name"
      v-bind:item="gridRow"
      v-bind:columns="gridColumns">
      :filter-key="searchQuery">
    </risk-input-grid> 
    <risk-input-grid
    :data="gridData"
    :columns="gridColumns">
  </risk-input-grid>
  <risk-field-type-list @change="selectChanged"></risk-field-type-list>
  <risk-field-type-list/>
  <create-risk-type-ctrl>
  </create-risk-type-ctrl> 
  <risk-type-list @change="selectChanged" :selectedType="newRiskTypeField"></risk-type-list>
  <risk-instance-list @change="selectChanged" :selectedType="newRiskInstance"></risk-instance-list>
  <create-risk-ctrl>
  </create-risk-ctrl> 
  <view-risk-ctrl>
  </view-risk-ctrl>
  --> 
  <create-risk-type-ctrl>
  </create-risk-type-ctrl>
	<!--         
  <risk-input-grid
    :data="gridData"
    :columns="gridColumns">   
  </risk-input-grid>
  -->
  </div>
</template>
<script>
// import RiskInput from '@/components/RiskInput'
// import CurrencyInput from '@/components/CurrencyInput'
import CreateRiskTypeCtrl from '@/components/CreateRiskTypeCtrl'
// import RiskFieldTypeList from '@/components/RiskFieldTypeList'
import RiskTypeList from '@/components/RiskTypeList'
import RiskInstanceList from '@/components/RiskInstanceList'
import CreateRiskCtrl from '@/components/CreateRiskCtrl'
import ViewRiskCtrl from '@/components/ViewRiskCtrl'
import ViewRiskGrid from '@/components/ViewRiskGrid'
// import RiskInputGrid from '@/components/RiskInputGrid'
// import { RiskInstance } from '@/components/RiskInput/classes'
export default {
  components: {
    // CurrencyInput,
    // RiskInput,
    // RiskFieldTypeList,
    RiskTypeList,
    RiskInstanceList,
    CreateRiskTypeCtrl,
    CreateRiskCtrl,
    ViewRiskCtrl,
    ViewRiskGrid
    // RiskInputGrid
  },
  /*
  data: function() {
    return {
      price: 1234
    }
  }
  /*
  data: function() {
    return {
      risk: new RiskInstance(7, 7, 2, 'Sum', 'job', 10000.00)
    }
  }
  */
  data: function() {
    return {
      newRiskTypeField: {
        id: undefined,
        risktype: '',
        risk_type_field_enum: 'text',
        risk_type_field_description: ''
      },
      newRiskInstance: {
        riskinstance: ''
      },
      gridColumns: ['id', 'risk_type_field_name', 'risk_type_field_enum'],
      gridData: [
        {
          'id': 1,
          'risktype': 1,
          'risk_type_field_name': 'model',
          'risk_type_field_enum': 'text',
          'risk_type_field_description': 'Model of Automobile'
        },
        {
          'id': 2,
          'risktype': 1,
          'risk_type_field_name': 'doors',
          'risk_type_field_enum': 'integer',
          'risk_type_field_description': 'Number of doors'
        },
        {
          'id': 3,
          'risktype': 1,
          'risk_type_field_name': 'amount',
          'risk_type_field_enum': 'number',
          'risk_type_field_description': 'Insurance Amount'
        },
        {
          'id': 4,
          'risktype': 1,
          'risk_type_field_name': 'issuedate',
          'risk_type_field_enum': 'date',
          'risk_type_field_description': 'License issued on date(MM/dd/yyyy)'
        }
      ]
    }
  },
  methods: {
    selectChanged: function(selectedValue) {
      alert('selectChanged on page')
      alert(selectedValue)
    }
  }
}
</script>