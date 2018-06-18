/* https://jsfiddle.net/bgzhw68m/405/ 
https://jsfiddle.net/z11fe07p/421/ */
<template>
  <div>    
    <div v-if="input_type.risk_type_field_enum === 'currency'">
      <div v-if="isReadonly===true">
        <currency-input v-model="input_type.risk_field_value" is-readonly></currency-input>
      </div>     
      <div v-else>
        <currency-input v-model="input_type.risk_field_value"></currency-input>
      </div>
    </div>
    <div v-else-if="input_type.risk_type_field_enum === 'integer'">
      <div v-if="isReadonly===true">
        <el-input-number v-model="input_type.risk_field_value" controls-position="right" :min="1"
        disabled>
      </el-input-number>
      </div>
      <div v-else>
        <el-input-number v-model="input_type.risk_field_value" controls-position="right" :min="1"
               @blur="intchange(input_type.risk_type_field_name, input_type.risk_field_value)">
        </el-input-number>
      </div>
    </div>
    <div v-else-if="input_type.risk_type_field_enum === 'float'">
      <div v-if="isReadonly===true">
        <el-input v-model.number="input_type.risk_field_value" controls-position="right" :min="1"
          readonly>
      </el-input>
      </div>
      <div v-else>
        <el-input v-model.number="input_type.risk_field_value" controls-position="right" :min="1"
               @blur="intchange(input_type.risk_type_field_name, input_type.risk_field_value)"
               @change="intchange(input_type.risk_type_field_name, input_type.risk_field_value)">
      </el-input>
      </div>
    </div>
    <div v-else-if="input_type.risk_type_field_enum === 'date'">
      <div v-if="isReadonly===true">
        <el-date-picker type="date" :placeholder="input_type.risk_type_field_name"  
                     format="MM/dd/yyyy"                     
                      key="date-input"
                      v-model="input_type.risk_field_value"
                      readonly>    
        </el-date-picker>
      </div>
      <div v-else>
        <el-date-picker type="date" @change="datechange(input_type.risk_type_field_name, input_type.risk_field_value)"
                     :placeholder="input_type.risk_type_field_name"  
                     format="MM/dd/yyyy"                     
                      key="date-input"
                      v-model="input_type.risk_field_value">    
        </el-date-picker>
      </div>
    </div>
    <div v-else>
      <div v-if="isReadonly===true">
        <el-input :placeholder="input_type.risk_type_field_name" v-model="input_type.risk_field_value" key="email-input"
               readonly>
      </el-input>
      </div>
      <div v-else>
        <el-input :placeholder="input_type.risk_type_field_name" v-model="input_type.risk_field_value" key="email-input"
               @blur="textchange(input_type.risk_type_field_name, input_type.risk_field_value)"
               @change="textchange(input_type.risk_type_field_name, input_type.risk_field_value)">
      </el-input>
      </div>
    </div>
  </div>
</template>
<script>
import { RiskFieldInstance } from './classes'
import CurrencyInput from '@/components/CurrencyInput'
export default {
  name: 'risk-input',
  components: {
    CurrencyInput
  },
  props: {
    input_type: RiskFieldInstance,
    isReadonly: Boolean,
    dataval: Object,
    value: Object
  },
  methods: {
    datechange(risk_type_field_name, dateval) {
      try {
        // console.log(risk_type_field_name)
        // console.log(dateval)
        // var vTemp = Date().toString()
        // this.dataval[val] = vTemp
        var vDate = dateval
        if (vDate != null || vDate !== '') {
          var curr_date = vDate.getDate()
          var curr_month = vDate.getMonth() + 1 // getMonth() is zero-based
          var curr_year = vDate.getFullYear()

          var vDateString = (curr_month > 9 ? '' : '0') + curr_month + '/' + (curr_date > 9 ? '' : '0') + curr_date + '/' + curr_year
          // vDateString = vDate.toString()
          // console.log('vDateString')
          // console.log(vDateString)
          this.dataval[risk_type_field_name] = vDateString
          this.input_type.risk_field_value = vDateString
        } else {
          this.dataval[risk_type_field_name] = ''
          this.input_type.risk_field_value = vDateString
        }
      } catch (err) {
        this.dataval[risk_type_field_name] = ''
        this.input_type.risk_field_value = ''
      }
    },
    intchange(risk_type_field_name, intval) {
      console.log(risk_type_field_name)
      console.log(intval)
      if (intval != null) {
        this.dataval[risk_type_field_name] = intval
      } else {
        this.dataval[risk_type_field_name] = ''
      }
    },
    textchange(risk_type_field_name, textval) {
      console.log(risk_type_field_name)
      console.log(textval)
      if (textval != null) {
        this.dataval[risk_type_field_name] = textval
      } else {
        this.dataval[risk_type_field_name] = ''
      }
    }
  }
}
</script>

<style scoped>
.input {
  border: 1px solid #888;
  font-size: 0.8rem;
  padding: 0.5rem;
}
</style>
