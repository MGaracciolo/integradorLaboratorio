'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class paciente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  paciente.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    fecha_nacimiento: DataTypes.DATEONLY,
    sexo: DataTypes.INTEGER,
    embarazada: DataTypes.STRING,
    dni: DataTypes.INTEGER,
    obra_social: DataTypes.STRING,
    numero_afiliado: DataTypes.INTEGER,
    telefono: DataTypes.INTEGER,
    ciudad: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'paciente',
  });
  return paciente;
};
