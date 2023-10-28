'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class paciente extends Model {
    static associate(models) {
      // define association here
    }
  }

  paciente.init({
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    dni:DataTypes.INTEGER,     
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    fecha_nacimiento:DataTypes.DATE,
    id_obra_social: DataTypes.INTEGER,
    numero_afiliado: DataTypes.INTEGER,
    telefono: DataTypes.INTEGER,
    id_sexo: DataTypes.INTEGER,
    id_direccion: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'paciente',
    tableName: 'paciente', // Esto define el nombre de la tabla en la base de datos
  });

  return paciente;
};
