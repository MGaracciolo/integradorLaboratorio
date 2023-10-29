'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estado extends Model {
    static associate(models) {
      estado.hasMany(orden,{
        foreingkey:'id_estado'
      })
    }
  }
  estado.init({
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Esto define el campo como clave primaria
      autoIncrement: true, // Opcional, si el ID es autoincremental
    },
    valor: DataTypes.STRING,
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'estado',
  });
  return estado;
};