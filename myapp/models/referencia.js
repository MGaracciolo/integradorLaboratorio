'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class referencia extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            const determinacion = models.determinacion;
            referencia.hasMany(determinacion, {
                foreignKey: 'id_referencia'
            });
        }
    }
    referencia.init({
        id_referencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, // Esto define el campo como clave primaria
            autoIncrement: true, // Opcional, si el ID es autoincremental
        },
        edad_max: DataTypes.INTEGER,
        edad_min: DataTypes.INTEGER,
        id_sexo: DataTypes.INTEGER,
        minimo: DataTypes.FLOAT,
        maximo: DataTypes.FLOAT,
        patologia: DataTypes.STRING,
        observacion: DataTypes.STRING,
        estado: DataTypes.BOOLEAN
        // Agrega otros campos según tus necesidades
    }, {
        sequelize,
        modelName: 'referencia',

    });
    return referencia;
};