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
            const sexo = models.sexo;

referencia.belongsTo(sexo, {
    foreignKey: 'id_sexo',
});

            referencia.hasMany(determinacion, {
                foreignKey: 'id_referencia',
                as: 'referencia'
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
        tableName: 'referencia',
        timestamps: false
    });
    return referencia;
};