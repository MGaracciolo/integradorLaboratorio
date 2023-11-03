//models/tipo_examen
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_examen extends Model {

    static associate(models) {
      const examen = models.examen;
      const determinacion = models.determinacion;
      const muestras_requeridas = models.muestras_requeridas;
      
      tipo_examen.hasMany(muestras_requeridas, {
        foreignKey: 'id_tipo'
      });
      tipo_examen.hasMany(examen, {
        foreignKey: 'id_tipo_examen'
      });
      tipo_examen.hasMany(determinacion, {
        foreignKey: 'id_tipo',
        as: 'determinacions'
      })
    }
  }
  tipo_examen.init({
    id_tipo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Esto define el campo como clave primaria
      autoIncrement: true, // Opcional, si el ID es autoincremental
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