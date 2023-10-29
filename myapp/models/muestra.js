const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class muestra extends Model {
    static associate(models) {
      muestra.belongsTo(tipo_muestra,{
        foreingkey:'id_tipo_muestra'
      });
      muestra.belongsTo(orden,{
        foreingkey:'id_orden'
      });
    }
  }
  muestra.init({
    id_muestra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Esto define el campo como clave primaria
      autoIncrement: true, // Opcional, si el ID es autoincremental
    },
    fecha_recoleccion: DataTypes.DATEONLY,
    hora_recoleccion: DataTypes.TIME,
    id_tipo_muestra: DataTypes.INTEGER,
    precedencia: DataTypes.STRING,
    id_orden: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'muestra',
  });
  return muestra;
};