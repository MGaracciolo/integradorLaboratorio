'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class determinacion extends Model {
    static associate(models) {
      determinacion.belongsTo(unidad_medida,{
        foreingkey:'id_unidad_medida'
      });
      determinacion.belongsTo(referencia,{
        foreingkey:'id_referencia'
      });
      determinacion.hasMany(valor,{
        foreingkey:'id_determinacion'
      });
    }
  }
  determinacion.init({
    id_determinacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Esto define el campo como clave primaria
      autoIncrement: true, // Opcional, si el ID es autoincremental
    },
    nombre: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    id_unidad_medida: DataTypes.INTEGER,
    id_referencia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'determinacion',
  });
  return determinacion;
};