const express = require('express');
const router = express.Router();
const {orden} = require('../models'); 
const {estado} = require('../models'); 
const {paciente} = require('../models'); 
const {Op} = require('sequelize');



router.get('/buscar', async (req, res) => {
  try {
    const ordenes = await orden.findAll({
      attributes: [`id_orden`, `diagnostico`, `fecha_ingreso`, `fecha_entrega`, `doctor`, `id_estado`, `observacion`, `id_paciente`, `activo`],
      include: [
        {
          model: estado,
          as: 'estado' // Especifica el alias 'estado'
        },
        {
          model: paciente,
          as: 'paciente', // Especifica el alias 'estado'
          attributes: ['id_paciente', 'dni', 'nombre', 'apellido']
        }
      ],
    });
    if (ordenes.length === 0) {
      res.render('orden', {
        noResult: true
      });
    } else {9
      res.render('orden', {
        ordenes
      });
    }
  } catch (error) {
    console.error('Error al buscar ordenes:', error);
    res.status(500).send('Error al buscar ordenes');
  }
});

// router.post('/agregarOrden', async (req, res) => {
//   const { 
//     fecha_ingreso, 
//     diagnostico, 
//     fecha_entrega, 
//     doctor, 
//     id_estado, 
//     observacion, 
//     id_paciente 
//   } = req.body;
//   try {
//     const nuevaOrden = await orden.create({
//       fecha_ingreso,
//       diagnostico,
//       fecha_entrega,
//       doctor,
//       id_estado,
//       observacion,
//       id_paciente,
//     });
//     if (nuevaOrden) {
//         res.redirect('/rutaOrden/buscarOrden'); 
//     }else{
//         console.error(error);
//         res.status(500).send('Orden no agregada');
//     }

//   } catch (error) {
//     console.error('Error al agregar orden: ', error);
//     res.status(500).json({
//       error: 'Error al agregar orden'
//     });
  
// }});

  

module.exports = router;