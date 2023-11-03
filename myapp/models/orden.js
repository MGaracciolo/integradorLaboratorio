'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orden extends Model {
    static associate(models) {
      const paciente = models.paciente;
      const examen = models.examen;
      const estado = models.estado;
      const muestra = models.muestra;
      
      orden.belongsTo(estado,{
        foreignKey: 'id_estado', 
        targetKey: 'id_estado', 
        as: 'estado',
        constraints: false, 
      });
      orden.belongsTo(paciente,{
        foreignKey: 'id_paciente', 
        targetKey: 'id_paciente', 
        as: 'paciente', 
        constraints: false, 
      });
      orden.hasMany(examen,{
        foreignKey: 'id_orden', 
        targetKey: 'id_orden',
        as: 'orden-examen', 
        constraints: false, 
      });
      orden.hasMany(muestra,{
        foreignKey: 'id_orden', 
        targetKey: 'id_orden', 
        as: 'orden-muestra', 
        constraints: false, 
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
    diagnostico: DataTypes.STRING,
    fecha_ingreso: DataTypes.DATEONLY,
    fecha_entrega: DataTypes.DATEONLY,
    doctor: DataTypes.STRING,
    id_estado: DataTypes.INTEGER,
    observacion: DataTypes.STRING,
    id_paciente: DataTypes.INTEGER,
    activo: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'orden',
    tableName: 'orden',
    timestamps: false
  });
  return orden;
};