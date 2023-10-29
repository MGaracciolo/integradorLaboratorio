'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_muestra extends Model {
    
    static associate(models) {
      tipo_muestra.hasMany(muestra,{
        foreignKey:'id_tipo_muestra'
    });
    }
  }
  tipo_muestra.init({
    id_tipo_muestra: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Esto define el campo como clave primaria
    autoIncrement: true, // Opcional, si el ID es autoincremental
  },
    valor:DataTypes.STRING,
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tipo_muestra',
  });
  return tipo_muestra;
};