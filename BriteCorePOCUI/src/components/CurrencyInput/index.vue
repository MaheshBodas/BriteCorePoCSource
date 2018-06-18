/* https://jsfiddle.net/bgzhw68m/405/ */
<template>
  <div>
    <div v-if="isReadonly===true">
      <el-input type="text" v-model="displayValue" readonly/>
    </div>
    <div v-else>
      <el-input type="text" v-model="displayValue" @blur="isInputActive = false" @focus="isInputActive = true"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'currency-input',
  // props: ['value'],
  props: {
    isReadonly: Boolean,
    value: Number
  },
  data: function() {
    return {
      isInputActive: false
    }
  },
  computed: {
    displayValue: {
      get: function() {
        if (this.isInputActive) {
          // Cursor is inside the input field. unformat display value for user
          return this.value.toString()
        } else {
          // User is not modifying now. Format display value for user interface
          return '$ ' + this.value.toFixed(2).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
        }
      },
      set: function(modifiedValue) {
        // Recalculate value after ignoring "$" and "," in user input
        let newValue = parseFloat(modifiedValue.replace(/[^\d\.]/g, ''))
        // Ensure that it is not NaN
        if (isNaN(newValue)) {
          newValue = 0
        }
        // Note: we cannot set this.value as it is a "prop". It needs to be passed to parent component
        // $emit the event so that parent component gets it
        this.$emit('input', newValue)
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
