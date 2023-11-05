/*
'use strict';
const {
  Model
} = require('sequelize');
const tipo_examen = require('./tipo_examen');
module.exports = (sequelize, DataTypes) => {
  class tipo_muestra extends Model {

    static associate(models) {
      const muestra = models.muestra;
      const tipo_examen = models.tipo_examen;
/*
      tipo_muestra.belongsToMany(tipo_examen, {
        through: 'muestras_requeridas',
        foreignKey: 'id_tipo_muestra',
        otherKey: 'id_tipo',
        //as: 'm',
        //constraints: false
      });

      

      tipo_muestra.hasMany(muestra, {
        foreignKey: 'id_tipo_muestra'
      });
    }
  }
  tipo_muestra.init({
    id_tipo_muestra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Esto define el campo como clave primaria
      autoIncrement: true, // Opcional, si el ID es autoincremental
    },
    valor: DataTypes.STRING,
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tipo_muestra',
    tableName: 'tipo_muestra',
    timestamps: false
  });
  return tipo_muestra;
};
*/

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tipo_muestra extends Model {
    static associate(models) {
      const muestra = models.muestra;
      const tipo_examen = models.tipo_examen;

      tipo_muestra.belongsToMany(tipo_examen, {
        through: 'muestras_requeridas',
        foreignKey: 'id_tipo_muestra',
        otherKey: 'id_tipo',
      });

      tipo_muestra.hasMany(muestra, {
        foreignKey: 'id_tipo_muestra',
      });
    }
  }
  tipo_muestra.init({
    id_tipo_muestra: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    valor: DataTypes.STRING,
    descripcion: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'tipo_muestra',
    tableName: 'tipo_muestra',
    timestamps: false,
  });
  return tipo_muestra;
};
