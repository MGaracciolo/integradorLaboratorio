'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_examen extends Model {
    static associate(models) {
      const tipo_muestra = models.tipo_muestra;
      const examen = models.examen;
      const determinacion = models.determinacion;
      tipo_examen.hasMany(tipo_muestra, {
        foreignKey: 'id_tipo', 
        as: 'tipo-tipo',
        constraints: false, 
      });
      tipo_examen.hasMany(examen,{
        foreignKey: 'id_tipo', 
        as: 'tipo-examen',
        constraints: false, 
      });
      tipo_examen.hasMany(determinacion, {
        foreignKey: 'id_tipo',
        as: 'determinacions',
      });
    }
  }
  tipo_examen.init({
    id_tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tipo_examen',
    tableName: 'tipo_examen',
    timestamps: false,
  });
  return tipo_examen;
};