//models/tipo_examen
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
      
      
      tipo_examen.belongsToMany(tipo_muestra, {
        through: 'muestras_requeridas',
        foreignKey: 'id_tipo',
        otherKey: 'id_tipo_muestra',
     
        constraints: false
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