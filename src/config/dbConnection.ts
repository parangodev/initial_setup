import { Sequelize } from 'sequelize'
import envVars from './config'

const sequelize = new Sequelize(envVars.DB_NAME, envVars.DB_USER, envVars.DB_PASSWORD, {
  host: envVars.DB_HOST,
  dialect: 'postgres',
  port: parseInt(envVars.DB_PORT),
  logging: false
});
export default sequelize;