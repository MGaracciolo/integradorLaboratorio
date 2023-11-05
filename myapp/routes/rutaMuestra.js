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

  router.get('/buscarMuestra', async (req, res) => {
    try {
      const tipos_muestra = await tipo_muestra.findAll({
        attributes: ['id_tipo_muestra', 'valor','descripcion'],
      });
      if (tipos_muestra.length === 0) {
        res.render('/rutaMuestra/agregarr', {
          noResult: true
        });
      } else {
        res.render('/rutaMuestra/agregar', {
          tipos_muestra
        });
      }
    } catch (error) {
      console.error('Error al buscar los tipos de muestra:', error);
      res.status(500).send('Error al buscar los tipos de muestra');
    }
  });
 
     

module.exports = router;