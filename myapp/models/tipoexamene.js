'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipoExamene extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tipoExamene.init({
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tipoExamene',
  });
  return tipoExamene;
};