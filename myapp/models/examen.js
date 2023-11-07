//models/examen
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
        foreignKey: 'id_tipo', 
        as: 'tipo-examen', 
        constraints: false, 
      });
      examen.belongsTo(orden,{
        foreignKey: 'id_orden', 
        targetKey: 'id_orden', 
        as: 'orden-examen', 
        constraints: false, 
      });
      examen.belongsTo(empleado,{
        foreingkey:'id_empleado',
        as: 'examen-empleado',
        constraints: false, 
      });
      examen.hasMany(valor,{
        foreignKey:'id_examen',
        as: 'examen-valor', 
        constraints: false,
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
    tableName: 'examen',
    timestamps: false
  });
  return examen;
};