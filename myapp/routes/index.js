var express = require('express');
var router = express.Router();
const { User } = require("../models"); // Cambiado de .paciente a .User
const bodyParser = require('body-parser');
const { Op } = require('sequelize');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'TreeLabWM' });
});





router.post('/paciente', async (req, res) => {
  try {
    // Obtén los datos del paciente desde la solicitud (req.body)
    const { dni,
      nombre,
      apellido,
      fecha_nacimiento,
      id_obra_social,
      numero_afiliado,
      telefono,
      id_sexo,
      id_direccion,
      id_user} = req.body;
    console.log('Datos del paciente:', dni,
    nombre,
    apellido,
    fecha_nacimiento,
    id_obra_social,
    numero_afiliado,
    telefono,
    id_sexo,
    id_direccion,
    id_user);

    // Crea un nuevo registro de paciente en la base de datos
    const nuevoPaciente = await User.create({ // Cambiado de paciente.create a User.create
      dni,
      nombre,
      apellido,
      fecha_nacimiento,
      id_obra_social,
      numero_afiliado,
      telefono,
      id_sexo,
      id_direccion,
      id_user
    });

    // Devuelve una respuesta exitosa
    res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });
  } catch (error) {
    console.error('Error al agregar paciente:', error);
    res.status(500).json({ error: 'Hubo un error al agregar al paciente. Por favor, inténtalo nuevamente.' });
  }
});

module.exports = router;
