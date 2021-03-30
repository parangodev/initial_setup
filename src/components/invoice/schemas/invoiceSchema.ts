import { ObjectSchema, object, string, number, array, date } from '@hapi/joi'

export const invoiceShema: ObjectSchema = object(
{
	'invoiceNumber': string().trim().min(1).required(), // String
	'invoiceDate': string().trim().min(1).required(), // Date
	'invoiceDueDate': string().trim().min(1).required(), // Date
	'totalAmount': number().positive().allow(0),// Float
	'blanceDueAmount': number().positive().allow(0), // Float
	'paymentStatus': string().trim(), // String
	'daysPastDue': number().positive(), // Int
	'lastPaymentDate': string().trim(), // Date
  'invoicePDFURL': string().trim().min(1).required(),
	'invoiceLines': array().items(object().keys({
			'bol': string().trim().min(1).required(), // String
			'shipmentNumber': string().trim().min(1).required(), // String
			'shipmentSFId': string().trim().min(1).required(), // Date
			'invoiceLineSFId': string().trim().min(1).required(), // String
			'freightCharges': number().positive().allow(0), // References
			'insuranceCharges': number().positive().allow(0), // Float
			'totalAmount': number().positive().allow(0) // Float
	}))
})
