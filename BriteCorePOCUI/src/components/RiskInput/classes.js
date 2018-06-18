export class RiskFieldInstance {
  constructor(risktype, risktypefield, risk_type_field_name, risk_type_field_enum, risk_type_field_description, risk_field_value) {
    this.risktype = risktype
    this.risktypefield = risktypefield
    this.risk_type_field_name = risk_type_field_name
    this.risk_type_field_enum = risk_type_field_enum
    this.risk_type_field_description = risk_type_field_description
    this.risk_field_value = risk_field_value
  }
}

export class RiskTypeField {
  constructor(id, risktype, risk_type_field_name, risk_type_field_enum, risk_type_field_description) {
    this.id = id
    this.risktype = risktype
    this.risk_type_field_name = risk_type_field_name
    this.risk_type_field_enum = risk_type_field_enum
    this.risk_type_field_description = risk_type_field_description
  }
}

export class RiskType {
  constructor(id, risk_type_name, risk_type_description, risktype_risktypefields) {
    this.id = id
    this.risk_type_name = risk_type_name
    this.risk_type_description = risk_type_description
    this.risktype_risktypefields = risktype_risktypefields.slice(0)
  }
}

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
  constructor(id, risktype, risk_type_name, risk_name, risk_description, risk_riskfields) {
    this.id = id
    this.risk_type_name = risk_type_name
    this.risk_name = risk_name
    this.risk_description = risk_description
    this.risk_riskfields = risk_riskfields.slice(0)
  }
}
/*
{
  "id": 1,
  "risktype": 1,
  "risk_type_name": "Automobile",
  "risk_name": "Toyota 1",
  "risk_description": "Toyota 1 Risk policy",
  "risk_riskfields": [
      {
          "id": 1,
          "risktypefield": 1,
          "risk": 1,
          "risk_type_field_name": "model",
          "risk_type_field_enum": "text",
          "risk_field_value": "TYT1000"
      },
      {
          "id": 2,
          "risktypefield": 2,
          "risk": 1,
          "risk_type_field_name": "doors",
          "risk_type_field_enum": "integer",
          "risk_field_value": "4"
      },
      {
          "id": 3,
          "risktypefield": 3,
          "risk": 1,
          "risk_type_field_name": "amount",
          "risk_type_field_enum": "number",
          "risk_field_value": "1000.00"
      },
      {
          "id": 4,
          "risktypefield": 4,
          "risk": 1,
          "risk_type_field_name": "issuedate",
          "risk_type_field_enum": "date",
          "risk_field_value": "11/01/2004"
      }
  ]
}

{
  "id": 1,
  "risk_type_name": "Automobile",
  "risk_type_description": "Type for Automobile Risk",
  "risktype_risktypefields": [
      {
          "id": 1,
          "risktype": 1,
          "risk_type_field_name": "model",
          "risk_type_field_enum": "text",
          "risk_type_field_description": "Model of Automobile"
      },
      {
          "id": 2,
          "risktype": 1,
          "risk_type_field_name": "doors",
          "risk_type_field_enum": "integer",
          "risk_type_field_description": "Number of doors"
      },
      {
          "id": 3,
          "risktype": 1,
          "risk_type_field_name": "amount",
          "risk_type_field_enum": "number",
          "risk_type_field_description": "Insurance Amount"
      },
      {
          "id": 4,
          "risktype": 1,
          "risk_type_field_name": "issuedate",
          "risk_type_field_enum": "date",
          "risk_type_field_description": "License issued on date(MM/dd/yyyy)"
      }
  ]
}
*/
