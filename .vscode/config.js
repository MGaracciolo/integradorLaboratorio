//config.js

//module.exports = new Sequelize('laboratorio_1', '', '', {
 //otra forma,


// config.js: para configurar la conexión a la base de datos
const Sequelize = require('sequelize');

const sequelize = new Sequelize('laboratorio_1', {
  host: 'localhost',
  dialect: 'mysql', // Puedes cambiarlo si estás usando otro dialecto de base de datos
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });

module.exports = sequelize;
