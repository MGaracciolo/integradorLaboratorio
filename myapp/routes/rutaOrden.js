const express = require('express');
const router = express.Router();
const {orden} = require('../models'); 
const {estado} = require('../models'); 
const {paciente} = require('../models'); 



router.get('/buscarOrden', async (req, res) => {
  try {
    const ordenes = await orden.findAll({
      attributes: [`id_orden`, `diagnostico`, `fecha_ingreso`, `fecha_entrega`, `doctor`, `id_estado`, `observacion`, `id_paciente`, `activo`],
      include: [
        {
          model: estado,
          as: 'estado', // Especifica el alias 'estado'
          attributes: ['id_estado', 'valor', 'descripcion']
        },
        {
          model: paciente,
          as: 'paciente', // Especifica el alias 'estado'
          attributes: ['id_paciente', 'dni', 'nombre', 'apellido']
        },
        {
          model: examen,
          as: 'examen',
          include:[
            {
              model: tipo_examen,
              as: 'tipo_examen', // Especifica el alias 'estado'
              attributes: ['id_tipo','descripcion']
            }
          ]
        }
      ],
    });
    if (ordenes.length === 0) {
      res.render('buscarOrden', {
        noResult: true
      });
    } else {
      res.render('buscarOrden', {
        ordenes
      });
    }
  } catch (error) {
    console.error('Error al buscar ordenes:', error);
    res.status(500).send('Error al buscar ordenes');
  }
});

router.post('/agregarOrden', async (req, res) => {
  // const idPaciente = req.body.id_paciente;
  
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

router.get('/agregarOrden', async (req, res) => {
  try {
    const pacientes = await paciente.findAll({
      attributes: ['id_paciente', 'dni', 'nombre', 'apellido', 'fecha_nacimiento', 'id_obra_social', 'numero_afiliado', 'telefono', 'id_sexo', 'id_direccion', 'id_user'],
    });
    const estados = await estado.findAll({
      attributes: ['id_estado', 'valor', 'descripcion']
    });
    const examenes = await examen.findAll({
      include: [
        {
          model: tipo_examen,
          as: 'tipo_examen',
          attributes: ['id_tipo', 'descripcion']
        },
        {
          model: empleado,
          as: 'empleado',
          attributes: ['id_empleado', 'nombre_empleado', 'apellido_empleado']
        }
      ]
    });
    if (pacientes.length === 0) {
      res.render('orden', {
        noResult: true
      });
    } else {
      res.render('orden', {
        pacientes, estados
      });
    }
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).send('Error al buscar pacientes');
  }
});
  

module.exports = router;