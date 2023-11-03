//models/tipo_examen
'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class muestras_requeridas extends Model {

        static associate(models) {
            const tipo_examen = models.tipo_examen;
            
            muestras_requeridas.belongsTo(tipo_examen, {
                foreignKey: 'id_tipo',
                //as: 'determinacions'
            })
        }
    }
    muestras_requeridas.init({
        id_muestras_requeridas: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true, // Esto define el campo como clave primaria
            autoIncrement: true, // Opcional, si el ID es autoincremental
        },
        tipo_muestra: DataTypes.STRING,
        id_tipo: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'muestras_requeridas',
        tableName: 'muestras_requeridas',
        timestamps: false,
    });
    return muestras_requeridas;
};