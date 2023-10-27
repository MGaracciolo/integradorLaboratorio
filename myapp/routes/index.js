var express = require('express');
var router = express.Router();
const { User } = require("../models/").paciente;
const bodyParser = require('body-parser');
const {Op} = require('sequelize');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'TreeLabWM' });
});

router.post('/Paciente', async (req, res) => {
    try {
      // Obtén los datos del paciente desde la solicitud (req.body)
      const { nombre, apellido, telefono, dni, fechaNacimiento, sexo, edad, obraSocial, numeroAfiliado, ciudad } = req.body;
      console.log('Datos del paciente:', nombre, apellido, telefono, dni, fechaNacimiento, sexo, edad, obraSocial, numeroAfiliado, ciudad);
  
      // Crea un nuevo registro de paciente en la base de datos
      const nuevoPaciente = await Paciente.create({
        nombre,
        apellido,
        telefono,
        dni,
        fecha_nacimiento: fechaNacimiento,
        sexo,
        edad,
        obra_social: obraSocial,
        numero_afiliado: numeroAfiliado,
        ciudad,
      });
  
      // Devuelve una respuesta exitosa
      res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });
    } catch (error) {
      console.error('Error al agregar paciente:', error);
      res.status(500).json({ error: 'Hubo un error al agregar al paciente. Por favor, inténtalo nuevamente.' });
    }
  });
  



module.exports = router;

