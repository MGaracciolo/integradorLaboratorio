const express = require('express');
const router = express.Router();
const {
  Op
} = require('sequelize');
const {
  tipo_examen,
  determinacion,
  unidad_medida,
  referencia,
  muestras_requeridas,
  sexo,
  valor,
  tipo_muestra
} = require('../models');
//const tipo_muestra = require('../models/tipo_muestra');


/*
router.get('/crearExamen', async (req, res) => {
  try {
    const unidadesMedida = await unidad_medida.findAll({ attributes: ['id_unidad_medida', 'unidad','descripcion'] });
    console.log('Unidades de Medida:', unidadesMedida);
    if (!unidadesMedida) {
      throw new Error('No se encontraron unidades de medida');
    }
    const unidadesArray = unidadesMedida.map((unidad) => ({
      id: unidad.id_unidad_medida,
      unidad: unidad.unidad,
    }));

    const determinaciones = await determinacion.findAll();
    const muestras = await muestras_requeridas.findAll();

    res.render('examenes', {
      unidadesMedida: unidadesArray,
      determinaciones,
      muestras,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});
*/



router.get('/unidadMedidaSelect', async (req, res) => {
  try {
    const unidadesMedida = await unidad_medida.findAll({
      attributes: ['id_unidad_medida', 'unidad', 'descripcion']
    });
    if (!unidadesMedida || unidadesMedida.length === 0) {
      // Manejar el caso en que no se encuentren unidades de medida (puedes enviar un mensaje de error o un array vacío)
      res.json([]);
    } else {
      // Enviar las unidades de medida como JSON
      res.json(unidadesMedida);
    }
  } catch (error) {
    console.error('Error al obtener las unidades de medida: ' + error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});





router.get('/crearExamen', async (req, res) => {
  try {
    const unidadesMedida = await unidad_medida.findAll({
      attributes: ['id_unidad_medida', 'unidad', 'descripcion'],
    });
    console.log('Unidades de Medida:', unidadesMedida);

    if (!unidadesMedida || unidadesMedida.length === 0) {
      throw new Error('No se encontraron unidades de medida');
    }
    // Verifica si unidadesMedida no está definido o está vacío y asigna una matriz vacía en su lugar
    if (!unidadesMedida || unidadesMedida.length === 0) {
      unidadesMedida = [];
    }
    res.render('examenes', {
      unidadesMedida,
      determinaciones,
      muestras
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});





// Agregar una ruta para manejar la creación de exámenes
router.post('/crearExamens', async (req, res) => {
  try {
    const {
      unidadMedida,
      /* otros campos del formulario */
    } = req.body;

    // Verifica que la unidad de medida seleccionada exista en la base de datos
    const unidadesMedida = unidadesMedida.find((u) => u.id_unidad_medida === unidadMedida);

    if (!unidadMedida) {
      return res.status(400).send('Unidad de medida no válida');
    }

    // Aquí puedes crear el examen en la base de datos, asegurándote de que los datos sean válidos

    // Ejemplo:
    const nuevoExamen = await examen.create({
      unidad_medida: unidadMedida.unidad,
      /* otros campos del examen */
    });

    // Redirigir a una página de confirmación o a donde desees
    res.redirect('/examenes');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});




router.get('/buscarExamenes', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;
    
    // Realiza la consulta SQL utilizando Sequelize, incluyendo las relaciones
    const tipoExamenes = await tipo_examen.findAll({
      attributes: ['id_tipo', 'descripcion'],
      where: {
        descripcion: {
          [Op.like]: `%${busqueda}%`
        }
      },
      include: [
        {
          model: determinacion,
          as: 'determinacions',
          include: [
            {
              model: unidad_medida
            },

            {
              model:tipo_examen,
              
              include: [
                {
                  model:muestras_requeridas,
                      as:'m',
                  include: [
                    {
                      model: tipo_muestra,
                    
                    }
                  ]
                },
              ]
            },
          
            {
              model: referencia,
              as: 'referencia',
              include: [
                {
                  model: sexo,
                  as: 'sexo',
                  attributes: ['valor'] 
                },
                
              ]

            }
           
          ]
        }
      ]
    });

    res.render('examenesResult', {
      tipoExamenes
    });
  } catch (error) {
    console.error('Error al buscar exámenes:', error);
    res.status(500).send('Error al buscar exámenes');
  }
});





router.post('/agregarExamen', async (req, res, next) => {
  const {
    descripcion,
  } = req.body;

  try {
    const nuevoExamen = await tipoExamen.create({
      descripcion,
    });
    res.status(201).json({
      message: 'Examen creado con éxito',
      tipoExamene: nuevoExamen
    });
  } catch (error) {
    console.error('Error al agregar examen: ', error);
    res.status(500).json({
      error: 'Error al agregar examen'
    });
  }
});

module.exports = router;
