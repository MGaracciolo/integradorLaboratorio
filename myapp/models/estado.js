'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class estado extends Model {
    static associate(models) {
      const orden = models.orden;
      estado.hasMany(orden, {
        foreignKey: 'id_estado', // Nombre de la clave externa en el modelo "orden"
        targetKey: 'id_estado', // Nombre de la clave en el modelo "estado"
        as: 'estado', // Alias para la relación
        constraints: false, // Evita que Sequelize agregue restricciones en la clave externa
      })
    }
  }
  estado.init({
    id_estado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Esto define el campo como clave primaria
      autoIncrement: true, // Opcional, si el ID es autoincremental
    },
    valor: DataTypes.STRING,
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'estado',
    tableName: 'estado',
    timestamps: false,
  });
  return estado;
};