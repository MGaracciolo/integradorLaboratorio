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
            foreingkey:'id_examen'
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
  });
  return valor;
};