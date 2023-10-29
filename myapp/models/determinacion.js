'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class determinacion extends Model {
    static associate(models) {
      const unidad_medida = models.unidad_medida;
      const referencia = models.referencia;
      const valor = models.valor;

      determinacion.belongsTo(unidad_medida, {
        foreignKey: 'id_unidad_medida'
      });
      determinacion.belongsTo(referencia, {
        foreignKey: 'id_referencia'
      });
      determinacion.hasMany(valor, {
        foreignKey: 'id_determinacion'
      });
    }
  }
  determinacion.init({
    id_determinacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
