import { Model, DataTypes } from 'sequelize'
import sequelize from '../../../config/dbConnection'
import TrackingActivityModel from './TrackingActivityModel'

class TrackingModel extends Model {
  id!: number
  bol_number!: string
  customer_rate_total!: number
  customer_scac!: string
  scac!: string
  carrier_pickup_number!: string
  customer_acct_number!: string
  special_instructions!: string
  carrier_id!: string
  carrier_name!: string
  mode!: string
  service_days!: number
  distance!: number
  status!: string
  owner!: string
  signed_bol!: string
  delivery_receipt!: string
  weight_ticket!: string
}

TrackingModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    get() {
      const id = this.getDataValue('id')
      return id ? Number(id) : null
    }
  },
  bol_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_rate_total: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    get() {
      const customer_rate_total = this.getDataValue('customer_rate_total')
      return customer_rate_total ? Number(customer_rate_total) : null
    }
   },
   customer_scac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  scac: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  carrier_pickup_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  customer_acct_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  special_instructions: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  carrier_id: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  carrier_name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  mode: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  service_days: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    get() {
      const service_days = this.getDataValue('service_days')
      return service_days ? Number(service_days) : null
    }
   },
   distance: {
    type: DataTypes.DECIMAL,
    allowNull: true,
    get() {
      const distance = this.getDataValue('distance')
      return distance ? Number(distance) : null
    }
   },
   status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  owner: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  signed_bol: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  delivery_receipt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  weight_ticket: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'tbl_tracking',
  timestamps: false,
  sequelize
})

TrackingModel.hasMany(TrackingActivityModel, { foreignKey: 'tracking_id', as: 'activities' })
TrackingActivityModel.belongsTo(TrackingModel, { foreignKey: 'tracking_id' })

export default TrackingModel