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
// Configurar el middleware 'method-override' para usar el put


router.get('/buscar', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;
    const pacientes = await paciente.findAll({
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
    nombre,
    apellido,
    email,
    fecha_nacimiento,
    sexo,
    embarazada,
    dni,
    obra_social,
    numero_afiliado,
    telefono,
    ciudad
  } = req.body;

  try {
    const nuevoPaciente = await paciente.create({
      nombre,
      apellido,
      email,
      fecha_nacimiento,
      sexo,
      embarazada,
      dni,
      obra_social,
      telefono,
      numero_afiliado,
      ciudad,
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


// Ruta para actualizar el paciente
router.post('/actualizarPaciente/:id', async (req, res) => {
  console.log('esta entrando');
  const pacienteId = req.params.id;
  const {
    nombre,
    apellido,
    email,
    fechaNacimiento,
    sexo,
    embarazada,
    dni,
    obraSocial,
    numeroAfiliado,
    telefono,
    ciudad
  } = req.body;

  try {
    const pacienteActualizado = await paciente.update({
      nombre,
      apellido,
      email,
      fecha_nacimiento: fechaNacimiento,
      sexo,
      embarazada,
      dni,
      obra_social: obraSocial,
      numero_afiliado: numeroAfiliado,
      telefono,
      ciudad,
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



module.exports = router;