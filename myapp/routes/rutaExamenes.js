const express = require('express');
const router = express.Router();
const { tipoExamene } = require('../models');
const { Op } = require('sequelize');
const path = require('path');

/*
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
  */

  router.post('/agregarExamen', async (req, res, next) => {
    const {
      descripcion,
    } = req.body;
  
    try {
      const nuevoExamen = await tipoExamene.create({
        descripcion,
      });
      res.status(201).json({ message: 'Examen creado con éxito', tipoExamene: nuevoExamen });
    } catch (error) {
      console.error('Error al agregar examen: ', error);
      res.status(500).json({ error: 'Error al agregar examen' });
    }
  });
  
  module.exports = router;