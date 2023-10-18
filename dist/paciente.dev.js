"use strict";

// models/Paciente.js
var Sequelize = require('sequelize');

var sequelize = require('../sequelize'); // Importa la instancia de Sequelize


var paciente = sequelize.define('paciente', {
  nombre: Sequelize.STRING,
  apellido: Sequelize.STRING,
  dni: Sequelize.STRING,
  fecha_nacimiento: Sequelize.DATE,
  sexo: Sequelize.STRING,
  edad: Sequelize.INTEGER,
  obra_social: Sequelize.STRING,
  telefono: Sequelize.STRING,
  ciudad: Sequelize.STRING
}, {
  tableName: 'paciente' // aca va El nombre de la tabla en la base de datos
  // timestamps: false, // Si no usamos campos de 'createdAt' y 'updatedAt'

});
module.exports = paciente;