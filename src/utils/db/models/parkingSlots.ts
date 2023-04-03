// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { ParkingType } from '../../../enums'
import db from '../db'


export const Parking = db.define('Parking', {
  // Model attributes are defined here
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
    unique: true
  },
  spots: {
    type: DataType.INTEGER,
    allowNull: false
  },
  contact: {
    type: DataType.STRING,
    allowNull: false,
  },
  parkingType: {
    type: DataType.ENUM(...Object.values(ParkingType)),
    allowNull: false,
  }
}, {
  // Other model options go here

})




// I just left this code here because i think is also a good way to do this implementation
// just need to add a small change in the db connection ,also will left that change there
// @Table({
//   timestamps: true,
//   tableName: 'Parking',
// })

// export class Parking extends Model {
//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//     name!:string

//   @Column({
//     type: DataType.INTEGER,
//     allowNull: false
//   })
//     spots!: number

//   @Column({
//     type: DataType.STRING,
//     allowNull: false,
//   })
//     contact!:string

//   @Column({
//     type: DataType.ENUM(...Object.values(ParkingType)),
//     allowNull: false,
//   })
//     parkingType!: ParkingType
// }


