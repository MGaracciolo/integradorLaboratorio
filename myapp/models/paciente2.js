'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class paciente2 extends Model {
    static associate(models) {
      // define association here
    }
  }

  paciente2.init({
    id_paciente2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
     
    nombre: DataTypes.STRING,
    dni:DataTypes.INTEGER,   
    apellido: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'paciente2',
    tableName: 'paciente2', // Esto define el nombre de la tabla en la base de datos
  });

  return paciente2;
};
