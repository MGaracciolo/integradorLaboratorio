'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orden extends Model {
    static associate(models) {
      orden.belongsTo(estado,{
        foreingkey:'id_estado'
      });
      orden.belongsTo(paciente,{
        foreingkey:'id_paciente'
      });
      orden.hasMany(examen,{
        foreingkey:'id_orden'
      });
      orden.hasMany(muestra,{
        foreingkey:'id_orden'
      });
    }
  }
  orden.init({
    id_orden: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Esto define el campo como clave primaria
      autoIncrement: true, // Opcional, si el ID es autoincremental
    },
    fecha_ingreso: DataTypes.DATEONLY,
    diagnostico: DataTypes.STRING,
    fecha_entrega: DataTypes.DATEONLY,
    doctor: DataTypes.STRING,
    id_estado: DataTypes.INTEGER,
    observacion: DataTypes.STRING,
    id_paciente: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'orden',
  });
  return orden;
};