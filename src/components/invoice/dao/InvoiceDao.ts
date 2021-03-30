import InvoiceItemModel from '../models/InvoiceItemModel'
import InvoiceModel from '../models/InvoiceModel'
import boom, { Boom } from '@hapi/boom'
import sequelize from '../../../config/dbConnection'
import { NumberAttributeValue } from 'aws-sdk/clients/dynamodbstreams'
import { NumberOfBytesType } from 'aws-sdk/clients/kms'

export default class InvoiceDao {
  async createInvoice (data: any): Promise<any> {
    const shipment = await this.getShipmentByBol(data.invoiceLines[0].bol)
    if (shipment) boom.notFound('There is no BOL')
    const invoice = new InvoiceModel()
    invoice.invoice_number = data.invoiceNumber
    invoice.invoice_date = data.invoiceDate
    invoice.invoice_due_date = data.invoiceDueDate
    invoice.total_amount = data.totalAmount
    invoice.balance_due_amount = data.blanceDueAmount
    invoice.payment_status = data.paymentStatus
    invoice.days_past_due = data.daysPastDue
    invoice.last_payment_date = data.lastPaymentDate
    invoice.invoice_pdf_url = data.invoicePDFURL
    invoice.audit_creation_date = new Date()
    invoice.audit_update_date = new Date()
    invoice.parent_id = shipment.parentid

    return invoice.save()
  }

  async createInvoiceItem (data: any, invoiceId: number): Promise<any> {
    const invoiceItem: InvoiceItemModel = new InvoiceItemModel()
    invoiceItem.bol = data.bol
    invoiceItem.shipment_number = data.shipmentNumber
    invoiceItem.shipment_sf_id = data.shipmentSFId
    invoiceItem.invoice_line_sf_id = data.invoiceLineSFId
    invoiceItem.freight_charges = data.freightCharges
    invoiceItem.insurance_charges = data.insuranceCharges
    invoiceItem.total_amount = data.totalAmount
    invoiceItem.invoice_id = invoiceId
    invoiceItem.audit_creation_date = new Date()
    invoiceItem.audit_update_date = new Date()
    return invoiceItem.save()
  }

  async getShipmentByBol (bol: string): Promise<any> {
    let query: string = `
      SELECT parent_id as parentId
      FROM tbl_shipment
      WHERE bol_identifier = ?
    `
    const [ results ] = await sequelize.query({
      query,
      values: [bol]
    })

    if (results.length === 0) throw boom.notFound('There is no BOL')

    return results[0]
  }
}
