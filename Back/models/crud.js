'use strict';
import { DataTypes, Model } from 'sequelize';

export default (sequelize) => {
  class Crud extends Model {
    static associate(models) {
      // Define associations if needed
    }
  }

  Crud.init({
    encrypted_id: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    catg: DataTypes.STRING,
    etablissment: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    phoneNumber: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'crud',
  });

  return Crud;
};
