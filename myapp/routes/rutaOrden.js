const express = require('express');
const router = express.Router();
const {orden} = require('../models'); 
const {Op} = require('sequelize');

router.get('/buscarOrden', async (req, res) => {

    try {
      const busqueda = req.query.busqueda;
      const ordenes = await orden.findAll({
        attributes: ['id_orden','fecha_ingreso', 'diagnostico', 'fecha_entrega', 'doctor', 'id_estado', 'observacion', 'id_paciente'],
        where: {
          [Op.or]: [{
              id_orden: {
                [Op.like]: `%${busqueda}%`
              }
            },
            {
              id_paciente: {
                [Op.like]: `%${busqueda}%`
              }
            },
            {
              fecha_ingreso: {
                [Op.like]: `%${busqueda}%`
              }
            },
          ],
        },
      });
      
  
      if (ordenes.length === 0) {
        res.render('index', {
          noResult: true
        });
      } else {
        res.render('resultBusquedaO', {
          ordenes
        });
      }
    } catch (error) {
      console.error('Error al buscar orden:', error);
      res.status(500).send('Error al buscar orden');
    }
  });
  
router.post('/agregarOrden', async (req, res) => {
  const { 
    fecha_ingreso, 
    diagnostico, 
    fecha_entrega, 
    doctor, 
    id_estado, 
    observacion, 
    id_paciente 
  } = req.body;
  try {
    const nuevaOrden = await orden.create({
      fecha_ingreso,
      diagnostico,
      fecha_entrega,
      doctor,
      id_estado,
      observacion,
      id_paciente,
    });
    if (nuevaOrden) {
        res.redirect('/rutaOrden/buscarOrden'); 
    }else{
        console.error(error);
        res.status(500).send('Orden no agregada');
    }

  } catch (error) {
    console.error('Error al agregar orden: ', error);
    res.status(500).json({
      error: 'Error al agregar orden'
    });
  
}});

router.post('/actualizarOrden/:id', async (req, res) => {
  const ordenId = req.params.id;
  const {
    fecha_ingreso, 
    diagnostico, 
    fecha_entrega, 
    doctor, 
    id_estado, 
    observacion, 
    id_paciente 
  } = req.body;

  try {
    const ordenActualizada = await orden.update({
      echa_ingreso, 
    diagnostico, 
    fecha_entrega, 
    doctor, 
    id_estado, 
    observacion, 
    id_paciente 
    }, {
      where: {
        id: ordeneId
      }
    });

    if (ordenActualizada > 0) {
      res.redirect('/rutaOrden/buscar'); // Redireccionar a la página de búsqueda o a donde deseemos
    } else {
      res.status(404).send('Orden no encontrada');
    }
  } catch (error) {
    console.error('Error al actualizar orden:', error);
    res.status(500).send('Error al actualizar orden');
  }
});

module.exports = router;