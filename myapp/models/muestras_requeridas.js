'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class muestras_requeridas extends Model {
    static associate(models) {
      // Define las asociaciones con otros modelos si es necesario
    class muestras_requeridas extends Model {

        static associate(models) {
            const tipo_examen = models.tipo_examen;
            const tipo_muestra = models.tipo_muestra;
        }
    }
    muestras_requeridas.init({
        tipo_muestra: DataTypes.STRING,
        id_tipo: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'muestras_requeridas',
        tableName: 'muestras_requeridas',
        timestamps: false,
    });
    return muestras_requeridas;
  }

  muestras_requeridas.init(
    {
      id_muestras_requeridas: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      // Otras columnas necesarias
    },
    {
      sequelize,
      modelName: 'muestras_requeridas',
      tableName: 'muestras_requeridas',
      timestamps: false,
    }
  );

  return muestras_requeridas;
};
