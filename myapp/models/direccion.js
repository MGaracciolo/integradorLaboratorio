'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class direccion extends Model {
    static associate(models) {
      direccion.hasMany(paciente,{
        foreignKey:'id_direccion'
      });
    }
  }
  direccion.init({
    id_direccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Esto define el campo como clave primaria
      autoIncrement: true, // Opcional, si el ID es autoincremental
    },
    calle: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    piso: DataTypes.INTEGER,
    departamento: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    provincia: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'direccion',
  });
  return direccion;
};