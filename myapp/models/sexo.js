'use strict';
const {
  Model
} = require('sequelize');
const referencia = require('./referencia');
module.exports = (sequelize, DataTypes) => {
  class sexo extends Model {
    
    static associate(models) {
      const paciente = models.paciente;
      const referencia = models.referencia;
      sexo.hasMany(paciente,{
        foreignKey:'id_sexo'
    });

    sexo.hasMany(referencia,{
      foreignKey:'id_sexo',
      
    })
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
    tableName: 'sexo',
    timestamps: false
  });
  return sexo;
};