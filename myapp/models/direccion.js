'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class direccion extends Model {
    static associate(models) {
      const paciente = models.paciente;

      direccion.hasMany(paciente, {
        foreignKey: 'id_direccion'
      });
    }
  }
  direccion.init({
    id_direccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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