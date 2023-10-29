'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class departamento extends Model {
    
    static associate(models) {
      const empleado = models.empleado;
      departamento.hasMany(empleado, {
        foreignKey: 'id_departamento'
      });
    }
  }
  departamento.init({
    id_departamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'departamento',
  });
  return departamento;
};
