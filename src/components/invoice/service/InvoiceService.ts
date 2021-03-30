import { createImmediatelyInvokedFunctionExpression } from 'typescript'
import InvoiceItemModel from '../models/InvoiceItemModel'
import InvoiceModel from '../models/InvoiceModel'
import InvoiceDao from '../dao/InvoiceDao'

const invoiceDao: InvoiceDao = new InvoiceDao()

export default class InvoiceService {
  async saveInvoice (data: any): Promise<any> {
    let isNew = true
    let invoice: InvoiceModel
    let invoiceItemArray: Array<any> = []
    const invoiceItems: Array<any> = data.invoiceLines
    if (invoiceItems.length === 0) throw Error()
    if (isNew) {
      invoice = await invoiceDao.createInvoice(data)
      await Promise.all(invoiceItems.map(async item => {
        const invoiceItem = await invoiceDao.createInvoiceItem(item, invoice.id)
        invoiceItemArray.push(invoiceItem)
      }))
    } else {
      invoice = await invoiceDao.createInvoice(data)

      invoiceItems.map(async item => {
        const invoiceItem = await invoiceDao.createInvoiceItem(item, invoice.id)
        invoiceItemArray.push({
          invoiceLineId: invoiceItem.id,
          bol: invoiceItem.bol,
          shipmentNumber: invoiceItem.shipment_number,
          shipmentSFId: invoiceItem.shipment_sf_id, 
          invoiceLineSFId: invoiceItem.invoice_line_sf_id
        })
      })
    }
    return {
      'success': 'Success',
      'invoiceId': invoice.id,
      'invoiceLines': invoiceItemArray
    }
  }
}
