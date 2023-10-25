
const express = require('express');
const router = express.Router();
const { Paciente } = require('../models');
const { Op } = require('sequelize');
const path = require('path');


router.get('/buscar', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;
    const pacientes = await Paciente.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.like]: `%${busqueda}%` } },
          { apellido: { [Op.like]: `%${busqueda}%` } },
          { dni: { [Op.like]: `%${busqueda}%` } },
        ],
      },
    });

    if (pacientes.length === 0) {
      res.render('index', { noResult: true });
    } else {
      res.render('resultBusquedaP', { pacientes });
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
    fechaNacimiento,
    sexo,
    edad,
    dni,
    obraSocial,
    telefono,
    numeroAfiliado,
    ciudad,
  } = req.body;

  try {
    const nuevoPaciente = await Paciente.create({
      nombre,
      apellido,
      email,
      fechaNacimiento,
      sexo,
      edad,
      dni,
      obraSocial,
      telefono,
      numeroAfiliado,
      ciudad,
    });
    res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });
  } catch (error) {
    console.error('Error al agregar paciente: ', error);
    res.status(500).json({ error: 'Error al agregar paciente' });
  }
});

module.exports = router;





