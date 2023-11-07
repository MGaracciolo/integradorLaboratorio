const express = require('express');
const router = express.Router();
const {muestra} = require('../models');
const {tipo_muestra} = require('../models');

router.post('/agregar', async (req, res) => {
    
    const { 
        fecha_recoleccion,
        hora_recoleccion,
        id_tipo_muestra,
        precedencia,
        id_orden
    } = req.body;
    try {
      const nuevaMuestra = await muestra.create({
        fecha_recoleccion,
        hora_recoleccion,
        id_tipo_muestra,
        precedencia,
        id_orden,
      });
      if (nuevaMuestra) {
        const idMuestraCreada = nuevaMuestra.id_muestra;
        res.status(200).json({ mensaje: 'Muestra creada con éxito', id_muestra: idMuestraCreada  })
      }
    } catch (error) {
      console.error('Error al agregar muestra: ', error);
      res.status(500).json({
        error: 'Error al agregar muestra'
      });
    
  }});

  router.get('/buscarMuestra/', async (req, res) => {
    try {
      const tipos_muestra = await tipo_muestra.findAll({
        attributes: ['id_tipo_muestra', 'valor', 'descripcion']
      });
      if (!tipos_muestra || tipos_muestra.length === 0) {
        // Manejar el caso en que no se encuentren tipos de muestra (puedes enviar un mensaje de error o un array vacío)
      res.json( tipos_muestra);
    } else {
      // Enviar las unidades de medida y el idO como JSON
      res.json(tipos_muestra);
    }
    } catch (error) {
      console.error('Error al obtener los tipos de muestra: ' + error);
      res.status(500).json({
        error: 'Error interno del servidor'
      });
    }
  });
  
module.exports = router;