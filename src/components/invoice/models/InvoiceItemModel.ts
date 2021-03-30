import { Model, DataTypes } from 'sequelize'
import sequelize from '../../../config/dbConnection'

class InvoiceItemModel extends Model {
  id!: number
  invoice_id!: number
  bol!: string
  shipment_number!: string
  shipment_sf_id!: string
  invoice_line_sf_id!: string
  freight_charges!: number
  insurance_charges!: number
  total_amount: number | undefined
  audit_creation_date!: Date
  audit_update_date!: Date
}

InvoiceItemModel.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
    get () {
      const id = this.getDataValue('id')
      return id ? Number(id) : null
    }
  },
  bol: {
    type: DataTypes.STRING,
    allowNull: true
  },
  shipment_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shipment_sf_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  invoice_line_sf_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  invoice_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    get () {
      const value = this.getDataValue('invoice_id')
      return value ? Number(value) : null
    }
  },
  freight_charges: {
    type: DataTypes.FLOAT,
    allowNull: true,
    get () {
      const value = this.getDataValue('freight_charges')
      return value ? Number(value) : null
    }
  },
  insurance_charges: {
    type: DataTypes.FLOAT,
    allowNull: true,
    get () {
      const value = this.getDataValue('insurance_charges')
      return value ? Number(value) : null
    }
  },
  total_amount: {
    type: DataTypes.FLOAT,
      get () {
        const value = this.getDataValue('total_amount')
        return value ? Number(value) : null
      }
  },
  audit_creation_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  audit_update_date: {
    type: DataTypes.DATE,
    allowNull: false
  }
},
{
  tableName: 'tbl_invoice_item',
  timestamps: false,
  sequelize
})

export default InvoiceItemModel
