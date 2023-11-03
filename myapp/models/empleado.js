'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empleado extends Model {
    static associate(models) {
      const departamento = models.departamento; // Importa el modelo 'paciente' y asócialo.
      const user = models.user;
      const examen = models.examen;

      empleado.belongsTo(departamento, {
        foreignKey: 'id_departamento'
      });
      empleado.belongsTo(user, {
        foreingkey: 'id_user'
      });
      empleado.hasMany(examen, {
        foreingkey: 'id_empleado'
      });
    }
  }
  empleado.init({
    id_empleado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Esto define el campo como clave primaria
      autoIncrement: true, // Opcional, si el ID es autoincremental
    },
    nombre_empleado: DataTypes.STRING,
    apellido_empleado: DataTypes.STRING,
    id_departamento: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'empleado',
  });
  return empleado;
};