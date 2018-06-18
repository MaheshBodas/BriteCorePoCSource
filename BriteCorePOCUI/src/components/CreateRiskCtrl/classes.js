export class RiskFieldPostData {
  constructor(risktypefield, risk_field_value) {
    this.risktypefield = risktypefield
    this.risk_field_value = risk_field_value
  }
}

export class RiskPostData {
  constructor(risktype, risk_name, risk_description) {
    this.risktype = risktype
    this.risk_name = risk_name
    this.risk_description = risk_description
    this.risk_riskfields = []
  }
  resetRiskData() {
    this.risktype = ''
    this.risk_name = ''
    this.risk_description = ''
    this.risk_riskfields = []
  }
  addRiskField(risktypefield, risk_field_value) {
    var riskdataObj = new RiskFieldPostData(risktypefield, risk_field_value)
    this.risk_riskfields.push(riskdataObj)
  }
}

export class RequiredFieldValidator {
  constructor(propName, triggerType) {
    this.prop_name = propName
    this.trigger_type = triggerType
    this.reqiredValidatorObj = null
    this.validationArray = null
    this.validationEntry = null
    //
    // doors: [{ required: true, message: 'door is required', trigger: 'blur' },
    // { type: 'number', message: 'doors must be a number' }],
    //
  }
}

export class RequiredNumberFieldValidator extends RequiredFieldValidator {
  constructor(prop_name, trigger_type) {
    super(prop_name, trigger_type)
    this.numberValidatorObj = null
  }
  getValidationArray() {
    var validationArray = []
    validationArray = super.getValidationArray()
    validationArray.push(this.numberValidatorObj)
    return validationArray
  }
}

export class RequiredValidatorBuilder {
  constructor(propName, triggerType) {
    this.propName = propName
    this.triggerType = triggerType
    this.propValidator = new RequiredFieldValidator(this.propName, this.triggerType)
  }
  addValidatorObject() {
    this.propValidator = new RequiredFieldValidator(this.propName, this.triggerType)
  }
  buildValidationArray() {
    this.propValidator.validationArray = []
    this.propValidator.reqiredValidatorObj = { required: true, message: `${this.propValidator.prop_name} is required`, trigger: this.propValidator.trigger_type }
    this.propValidator.validationArray.push(this.propValidator.reqiredValidatorObj)
    // console.log(this.propValidator.validationArray)
    return this.propValidator.validationArray
  }
  buildValidationObjectEntry() {
    this.propValidator.validationEntry = { 'key': this.propValidator.prop_name, 'obj': this.propValidator.validationArray }
  }
  build() {
    this.addValidatorObject()
    this.buildValidationArray()
    this.buildValidationObjectEntry()
    var ovalidationEntry = this.getValidationObjectEntry()
    return ovalidationEntry
  }
  getValidationObjectEntry() {
    return this.propValidator.validationEntry
  }
}
export class RequiredNumberValidatorBuilder extends RequiredValidatorBuilder {
  addValidatorObject() {
    this.propValidator = new RequiredNumberFieldValidator(this.propName, this.triggerType)
  }
  buildValidationArray() {
    this.numberValidatorObj = { type: 'number', message: `${this.propValidator.prop_name} must be a number` }
    this.propValidator.validationArray = super.buildValidationArray()
    this.propValidator.validationArray.push(this.numberValidatorObj)
  }
}

export class RiskCtrlConst {
}
RiskCtrlConst.CarouselHelpText = [
  {
    'id': 1,
    'text': 'User can create Risk Instance based on Risk types.'
  },
  {
    'id': 2,
    'text': 'Select appropriate Risk Type from dropdown box.'
  },
  {
    'id': 3,
    'text': 'Fill up all Risk Instance fields and submit form.'
  },
  {
    'id': 4,
    'text': 'Admin user can define Risk Types. Contact admin in case of any issues.'
  }
]
export default { RequiredFieldValidator }
