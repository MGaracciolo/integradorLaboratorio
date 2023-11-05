//rutaPaciente
const express = require('express');
const router = express.Router();
const {
  paciente
} = require('../models');
const {
  Op
} = require('sequelize');
const path = require('path');
//const paciente2 = require('../models');
// Configurar el middleware 'method-override' para usar el put

console.log('Antes de la consulta SQL');
router.get('/buscar', async (req, res) => {

  try {
    const busqueda = req.query.busqueda;
    const pacientes = await paciente.findAll({
      attributes: ['id_paciente', 'dni', 'nombre', 'apellido', 'fecha_nacimiento', 'id_obra_social', 'numero_afiliado', 'telefono', 'id_sexo', 'id_direccion', 'id_user'],
      where: {
        [Op.or]: [{
            nombre: {
              [Op.like]: `%${busqueda}%`
            }
          },
          {
            apellido: {
              [Op.like]: `%${busqueda}%`
            }
          },
          {
            dni: {
              [Op.like]: `%${busqueda}%`
            }
          },
        ],
      },
    });
    

    if (pacientes.length === 0) {
      res.render('index', {
        noResult: true
      });
    } else {
      res.render('resultBusquedaP', {
        pacientes
      });
    }
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).send('Error al buscar pacientes');
  }
});



//ruta para agregar un nuevo paciente
router.post('/agregarPaciente', async (req, res, next) => {
  const {
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
  } = req.body;

  try {
    const nuevoPaciente = await paciente.create({
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

    if (nuevoPaciente) {
      res.redirect('/rutaPaciente/buscar'); // Redirige a la ruta de búsqueda
    } else {
      res.status(404).send('Paciente no agregado');
    }
    //alert('Paciente creado con exito');
    //res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });

  } catch (error) {
    console.error('Error al agregar paciente: ', error);
    res.status(500).json({
      error: 'Error al agregar paciente'
    });
  }
});


/*
// Ruta para actualizar el paciente
router.post('/actualizarPaciente/:id', async (req, res) => {
  console.log('esta entrando');
  const pacienteId = req.params.id;
  const {
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
  } = req.body;

  try {
    const pacienteActualizado = await paciente.update({
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
    }, {
      where: {
        id: pacienteId
      }
    });

    if (pacienteActualizado > 0) {
      res.redirect('/rutaPaciente/buscar'); // Redireccionar a la página de búsqueda o a donde deseemos
    } else {
      res.status(404).send('Paciente no encontrado');
    }
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).send('Error al actualizar paciente');
  }
});
*/

// Ruta para mostrar el formulario de edición de un paciente


// Ruta para mostrar el formulario de edición de un paciente
router.get('/editarPaciente/:id', async (req, res) => {
  const pacienteId = req.params.id;
  try {
    const pacientes = await paciente.findByPk(pacienteId); // Usar `await paciente.findByPk`
    if (pacientes) {
      res.render('edicionPacientes', { pacientes }); // Cambiar 'pacientes' por 'paciente'
    } else {
      res.status(404).send('Paciente no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener datos del paciente para editar:', error);
    res.status(500).send('Error al obtener datos del paciente para editar');
  }
});




// Ruta para procesar la actualización de un paciente
router.post('/actualizarPaciente/:id', async (req, res) => {
  const pacienteId = req.params.id;
  const { dni, nombre, apellido, fecha_nacimiento, id_obra_social, numero_afiliado, telefono, id_sexo, id_direccion, id_user } = req.body;

  try {
    const pacienteActualizado = await paciente.update({
      dni, nombre, apellido, fecha_nacimiento, id_obra_social, numero_afiliado, telefono, id_sexo, id_direccion, id_user
    }, {
      where: { id: pacienteId }
    });

    if (pacienteActualizado > 0) {
      res.redirect('/rutaPaciente/buscar'); // Redireccionar a la página de búsqueda o a donde desees
    } else {
      res.status(404).send('Paciente no encontrado');
    }
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).send('Error al actualizar paciente');
  }
});





module.exports = router;