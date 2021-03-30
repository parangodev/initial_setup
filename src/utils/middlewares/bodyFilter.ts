import { Request, Response, NextFunction } from 'express'
import { JSONPath } from 'jsonpath-plus'
import pointer from 'json-pointer'

function filterRequest(filterSchema: object) {
  return async (req: Request, res: Response, next: NextFunction) => {
    req.body = filtrator(req.body, filterSchema)
    next()
  }
}

function filtrator(body: object, filterSchema: object) {
  let filteredObject = Object.assign({}, filterSchema)
  const rawLeafProperties = pointer.dict(filterSchema)
  // @ts-ignore
  const leafProperties = Object.keys(rawLeafProperties).reduce((acumm, element) => {
    return element.match(/\/_properties/)
      ? { ...acumm }
      // @ts-ignore
      : { ...acumm, [element]: rawLeafProperties[element] }
  }, {})
  for (const leafPropertie in leafProperties) {
    // @ts-ignore
    const propertyValue = JSONPath({ path: leafProperties[leafPropertie], json: body })
    if (
      leafPropertie.endsWith('_path') &&
      pointer.has(filterSchema, leafPropertie.slice(0, -6).concat('/_properties'))
    ) {
      const subObjectPointer = leafPropertie.slice(0, -6)
      const subSchema = pointer.get(filterSchema, subObjectPointer.concat('/_properties'))
      const subFilteredArray = propertyValue[0].map((element: object) => {
        return filtrator(element, subSchema)
      })
      pointer.set(filteredObject, subObjectPointer, subFilteredArray ? subFilteredArray : undefined)
    } else {
      pointer.set(
        filteredObject,
        leafPropertie,
        propertyValue.length > 0 ? propertyValue[0] : undefined
      )
    }
  }
  return filteredObject
}

export { filterRequest }
