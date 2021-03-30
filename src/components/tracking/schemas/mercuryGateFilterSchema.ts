export const mercuryGateFilterSchema: object = {
  bol_number: '$.MercuryGate.MasterBillOfLading[0].ReferenceNumbers[0].ReferenceNumber[?(@.$.type==="BOL")]._',
  customer_rate_total: '$.MercuryGate.MasterBillOfLading[0].PriceSheets[0].PriceSheet[?(@.$.type==="Charge"&&@.$.isSelected==="true")].Total[0]._',
  customer_scac: '$.MercuryGate.MasterBillOfLading[0].ReferenceNumbers[0].ReferenceNumber[?(@.$.type==="Customer SCAC")]._',
  scac: '$.MercuryGate.MasterBillOfLading[0].ReferenceNumbers[0].ReferenceNumber[?(@.$.type==="SCAC")]._',
  carrier_pickup_number: '$.MercuryGate.MasterBillOfLading[0].ReferenceNumbers[0].ReferenceNumber[?(@.$.type==="Carrier Pickup Number")]._',
  customer_acct_number: '$.MercuryGate.MasterBillOfLading[0].ReferenceNumbers[0].ReferenceNumber[?(@.$.type==="Customer Acct Number")]._',
  special_instructions: '$.MercuryGate.MasterBillOfLading[0].Comments[0].Comment[?(@.$.type==="SpecialInstructions")]._',
  carrier_id: '$.MercuryGate.MasterBillOfLading[0].Carriers[0].Carrier[0].CarrierId[0]._',
  carrier_name: '$.MercuryGate.MasterBillOfLading[0].Carriers[0].Carrier[0].CarrierName[0]._',
  mode: '$.MercuryGate.MasterBillOfLading[0].Carriers[0].Carrier[0].Mode[0]._',
  service_days: '$.MercuryGate.MasterBillOfLading[0].Carriers[0].Carrier[0].ServiceDays[0]._',
  distance: '$.MercuryGate.MasterBillOfLading[0].Carriers[0].Carrier[0].Distance[0]._',
  status: '$.MercuryGate.MasterBillOfLading[0].Status[0]._',
  owner: '$.MercuryGate.MasterBillOfLading[0].Owner[0]._',
  links: {
    _path: '$.MercuryGate.MasterBillOfLading[0].Links[0].Link',
    _properties: {
      type: '$.`$.type',
      url: '$.`$.url',
    }
  },
  events: {
    _path: '$.MercuryGate.MasterBillOfLading[0].Plan[0].Events[0].Event',
    _properties: {
      trackingMessages: {
        _path: '$.TrackingMessages',
        _properties: {
          shipmentStatus: {
            _path: '$.ShipmentStatus',
            _properties: {
              statusDetails: {
                _path: '$.StatusDetails[0].StatusDetail',
                _properties: {
                  code: '$.StatusCode[0]._',
                  type: '$.Event[0].$.`$.type',
                  actual: '$.Date[0]._',
                  earliest: '$.Event[0].Dates[0].Date[?(@.$.type==="earliest")]._',
                  latest: '$.Event[0].Dates[0].Date[?(@.$.type==="latest")]._',
                  planned: '$.Event[0].Dates[0].Date[?(@.$.type==="planned")]._'
                }
              }
            }
          } 
        }
      }
    }
  },
  trackingMessages: {
    _path: '$.MercuryGate.MasterBillOfLading[0].TrackingMessages[0].ShipmentStatus',
    _properties: {
      code: '$.StatusDetails[0].StatusDetail[0].StatusCode[0]._',
      actual: '$.StatusDetails[0].StatusDetail[0].Date[?(@.$.type==="actual")]._',
    }
  }
}
