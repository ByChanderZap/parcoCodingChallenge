// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Column, DataType, Model, Table } from 'sequelize-typescript'
import { iUpdateUserData, iUser } from '../../../types'
import { UserType } from '../../../enums'
import db from '../db'

// export const User = db.define<Model<iParking, iParkingCreation>>('User', {

export const User = db.define<Model<iUser, iUpdateUserData>>('User', {
  // Model attributes are defined here
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataType.STRING,
    allowNull: false,
  },
  username: {
    type: DataType.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataType.STRING,
    allowNull: false,
  },
  contact: {
    type: DataType.STRING,
    allowNull: false,
  },
  userType: {
    type: DataType.ENUM(...Object.values(UserType)),
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


