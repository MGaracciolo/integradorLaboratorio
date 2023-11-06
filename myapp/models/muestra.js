const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class muestra extends Model {
    static associate(models) {
      const tipo_muestra = models.tipo_muestra;
      const orden = models.orden;
      
      muestra.belongsTo(tipo_muestra,{
        foreingkey:'id_tipo_muestra',
        as: 'tipo_muestra',
        constraints: false, 
      });
      muestra.belongsTo(orden,{
        foreignKey: 'id_orden', 
        targetKey: 'id_orden', 
        as: 'orden-muestra', 
        constraints: false, 
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
    tableName: 'muestra',
    timestamps: false
  });
  return muestra;
};