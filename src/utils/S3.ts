import S3, { GetObjectRequest } from 'aws-sdk/clients/s3'
import envVars from '../config/config'
import util from 'util'

const s3 = new S3()
const asyncUpload = util.promisify(s3.upload.bind(s3))
const asyncGetFile = <(params: GetObjectRequest) => any> util.promisify(s3.getObject.bind(s3))

/**
 * 
 * @param file
 * @param filename 
 * @returns true if file was stored correctly
 */
export const storeFileInS3Bucket = async (file: Buffer, filename: string): Promise<boolean> => {
  const params = {
    Key: filename,
    Body: file,
    Bucket: envVars.AWS_S3_BUCKET,
    ContentType : 'application/pdf'
  }
  try {
    const resp = await asyncUpload(params)
    if(!resp) return false
    return true
  } catch (err) {
    return false
  }
}

/**
 * 
 * @param filename 
 */
export const getFileStoredInS3Bucket = async (filename: string): Promise<Buffer | null> => {
  const params = {
    Key: filename,
    Bucket: envVars.AWS_S3_BUCKET,
  }
  try {
    const resp = await asyncGetFile(params)
    if(!resp) return null
    return resp.Body
  } catch (err) {
    return null
  }
}