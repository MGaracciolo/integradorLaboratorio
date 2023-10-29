'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class obra_social extends Model {
    static associate(models) {
      obra_social.hasMany(paciente,{
        foreingkey:'id_obra_social'
      });
    }
  }
  obra_social.init({
    id_obra_social: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Esto define el campo como clave primaria
      autoIncrement: true, // Opcional, si el ID es autoincremental
    },
    nombre: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'obra_social',
  });
  return obra_social;
};