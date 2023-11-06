'use strict';
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class paciente extends Model {
    static associate(models) {
      const orden = models.orden;
      const obra_social = models.obra_social;
      const direccion = models.direccion;
      const user = models.user;
      const sexo = models.sexo;
      
      paciente.hasMany(orden,{
        foreignKey:'id_paciente'
      });

      paciente.belongsTo(obra_social, {
        foreignKey: 'id_obra_social'
      });
     
      paciente.belongsTo(direccion,{
        foreignKey:'id_direccion'
      });
      paciente.belongsTo(user,{
        foreignKey:'id_user'
      });
      paciente.belongsTo(sexo,{
        foreignKey:'id_sexo'
      });
    }
  }

  paciente.init({
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    dni:DataTypes.INTEGER,     
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    fecha_nacimiento:DataTypes.DATE,
    id_obra_social: DataTypes.INTEGER,
    numero_afiliado: DataTypes.INTEGER,
    telefono: DataTypes.INTEGER,
    id_sexo: DataTypes.INTEGER,
    id_direccion: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
    
  }, {
    sequelize,
    modelName: 'paciente',
    tableName: 'paciente', 
    timestamps: false,// Esto define el nombre de la tabla en la base de datos
  });

  return paciente;
};
