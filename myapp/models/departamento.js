'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class departamento extends Model {
    
    static associate(models) {
      departamento.hasMany(empleado,{
        foreignKey:'id_departamento'
      });
    }
  }
  departamento.init({
    id_departamento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Esto define el campo como clave primaria
    autoIncrement: true, // Opcional, si el ID es autoincremental
  },
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'departamento',
  });
  return departamento;
};