'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Paciente.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    fechanacimiento: DataTypes.DATE,
    sexo: DataTypes.INTEGER,
    edad: DataTypes.INTEGER,
    dni: DataTypes.INTEGER,
    telefono: DataTypes.INTEGER,
    obraSocial: DataTypes.STRING,
    numeroAfiliado: DataTypes.INTEGER,
    ciudad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Paciente',
  });
  return Paciente;
};