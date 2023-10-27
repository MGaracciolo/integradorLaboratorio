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
            // define association here
        }
    }
    referencia.init({
        id_referencia: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, // Esto define el campo como clave primaria
            autoIncrement: true, // Opcional, si el ID es autoincremental
        },
        sexo: DataTypes.STRING,
        // Agrega otros campos según tus necesidades
    }, {
        sequelize,
        modelName: 'referencia',

    });
    return referencia;
};