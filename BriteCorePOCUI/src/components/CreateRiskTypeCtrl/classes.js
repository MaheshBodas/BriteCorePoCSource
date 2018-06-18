export class RiskTypeFieldData {
  constructor(risk_type_field_name, risk_type_field_enum, risk_type_field_description) {
    this.risk_type_field_name = risk_type_field_name
    this.risk_type_field_enum = risk_type_field_enum
    this.risk_type_field_description = risk_type_field_description
  }
}

export class RiskTypeData {
  constructor(risk_type_name, risk_type_description) {
    this.risk_type_name = risk_type_name
    this.risk_type_description = risk_type_description
    this.risktype_risktypefields = []
  }
  resetRiskTypeData() {
    this.risk_type_name = ''
    this.risk_type_description = ''
    this.risktype_risktypefields = []
  }
  addRiskTypeField(risk_type_field_name, risk_type_field_enum, risk_type_field_description) {
    var risktypedataObj = new RiskTypeFieldData(risk_type_field_name, risk_type_field_enum, risk_type_field_description)
    this.risktype_risktypefields.push(risktypedataObj)
  }
}
export class RiskTypeCtrlConst {
}
RiskTypeCtrlConst.CarouselHelpText = [
  {
    'id': 1,
    'text': 'Admin User can define Risk types.'
  },
  {
    'id': 2,
    'text': 'Specify Risk Type name and description.'
  },
  {
    'id': 3,
    'text': 'Click Add Risk Type Field button to define Risk type fields.'
  },
  {
    'id': 4,
    'text': 'Post Risk type after adding / editing Risk type fields.'
  }
]
