'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class obra_social extends Model {
    static associate(models) {
      const paciente = models.paciente;
      
      obra_social.hasMany(paciente,{
       foreignKey:'id_obra_social'
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
    tableName: 'obra_social',
    timestamps: false
  });
  return obra_social;
};