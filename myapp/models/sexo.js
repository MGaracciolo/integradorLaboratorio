'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sexo extends Model {
    
    static associate(models) {
      const paciente = models.paciente;
      
      sexo.hasMany(paciente,{
        foreignKey:'id_sexo'
    });
    }
  }
  sexo.init({
    id_sexo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Esto define el campo como clave primaria
    autoIncrement: true, // Opcional, si el ID es autoincremental
  },
    valor: DataTypes.STRING,
    descripcion:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sexo',
  });
  return sexo;
};