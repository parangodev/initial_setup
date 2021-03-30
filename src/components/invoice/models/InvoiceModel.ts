import { Model, DataTypes } from 'sequelize'
import sequelize from '../../../config/dbConnection'

class InvoiceModel extends Model {
  id!: number
  invoice_number!: string
  invoice_date!: string
  invoice_due_date!: Date
  total_amount!: number
  balance_due_amount!: number
  payment_status: string | undefined
  days_past_due: number | undefined
  last_payment_date: Date | undefined
  invoice_pdf_url!: string
  audit_creation_date!: Date
  audit_update_date!: Date
  parent_id!: number
}

InvoiceModel.init({
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
  invoice_number: {
    type: DataTypes.STRING,
    allowNull: true
  },
  invoice_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  invoice_due_date: {
    type: DataTypes.DATE,
  },
  total_amount: {
    type: DataTypes.FLOAT,
      allowNull: true,
      get () {
        const value = this.getDataValue('total_amount')
        return value ? Number(value) : null
      }
  },
  parent_id: {
    type: DataTypes.INTEGER,
      allowNull: true,
      get () {
        const value = this.getDataValue('parent_id')
        return value ? Number(value) : null
      }
  },
  balance_due_amount: {
    type: DataTypes.FLOAT,
    allowNull: true,
    get () {
      const value = this.getDataValue('balance_due_amount')
      return value ? Number(value) : null
    }
  },
  payment_status: {
    type: DataTypes.STRING,
    allowNull: true
  },
  days_past_due: {
    type: DataTypes.INTEGER,
      get () {
        const value = this.getDataValue('days_past_due')
        return value ? Number(value) : null
      }
  },
  last_payment_date: {
    type: DataTypes.DATE
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
  tableName: 'tbl_invoice',
  timestamps: false,
  sequelize
})

export default InvoiceModel
