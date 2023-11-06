'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pacientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      apellido: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      fechanacimiento: {
        type: Sequelize.DATE
      },
      sexo: {
        type: Sequelize.INTEGER
      },
      edad: {
        type: Sequelize.INTEGER
      },
      dni: {
        type: Sequelize.INTEGER
      },
      telefono: {
        type: Sequelize.INTEGER
      },
      obraSocial: {
        type: Sequelize.STRING
      },
      numeroAfiliado: {
        type: Sequelize.INTEGER
      },
      ciudad: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pacientes');
  }
};