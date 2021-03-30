import { Request, Response } from 'express'
import { HttpStatusCodesEnum } from '../../../enums/HttpStatusCodesEnum'
import { HttpStatusMessagesEnum } from '../../../enums/HttpStatusMessagesEnum'
import IResponse from '../../../utils/interfaces/Response'
import { sendXML } from '../../../utils/middlewares/bodyParser'
import InvoiceService from '../service/InvoiceService'

const invoiceService: InvoiceService = new InvoiceService()

export default class InvoiceController {

  async saveInvoiceFromSaleforce (req: Request, res: Response): Promise<any> {
    const data = req.body
    const response = await invoiceService.saveInvoice(data)

    return res.status(HttpStatusCodesEnum.OK).send(response)
  }
}