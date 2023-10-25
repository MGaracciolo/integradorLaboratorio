'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class muestra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  muestra.init({
    fecharecoleccion: DataTypes.DATE,
    horaRecoleccion: DataTypes.TIME,
    tipoMuestra: DataTypes.STRING,
    precedencia: DataTypes.INTEGER,
    id_Orden: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'muestra',
  });
  return muestra;
};