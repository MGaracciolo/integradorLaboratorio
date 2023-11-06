'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_examen extends Model {
    static associate(models) {
      const tipo_muestra = models.tipo_muestra;
      const orden = models.orden;
      const determinacion = models.determinacion;
      tipo_examen.belongsToMany(tipo_muestra, {
        through: 'muestras_requeridas',
        foreignKey: 'id_tipo', // Asegúrate de que el nombre de la clave sea correcto
        otherKey: 'id_tipo_muestra',
      });

      tipo_examen.belongsToMany(orden, {
        through: 'examen',
        foreignKey: 'id_examen',
        otherKey: 'id_tipo',
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