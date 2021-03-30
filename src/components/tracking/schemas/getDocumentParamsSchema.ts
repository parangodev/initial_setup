import { ObjectSchema, object, string } from '@hapi/joi'
import { DocumentTypesEnum } from '../../../enums/DocumentTypesEnum'

export const getDocumentParamsSchema: ObjectSchema = object({
  type: string().trim().required().valid(DocumentTypesEnum.BOL, DocumentTypesEnum.DELIVERY_RECEIPT, DocumentTypesEnum.SCALE_AR),
  bolNumber: string().trim().required()
})