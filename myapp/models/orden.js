'use strict';
const {
  Model
} = require('sequelize');
const tipo_examen = require('./tipo_examen');
module.exports = (sequelize, DataTypes) => {
  class orden extends Model {
    static associate(models) {
      const paciente = models.paciente;
      const tipo_examen = models.tipo_examen;
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
      orden.belongsToMany(tipo_examen,{
        through: 'examen',
        foreignKey: 'id_examen',
        otherKey: 'id_orden',
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
    diagnostico: DataTypes.STRING,
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