'use strict'

import sequelize from '../../db.js'
import Sequelize from 'sequelize';

const model = (sequelize, DataTypes) => {
  let counts = sequelize.define('counts',{
    id: {
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    id_user: {
      type:DataTypes.INTEGER,
      allowNull:false
    },
    number_count: {
        type:DataTypes.STRING,
    },
    balance: {
      type:DataTypes.STRING,
  },
    status: {
      type:DataTypes.INTEGER,
    },
    // Timestamps
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
  })
  

  return counts
}

export default model(sequelize, Sequelize.DataTypes)