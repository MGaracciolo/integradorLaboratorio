'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class examen extends Model {
    static associate(models) {
      const tipo_examen = models.tipo_examen;
      const orden = models.orden;
      const empleado = models.empleado;
      const valor = models.valor;
      
      examen.belongsTo(tipo_examen,{
        foreignKey:'id_tipo'
      });
      examen.belongsTo(orden,{
        foreingkey:'id_orden'
      });
      examen.belongsTo(empleado,{
        foreingkey:'id_empleado'
      });
      examen.hasMany(valor,{
        foreignKey:'id_examen'
      });
      }
  }
  examen.init({
    id_examen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Esto define el campo como clave primaria
      autoIncrement: true, // Opcional, si el ID es autoincremental
    },
    id_tipo: DataTypes.INTEGER,
    id_orden: DataTypes.INTEGER,
    id_empleado: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'examen',
  });
  return examen;
};