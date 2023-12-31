'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class direccion extends Model {
    static associate(models) {
      const paciente = models.paciente; // Importa el modelo 'paciente' y asócialo.

      direccion.hasMany(paciente, {
        foreignKey: 'id_direccion', 
        targetKey: 'id_direccion',
        as: 'direccion-paciente', 
        constraints: false, 
      });
    }
  }
  direccion.init({
    id_direccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    calle: DataTypes.STRING,
    numero: DataTypes.INTEGER,
    piso: DataTypes.INTEGER,
    departamento: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    provincia: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'direccion',
    tableName: 'direccion',
    timestamps: false
  });
  return direccion;
};
