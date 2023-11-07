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

//console.log('asdsadasd',muestras_requeridas.findAll());

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


// Ruta para obtener todas las determinaciones
router.get('/determinaciones', async (req, res) => {
  console.log('determinaciones');
  try {
    const deter = await determinacion.findAll();
    res.json(deter);
  } catch (error) {
    console.error('Error al cargar las determinaciones: ' + error);
    res.status(500).json({
      error: 'Error al cargar las determinaciones',
      details: error.message // Agrega detalles de error
    });
  }

});





// Ruta para obtener las muestras requeridas
router.get('/muestrasRequeridas', async (req, res) => {
  try {
    // Consulta la base de datos para obtener las muestras requeridas
    const muestrasRequeridas = await tipo_muestra.findAll();

    // Devuelve las muestras requeridas como respuesta en formato JSON
    res.json(muestrasRequeridas);
  } catch (error) {
    console.error('Error al obtener las muestras requeridas: ', error);
    res.status(500).json({
      message: 'Error al obtener las muestras requeridas'
    });
  }
});

router.post('/crearExamenes', async (req, res) => {
  try {
    const {
      nombreExamen,
      determinaciones, // Un array con los ID de las determinaciones seleccionadas
      id_tipo,
      id_tipo_muestra,

      // Otros datos del formulario
      sexo,
      edad_min,
      edad_max,
      muestras_requeridas,

    } = req.body;

    // Crear un nuevo examen en la base de datos
    const examen = await tipo_examen.create({
      descripcion: nombreExamen,
      id_tipo_muestra: muestras_requeridas
      // Otros campos del examen
    });

    // Asociar las determinaciones al examen
    if (determinaciones && determinaciones.length > 0) {
      await examen.addDeterminaciones(determinaciones); // Utiliza el método addDeterminaciones proporcionado por Sequelize
    }

    const referencias = await referencia.create({
      id_sexo: sexo,
      edad_min,
      edad_max,


    });

    

    


console.log('se creo el examen',muestras_requeridas);
    // Resto de la lógica para asociar otras tablas como muestras requeridas, sexo, etc.
    console.log('referencias', referencias);
    //console.log('examen', muestrasReq);
    if (examen) {
      res.status(200).json({
        message: 'Examen creado con éxito'
      });
    } else {
      res.status(400).json({
        message: 'Error al crear el examen'
      });
    }
  } catch (error) {
    console.error('Error al crear el examen: ', error);
    res.status(500).json({
      message: 'Error al crear el examen'
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
      determinacion,
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



/*
router.get('/buscarExamenes', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;

    // Realiza la consulta SQL utilizando Sequelize, incluyendo las relaciones necesarias
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
              model: referencia,
              as: 'referencia',
              include: [
                {
                  model: sexo,
                  as: 'sexo',
                  attributes: ['valor']
                }
              ]
            },
            {
              model: tipo_examen,
              
              include: [
                {
                  model: tipo_muestra,
                }
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
*/
router.get('/buscarExamenes', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;

    const tipoExamenes = await tipo_examen.findAll({
      attributes: ['id_tipo', 'descripcion'],
      where: {
        descripcion: {
          [Op.like]: `%${busqueda}%`
        }
      },
      include: [{
          model: determinacion,
          as: 'determinaciones',
          include: [{
              model: unidad_medida
            },
            {
              model: referencia,
              as: 'referencia',
              include: [{
                model: sexo,
                as: 'sexo',
                attributes: ['valor']
              }]
            }
          ]
        },
        {
          model: tipo_muestra,
          attributes: ['valor'], // Incluye las muestras requeridas

        }
      ]
    });
    console.log('tipo', tipoExamenes);

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
    const nuevoExamen = await tipo_examen.create({
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





/*
router.post('/crearExamenes', async (req, res) => {
  try {
    // Extraer los datos del formulario de req.body
    const {
      nombreExamen,
      nombreDeterminacion,
      sexo,
      unidadMedida,
      edadMin,
      edadMax,
      minimo,
      maximo,
      muestras
    } = req.body;

    // Crea un nuevo examen en la base de datos
    const examenes = await tipo_examen.create({
      descripcion: nombreExamen,
    });

    // Crea una nueva determinación relacionada con el examen
    const determinacions = await determinacion.create({
      nombre: nombreDeterminacion,
      id_unidad_medida: unidadMedida, // Asegúrate de usar la columna correcta para la unidad de medida
      id_referencia: referencia.id, // Asegúrate de tener la referencia adecuada
      id_tipo: examenes.id, // Asocia la determinación al examen
    });

    // Crea una referencia para la determinación
    const referencias = await referencia.create({
      edad_min: edadMin,
      edad_max: edadMax,
      id_sexo: sexo,
      minimo,
      maximo,
      id_determinacion: determinacions.id, // Asocia la referencia a la determinación
    });

    // Crea las muestras requeridas
    await Promise.all(muestras.map(async (muestra) => {
      const tipoMuestra = await tipo_muestra.findOne({
        where: {
          valor: muestra
        }
      });
      if (tipoMuestra) {
        await muestras_requeridas.create({
          id_tipo_muestra: tipoMuestra.id,
          id_determinacion: determinacions.id,
        });
      }
    }));
    console.log('Examen creado:', examenes);
    console.log('Determinación creada:', determinacions);
    console.log('Referencia creada:', referencias);


    if (referencias && examenes && determinacions) {
      res.status(200).json({
        message: 'Examen creado con éxito'
      });
    } else {
      res.status(400).json({
        message: 'Error al crear el examen'
      });
    }
  } catch (error) {
    console.error('Error al crear el examen: ', error);
    res.status(500).json({
      message: 'Error al crear el examen'
    });
  }
});

*/
/*
router.post('/crearExamenes', async (req, res) => {
  try {
    const {
      nombreExamen,
      determinaciones, // Un array con las determinaciones seleccionadas
      sexo,
      muestrasRequeridas, // Un array con las muestras requeridas seleccionadas
      edad_min,
      edad_max,
      minimo,
      maximo,
    } = req.body;

    // Crear un nuevo examen en la base de datos
    const examen = await tipo_examen.create({
      descripcion: nombreExamen,
    });

    // Asociar las determinaciones al examen
    if (determinaciones && determinaciones.length > 0) {
      await determinacion.bulkCreate(determinaciones.map(determinacionId => {
        return {
          nombre: 'Nombre Determinacion', // Puedes asignar un nombre o buscarlo en tu base de datos
          id_tipo: examen.id_tipo,
          // Otras propiedades que necesites
        };
      }));
    }
    const referencias = await referencia.create({
      edad_min,
      edad_max,
      minimo,
      maximo,
      id_sexo: sexo,
    });
/*
    // Asociar el sexo al examen
    await referencia.create({
      edad_min,
      edad_max,
     // minimo,
     // maximo,
      id_sexo: sexo,
      //id_tipo: examen.id_tipo,
      // Otras propiedades que necesites
    });

    // Asociar las muestras requeridas al examen a través de la tabla intermedia muestras_requeridas
    if (muestrasRequeridas && muestrasRequeridas.length > 0) {
      await muestras_requeridas.bulkCreate(muestrasRequeridas.map(muestra => {
        return {
          id_tipo: examen.id_tipo,
          id_tipo_muestra: muestra, // Asigna el ID de la muestra requerida
        };
      }));
    }

    console.log('referencias', referencias);
    if (examen) {
      res.status(200).json({
        message: 'Examen creado con éxito'
      });
    } else {
      res.status(400).json({
        message: 'Error al crear el examen'
      });
    }
  } catch (error) {
    console.error('Error al crear el examen: ', error);
    res.status(500).json({
      message: 'Error al crear el examen'
    });
  }
});
*/







router.post('/crearExamenesssss', async (req, res) => {
  try {
    // Extraer los datos del formulario de req.body
    const {
      nombreExamen,
      edad_min,
      edad_max,
      minimo,
      maximo,
      sexo,

      nombreDeterminacion,


    } = req.body;

    // Crea un nuevo examen en la base de datos
    const examenes = await tipo_examen.create({
      descripcion: nombreExamen,
    });



    const referencias = await referencia.create({
      edad_min,
      edad_max,
      minimo,
      maximo,
      id_sexo: sexo,
    })

    const deter = await determinacion.create({
      nombre: nombreDeterminacion,
      id_unidad_medida: unidad_medida, // Asegurate de usar la columna correcta para la unidad de medida
      id_referencia: referencias.id, // Asegurate de tener la referencia adecuada
      id_tipo: examenes.id, // Asocia la determinacion al examen
    })


    console.log('referencias', referencias);
    console.log('Examen creado:', examenes);
    if (examenes) {
      res.status(200).json({
        message: 'Examen creado con éxito'
      });
    } else {
      res.status(400).json({
        message: 'Error al crear el examen'
      });
    }
  } catch (error) {
    console.error('Error al crear el examen: ', error);
    res.status(500).json({
      message: 'Error al crear el examen'
    });
  }
});






module.exports = router;