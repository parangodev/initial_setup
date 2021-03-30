import dotenv from 'dotenv'
dotenv.config()

export default {
	PORT:process.env.PORT || '',
    DB_PORT:process.env.DB_PORT || '',
    CORS:process.env.CORS || '*',
    DB_USER:process.env.DB_USER || '',
    DB_PASSWORD:process.env.DB_PASSWORD || '',
    DB_HOST:process.env.DB_HOST || '',
    DB_NAME:process.env.DB_NAME || '',
    DB_DIALECT:process.env.DB_DIALECT || '',
    AUTH_JWT_SECRET:process.env.AUTH_JWT_SECRET || '',
    AUTH_JWT_SECRET_RECOVERY:process.env.AUTH_JWT_SECRET_RECOVERY || '',
    EXPIRE_JWT_TIME_TOKEN:process.env.EXPIRE_JWT_TIME_TOKEN || '',
    EXPIRE_JWT_TIME_TOKEN_RECOVERY:process.env.EXPIRE_JWT_TIME_TOKEN_RECOVERY || '',
    SALT_CRYPT:process.env.SALT_CRYPT || '',
    API_VERSION:process.env.API_VERSION || '',
    MAILGUN_API:process.env.MAILGUN_API || '',
    MAILGUN_DOMAIN:process.env.MAILGUN_DOMAIN || '',
    QUEUE_URL:process.env.QUEUE_URL || '',
    REGION:process.env.REGION || '',
    ACCESS_KEY_ID:process.env.ACCESS_KEY_ID || '',
    SECRET_ACCESS_KEY:process.env.SECRET_ACCESS_KEY || '',
    RECOVERY_FRONTEND_URL:process.env.RECOVERY_FRONTEND_URL || '',
    AUTH0_DOMAIN:process.env.AUTH0_DOMAIN || '',
    AUTH0_AUDIENCE:process.env.AUTH0_AUDIENCE || '',
    AUTH0_TOKEN:process.env.AUTH0_TOKEN || '',
    AUTH0_API_ID:process.env.AUTH0_API_ID || '',
    AUTH0_CLIENT_ID:process.env.AUTH0_CLIENT_ID || '',
    AUTH0_CLIENT_SECRET:process.env.AUTH0_CLIENT_SECRET || '',
    AUTH0_CLIENT_ID_M2M:process.env.AUTH0_CLIENT_ID_M2M || '',
    AUTH0_CLIENT_SECRET_M2M:process.env.AUTH0_CLIENT_SECRET || '',
    AUTH0_CONNECTION:process.env.AUTH0_CONNECTION || '',
    LTL_USER_URL:process.env.LTL_USER_URL || '',
    AWS_ACCESS_KEY_ID:process.env.AWS_ACCESS_KEY_ID || '',
    AWS_SECRET_ACCESS_KEY:process.env.AWS_SECRET_ACCESS_KEY || '',
    AWS_S3_BUCKET:process.env.AWS_S3_BUCKET || '',
    AWS_SQS_URL:process.env.AWS_SQS_URL || '',
    AWS_REGION:process.env.AWS_REGION || '',
    AWS_SENDER_ADDRESS_EMAIL:process.env.AWS_SENDER_ADDRESS_EMAIL || '',
    SOCKET_CONNECTION_TEST_DOMAIN: process.env.SOCKET_CONNECTION_TEST_DOMAIN || '',
    SOCKET_CONNECTION_STAGING_DOMAIN: process.env.SOCKET_CONNECTION_STAGING_DOMAIN || '',
    SOCKET_CONNECTION_LOCAL: 'http://localhost:3000',
    NODE_ENV: process.env.NODE_ENV
}