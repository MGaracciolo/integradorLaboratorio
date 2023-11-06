'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('muestras', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fecharecoleccion: {
        type: Sequelize.DATE
      },
      horaRecoleccion: {
        type: Sequelize.TIME
      },
      tipoMuestra: {
        type: Sequelize.STRING
      },
      precedencia: {
        type: Sequelize.INTEGER
      },
      id_Orden: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('muestras');
  }
};