import { ObjectSchema, object, string } from '@hapi/joi'

export const bolNumberSchema: ObjectSchema = object({
  bolNumber: string().trim().required()
})