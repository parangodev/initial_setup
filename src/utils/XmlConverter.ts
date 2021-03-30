import xml2js from 'xml2js'

async function xmlToObject(xml: any) {
  const parser = new xml2js.Parser({ explicitArray: true, explicitCharkey: true })
  const result = await parser.parseStringPromise(xml)
  return result
}

function objectToXML(xml: object) {
  const builder = new xml2js.Builder()
  return builder.buildObject(xml)
}

export { xmlToObject, objectToXML }
