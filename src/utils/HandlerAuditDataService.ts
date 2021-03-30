import AWS from 'aws-sdk'
import SQS from 'aws-sdk/clients/sqs'
import envVars from '../config/config'
import { IAuditDataDto } from './interfaces/IAuditDataDto'
import { MessageAttributeMap } from 'aws-sdk/clients/sns'

AWS.config.update({ region: envVars.AWS_REGION })
const sqs = new SQS()

export const sendDataToSQS = async (auditData: IAuditDataDto): Promise<void> => {
  const message: MessageAttributeMap = {
    'documentType': {
      DataType: 'String',
      StringValue: auditData.documentType
    },
    'documentId': {
      DataType: 'Number',
      StringValue: auditData.documentId.toString()
    },
    'timestamp': {
      DataType: 'Number',
      StringValue: auditData.timestamp.toString()
    },
    'userId': {
      DataType: 'Number',
      StringValue: auditData.userId.toString()
    },
    'companyId': {
      DataType: 'Number',
      StringValue: auditData.companyId.toString()
    },
    'message': {
      DataType: 'String',
      StringValue: auditData.message
    },
    'data': {
      DataType: 'String',
      StringValue: JSON.stringify(auditData.data)
    },
  }
  const params = {
    DelaySeconds: 10,
    MessageAttributes: message,
    MessageBody: auditData.message,
    QueueUrl: envVars.AWS_SQS_URL
  }
  sqs.sendMessage( params, (err, data ) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Success', data.MessageId);
    }
  })
}