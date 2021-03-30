import { Model, DataTypes } from 'sequelize'
import sequelize from '../../../config/dbConnection'

class TrackingActivityModel extends Model {
  id!: number
  tracking_id!: number
  type!: string
  status_code!: string
  actual_date!: Date
  planned_date!: Date
  latest_date!: Date
  earliest_date!: Date
}

TrackingActivityModel.init({
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
  tracking_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    get() {
      const tracking_id = this.getDataValue('tracking_id')
      return tracking_id ? Number(tracking_id) : null
    }
  },
  type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status_code: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  actual_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  planned_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  latest_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  earliest_date: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'tbl_tracking_activity',
  timestamps: false,
  sequelize
})

export default TrackingActivityModel