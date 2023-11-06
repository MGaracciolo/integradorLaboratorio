'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class valor extends Model {
    
    static associate(models) {
        const examen = models.examen;
        const determinacion = models.determinacion;
        
        valor.belongsTo(examen,{
          foreignKey:'id_examen',
          targetKey: 'id_examen',
          as: 'examen-valor', 
          constraints: false,
        });
          valor.belongsTo(determinacion,{
            foreingkey:'id_determinacion'
        });
    }
  }
  valor.init({
    id_examen: DataTypes.INTEGER,
    id_determinacion: DataTypes.INTEGER,
    cifra: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'valor',
    tableName: 'valor',
    timestamps: false
  });
  return valor;
};