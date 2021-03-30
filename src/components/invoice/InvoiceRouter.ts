import { Router } from 'express'
import { catchErrors } from '../../utils/middlewares/errorHandlers'
import { validateSchemaBody } from '../../utils/middlewares/validationSchema'
import InvoiceController from './controller/InvoiceController'
import { invoiceShema } from './schemas/invoiceSchema'

const router: Router = Router()
const invoiceController: InvoiceController = new InvoiceController()

router.post(
  '/',
  validateSchemaBody(invoiceShema),
  catchErrors(invoiceController.saveInvoiceFromSaleforce)
)

module.exports = router