'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    
    static associate(models) {
      const empleado = models.empleado;
      const paciente = models.paciente;
        user.hasMany(empleado,{
            foreignKey:'id_user'
        });
        user.hasMany(paciente,{
            foreignKey:'id_user'
        });
    }
  }
  user.init({
    id_user: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Esto define el campo como clave primaria
    autoIncrement: true, // Opcional, si el ID es autoincremental
  },
    usuario: DataTypes.STRING,
    clave:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    tableName: 'user',  
    timestamps: false
  });
  return user;
};