'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class determinacion extends Model {
    static associate(models) {
      const unidad_medida = models.unidad_medida;
      const referencia = models.referencia;
      const tipo_examen = models.tipo_examen;
      // Importa el modelo 'valor' y úsalo para establecer la relación
      const valor = models.valor;
      const sexo = models.sexo;

      determinacion.belongsTo(unidad_medida, {
        foreignKey: 'id_unidad_medida',
        
      });
      determinacion.belongsTo(referencia, {
        foreignKey: 'id_referencia',
        as: 'referencia'
      });
      determinacion.hasMany(valor, {
        foreignKey: 'id_determinacion'
      });
      determinacion.belongsTo(tipo_examen, {
        foreignKey: 'id_tipo',
        as: 'determinacions'
      })
      
    }
  }
  determinacion.init({
    id_determinacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: DataTypes.STRING,
    estado: DataTypes.BOOLEAN,
    id_unidad_medida: DataTypes.INTEGER,
    id_referencia: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'determinacion',
    tableName: 'determinacion',
    timestamps: false,
  });
  return determinacion;
};