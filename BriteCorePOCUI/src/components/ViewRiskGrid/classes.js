export class RiskField {
  constructor(id, risktypefield, risk, risk_type_field_name, risk_type_field_enum, risk_field_value) {
    this.id = id
    this.risktypefield = risktypefield
    this.risk = risk
    this.risk_type_field_name = risk_type_field_name
    this.risk_type_field_enum = risk_type_field_enum
    this.risk_field_value = risk_field_value
  }
}
export class Risk {
  constructor(id, risktype, risk_type_name, risk_name, risk_description, riskfields) {
    this.id = id
    this.risktype = risktype
    this.risk_type_name = risk_type_name
    this.risk_name = risk_name
    this.risk_description = risk_description
    this.riskfields = []
  }
}
export class RiskCtrlConst {
}
RiskCtrlConst.CarouselHelpText = [
  {
    'id': 1,
    'text': 'User can view Risk Instances using this form'
  },
  {
    'id': 2,
    'text': 'Select appropriate Risk Type from dropdown box.'
  },
  {
    'id': 3,
    'text': 'Screen will show all Risks and associated instance fields in tabular format.'
  }
]
