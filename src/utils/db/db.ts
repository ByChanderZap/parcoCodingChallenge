import { Sequelize } from 'sequelize'
// About the change that was mention on db/models/parkingSlots, first you need to import all models
// import * as from allModels '../db/models'

const sequelize = new Sequelize('parco', 'postgres', 'postgres', {
  host: 'db',
  dialect: 'postgres',
  port: 5432,
  logging: false
})

  
// To load all models, you can use the Object.values, this will create something like:
// models: [Parking, AnotherModel, Etc]

// const sequelize = new Sequelize({
//   host: 'db',
//   dialect: 'postgres',
//   port: 5432,
//   username: 'postgres',
//   password: 'postgres',
//   database: 'parco',
//   logging: false,
//   // models: Object.values(AllModels),
// })


export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connection has been established successfully.')
    await sequelize.sync({ alter: true })
    console.log('Database synchronization completed.')
    return sequelize
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    return null
  }
}

export default sequelize



