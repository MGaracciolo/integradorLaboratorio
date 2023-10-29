'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_examen extends Model {
    
    static associate(models) {
      const examen = models.examen;
      
      tipo_examen.hasMany(examen,{
        foreignKey:'id_tipo_examen'
    });
    }
  }
  tipo_examen.init({
    id_tipo_examen: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Esto define el campo como clave primaria
    autoIncrement: true, // Opcional, si el ID es autoincremental
  },
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tipo_examen',
  });
  return tipo_examen;
};