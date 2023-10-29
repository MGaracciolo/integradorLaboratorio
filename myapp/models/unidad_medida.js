'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class unidad_medida extends Model {
    
    static associate(models) {
      const determinacion = models.determinacion;
      unidad_medida.hasMany(determinacion,{
        foreignKey:'id_unidad_medida'
    });
    }
  }
  unidad_medida.init({
    id_unidad_medida: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Esto define el campo como clave primaria
    autoIncrement: true, // Opcional, si el ID es autoincremental
  },
    unidad:DataTypes.STRING,
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'unidad_medida',
  });
  return unidad_medida;
};