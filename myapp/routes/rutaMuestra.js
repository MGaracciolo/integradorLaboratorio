const express = require('express');
const router = express.Router();
const {muestra} = require('../models');

router.post('/agregar', async (req, res) => {
    const { 
        fecha_recoleccion,
        hora_recoleccion,
        id_tipo_muestra,
        precedencia,
        id_orden,
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
        res.redirect('/rutaOrden/agregarOrden');
      }else{
          console.error(error);
          res.status(500).send('Muestra no agregada');
      }
  
    } catch (error) {
      console.error('Error al agregar muestra: ', error);
      res.status(500).json({
        error: 'Error al agregar muestra'
      });
    
  }});

module.exports = router;