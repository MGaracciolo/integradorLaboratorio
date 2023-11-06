//rutaPaciente
const express = require('express');
const router = express.Router();
const {
  paciente,
  obra_social,
  sexo,
  direccion,
  user
} = require('../models');
const {
  Op
} = require('sequelize');
const path = require('path');


console.log('Antes de la consulta SQL');
/*
router.get('/buscarPacientes', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;

    const pacientes = await paciente.findAll({
      attributes: ['id_paciente', 'dni', 'nombre', 'apellido', 'fecha_nacimiento', 'numero_afiliado', 'telefono', 'id_sexo', 'id_direccion', 'id_user'],
      where: {
        [Op.or]: [
          {
            nombre: {
              [Op.like]: `%${busqueda}%`
            }
          },
          {
            apellido: {
              [Op.like]: `%${busqueda}%`
            }
          },
          {
            dni: {
              [Op.like]: `%${busqueda}%`
            }
          },
        ],
      },
      include: [
        {
          model: obra_social,
          attributes: ['nombre']
        }
      ]
    });

    res.render('resultBusquedaP', {
      pacientes
    });
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).send('Error al buscar pacientes');
  }
});
*/
//ruta para buscar los pacientes
router.get('/buscar', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;
    const pacientes = await paciente.findAll({
      attributes: [
        'id_paciente',
        'dni',
        'nombre',
        'apellido',
        'fecha_nacimiento',
        'id_obra_social',
        'numero_afiliado',
        'telefono',
        'id_sexo',
        'id_direccion',
        'id_user',
      ],
      where: {
        [Op.or]: [{
            nombre: {
              [Op.like]: `%${busqueda}%`,
            },
          },
          {
            apellido: {
              [Op.like]: `%${busqueda}%`,
            },
          },
          {
            dni: {
              [Op.like]: `%${busqueda}%`,
            },
          },
        ],
      },
      include: [{
          model: obra_social,
          attributes: ['nombre'],
        },
        {
          model: sexo,
          attributes: ['valor'],
        },
        {
          model: direccion,
          attributes: ['calle', 'numero'],
        },
        {
          model: user,
          attributes: ['usuario'],
        },
      ],
    });

    if (pacientes.length === 0) {
      res.render('index', {
        noResult: true,
      });
    } else {
      res.render('resultBusquedaP', {
        pacientes,
      });
    }
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).send('Error al buscar pacientes');
  }
});





//ruta para agregar un nuevo paciente
router.post('/agregarPaciente', async (req, res, next) => {
  const {
    dni,
    nombre,
    apellido,
    fecha_nacimiento,
    id_obra_social,
    numero_afiliado,
    telefono,
    id_sexo,
    id_direccion,
    id_user
  } = req.body;

  try {
    const nuevoPaciente = await paciente.create({
      dni,
      nombre,
      apellido,
      fecha_nacimiento,
      id_obra_social,
      numero_afiliado,
      telefono,
      id_sexo,
      id_direccion,
      id_user
    });

    if (nuevoPaciente) {
      res.redirect('/rutaPaciente/buscar'); // Redirige a la ruta de búsqueda
    } else {
      res.status(404).send('Paciente no agregado');
    }
    //alert('Paciente creado con exito');
    //res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });

  } catch (error) {
    console.error('Error al agregar paciente: ', error);
    res.status(500).json({
      error: 'Error al agregar paciente'
    });
  }
});



/*
//editar pacientes
router.get('/editar/:id_paciente', async (req, res) => {
  try {
    const pacienteId = req.params.id_paciente;
    console.log('Paciente ID a editar:', pacienteId);
    const pacienteEditar = await paciente.findByPk(pacienteId, {
      include: [
        {
          model: obra_social,
          attributes: ['nombre'],
        },
        {
          model: sexo,
          attributes: ['valor'],
        },
        {
          model: direccion,
          attributes: ['calle', 'numero'],
        },
        {
          model: user,
          attributes: ['usuario'],
        },
      ],
    });

    if (!pacienteEditar) {
      res.status(404).send('Paciente no encontrado');
      return;
    }

    res.render('editarPaciente', { paciente: pacienteEditar });
  } catch (error) {
    console.error('Error al cargar página de edición:', error);
    res.status(500).send('Error al cargar página de edición');
  }
});


//guardar cambios de edicion
router.post('/guardarCambios/:id_paciente', async (req, res) => {
  try {
    const pacienteId = req.params.id_paciente;
    const updatedPaciente = req.body; // Aquí obtén los datos del formulario enviado por el usuario

    // Realiza la actualización en la base de datos utilizando Sequelize
    await paciente.update(updatedPaciente, {
      where: { id: pacienteId },
    });

    res.redirect('/rutaPaciente/buscar'); // Redirige a la página de búsqueda después de la actualización
  } catch (error) {
    console.error('Error al guardar cambios del paciente:', error);
    res.status(500).send('Error al guardar cambios del paciente');
  }
});


*/


/*
//ruta para agregar un nuevo paciente
router.post('/agregarPaciente', async (req, res, next) => {
  const {
    dni,
    nombre,
    apellido,
    fecha_nacimiento,
    id_obra_social,
    numero_afiliado,
    telefono,
    id_sexo,
    id_direccion,
    id_user
  } = req.body;

  try {
    const nuevoPaciente = await paciente.create({
      dni,
      nombre,
      apellido,
      fecha_nacimiento,
      id_obra_social,
      numero_afiliado,
      telefono,
      id_sexo,
      id_direccion,
      id_user
    });

    if (nuevoPaciente) {
      res.redirect('/rutaPaciente/buscar'); // Redirige a la ruta de búsqueda
    } else {
      res.status(404).send('Paciente no agregado');
    }
    //alert('Paciente creado con exito');
    //res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });

  } catch (error) {
    console.error('Error al agregar paciente: ', error);
    res.status(500).json({
      error: 'Error al agregar paciente'
    });
  }
});
*/

/*
//ruta para agregar un nuevo paciente
router.post('/agregarPaciente', async (req, res, next) => {
  const {
    dni,
    nombre,
    apellido,
    fecha_nacimiento,
    id_obra_social,
    numero_afiliado,
    telefono,
    id_sexo,
    id_direccion,
    id_user
  } = req.body;

  let noResult = false; // Inicializa la variable noResult como falso

  try {
    const nuevoPaciente = await paciente.create({
      dni,
      nombre,
      apellido,
      fecha_nacimiento,
      id_obra_social,
      numero_afiliado,
      telefono,
      id_sexo,
      id_direccion,
      id_user
    });

    if (nuevoPaciente) {
      res.redirect('/rutaPaciente/buscar'); // Redirige a la ruta de búsqueda
    } else {
      noResult = true; // Marca que no se encontró ningún paciente
      res.render('tu_vista', {
        noResult
      }); // Renderiza tu vista con la variable noResult
    }

  } catch (error) {
    console.error('Error al agregar paciente: ', error);
    res.status(500).json({
      error: 'Error al agregar paciente'
    });
  }
});
*/


/*
// Ruta para actualizar el paciente
router.post('/actualizarPaciente/:id_paciente', async (req, res) => {
  const pacienteId = req.params.id_paciente; // Accede al id_paciente desde los parámetros de la ruta
  const {
    dni,
    nombre,
    apellido,
    fecha_nacimiento,
    id_obra_social,
    numero_afiliado,
    telefono,
    id_sexo,
    id_direccion,
    id_user
  } = req.body;

  try {
    const pacienteActualizado = await paciente.update({
      dni,
      nombre,
      apellido,
      fecha_nacimiento,
      id_obra_social,
      numero_afiliado,
      telefono,
      id_sexo,
      id_direccion,
      id_user
    }, {
      where: {
        id_paciente: pacienteId // Utiliza el id_paciente en la condición WHERE
      }
    });

    if (pacienteActualizado > 0) {
      res.redirect('/rutaPaciente/buscar'); // Redireccionar a la página de búsqueda o a donde desees
    } else {
      res.status(404).send('Paciente no encontrado');
    }
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).send('Error al actualizar paciente');
  }
});
*/



/*
router.post('/actualizarPaciente/:id_paciente', async (req, res) => {
  const pacienteId = req.params.id_paciente;
  const {
    dni,
    nombre,
    apellido,
    fecha_nacimiento,
    nombreObraSocial,
    numero_afiliado,
    telefono,
    id_sexo,
    id_direccion,
    id_user
  } = req.body;

  try {
    // Asegúrate de buscar al paciente por su ID antes de intentar actualizarlo
    const buscarPacientes = await paciente.findByPk(pacienteId);

    if (!buscarPacientes) {
      return res.status(404).send('Paciente no encontrado');
    }

    // Actualiza los campos del paciente con los valores de la solicitud POST
    paciente.dni = dni;
    paciente.nombre = nombre;
    paciente.apellido = apellido;
    paciente.fecha_nacimiento = fecha_nacimiento;
    paciente.id_obra_social = id_obra_social;
    paciente.numero_afiliado = numero_afiliado;
    paciente.telefono = telefono;
    paciente.id_sexo = id_sexo;
    paciente.id_direccion = id_direccion;
    paciente.id_user = id_user;

    // Guarda los cambios en la base de datos
    await paciente.save();

    res.redirect('/rutaPaciente/buscar'); // Redireccionar a la página de búsqueda o a donde desees
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).send('Error al actualizar paciente');
  }
});
*/





// Ruta para actualizar un paciente
router.post('/actualizarPaciente/:id_paciente', async (req, res) => {
  const pacienteId = req.params.id_paciente;

  const {
    dni,
    nombre,
    apellido,
    fecha_nacimiento,
    nombreObraSocial,  // Supongo que aquí recibes el nuevo nombre de la obra social
    numero_afiliado,
    telefono,
    id_sexo,
    id_direccion,
    id_user
  } = req.body;

  try {
    // Busca al paciente por su ID y asegúrate de incluir la relación con obra_social
    const pacienteEncontrado = await paciente.findByPk(pacienteId, {
      include: [{ model: obra_social }]
    });

    if (!pacienteEncontrado) {
      return res.status(404).send('Paciente no encontrado');
    }

    // Actualiza los campos del paciente con los valores de la solicitud POST
    pacienteEncontrado.dni = dni;
    pacienteEncontrado.nombre = nombre;
    pacienteEncontrado.apellido = apellido;
    pacienteEncontrado.fecha_nacimiento = fecha_nacimiento;

    // Actualiza el nombre de la obra social asociada al paciente
    if (pacienteEncontrado.obra_social) {
      pacienteEncontrado.obra_social = nombreObraSocial; // Supongo que aquí actualizas el nombre
      //await pacienteEncontrado.obra_social.save();
    }

    // Continúa actualizando los demás campos

    // Guarda los cambios en la base de datos
    await pacienteEncontrado.save();

    res.redirect('/rutaPaciente/buscar'); // Redirige a la página de búsqueda o a donde desees
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).send('Error al actualizar paciente');
  }
});



/*
// Ruta para procesar la actualización de un paciente
router.post('/actualizarPaciente/:id_paciente', async (req, res) => {
  const pacienteId = req.params.id_paciente;
  const {
    dni,
    nombre,
    apellido,
    fecha_nacimiento,
    id_obra_social,
    numero_afiliado,
    telefono,
    id_sexo,
    id_direccion,
    id_user
  } = req.body;

  try {
    // Asegúrate de buscar al paciente por su ID antes de intentar actualizarlo
    const pacienteEncontrado = await paciente.findByPk(pacienteId, {
      include: obra_social, // Incluye la relación con la obra social
    });

    if (!pacienteEncontrado) {
      return res.status(404).send('Paciente no encontrado');
    }

    // Actualiza los campos del paciente con los valores de la solicitud POST
    pacienteEncontrado.dni = dni;
    pacienteEncontrado.nombre = nombre;
    pacienteEncontrado.apellido = apellido;
    pacienteEncontrado.fecha_nacimiento = fecha_nacimiento;
    pacienteEncontrado.numero_afiliado = numero_afiliado;
    pacienteEncontrado.telefono = telefono;
    pacienteEncontrado.id_sexo = id_sexo;
    pacienteEncontrado.id_direccion = id_direccion;
    pacienteEncontrado.id_user = id_user;

    // Actualiza la obra social si se selecciona una opción diferente
    if (id_obra_social) {
      const obraSocialNueva = await obra_social.findByPk(id_obra_social);
      if (obraSocialNueva) {
        pacienteEncontrado.obra_social = obraSocialNueva;
      }
    } else {
      pacienteEncontrado.obra_social = null; // Sin obra social
    }

    // Guarda los cambios en la base de datos
    await pacienteEncontrado.save();

    res.redirect('/rutaPaciente/buscar'); // Redirige a la página de búsqueda o a donde desees
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).send('Error al actualizar paciente');
  }
});


*/


// Ruta para actualizar la obra social
router.post('/actualizarObraSocial/:id_obra_social', async (req, res) => {
  const obraSocialId = req.params.id_obra_social;
  const {
    nombreObraSocial
  } = req.body;

  try {
    const obraSocial = await obra_social.findByPk(obraSocialId);

    if (!obraSocial) {
      return res.status(404).send('Obra social no encontrada');
    }

    // Actualiza el nombre de la obra social con el valor de la solicitud POST
    obraSocial.nombre = nombreObraSocial;

    // Guarda los cambios en la base de datos
    await obraSocial.save();

    res.redirect('/rutaPaciente/buscar'); // Redirige a la página de búsqueda o a donde desees
  } catch (error) {
    console.error('Error al actualizar obra social:', error);
    res.status(500).send('Error al actualizar obra social');
  }
});





// Definir una ruta para obtener las obras sociales disponibles
router.get('/obrasSocialesDisponibles', async (req, res) => {
  try {
    // Consulta la base de datos para obtener las obras sociales disponibles
    const obraSocial = await obra_social.findAll({
      attributes: ['id_obra_social', 'nombre'] // Ajusta esto a tus necesidades
    });

    if (!obraSocial || obraSocial.length === 0) {
      // Manejar el caso en que no se encuentren obras sociales (puedes enviar un mensaje de error o un array vacío)
      res.json([]);
    } else {
      // Enviar las obras sociales como JSON
      res.json(obraSocial);
    }
  } catch (error) {
    console.error('Error al obtener las obras sociales: ' + error);
    res.status(500).json({
      error: 'Error interno del servidor'
    });
  }
});

/*

// Ruta para mostrar el formulario de edición de un paciente
router.get('/editarPaciente/:id_paciente', async (req, res) => {
  const pacienteId = req.params.id_paciente;
  try {
    const pacientes = await paciente.findByPk(pacienteId); // Usar `await paciente.findByPk`
    if (pacientes) {
      res.render('edicionPacientes', { pacientes }); // Cambiar 'pacientes' por 'paciente'
    } else {
      res.status(404).send('Paciente no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener datos del paciente para editar:', error);
    res.status(500).send('Error al obtener datos del paciente para editar');
  }
});




// Ruta para procesar la actualización de un paciente
router.post('/actualizarPaciente/:id', async (req, res) => {
  const pacienteId = req.params.id;
  const { dni, nombre, apellido, fecha_nacimiento, obra_social, numero_afiliado, telefono, id_sexo, id_direccion, id_user } = req.body;

  try {
    const pacienteActualizado = await paciente.update({
      dni, nombre, apellido, fecha_nacimiento, obra_social, numero_afiliado, telefono, id_sexo, id_direccion, id_user
    }, {
      where: { id: pacienteId }
    });

    if (pacienteActualizado > 0) {
      res.redirect('/rutaPaciente/buscar'); // Redireccionar a la página de búsqueda o a donde desees
    } else {
      res.status(404).send('Paciente no encontrado');
    }
  } catch (error) {
    console.error('Error al actualizar paciente:', error);
    res.status(500).send('Error al actualizar paciente');
  }
});


*/


/*
router.post('/rutaPaciente/actualizar/:id', async (req, res) => {
  try {
      const pacienteId = req.params.id;
      const updatedData = req.body;

      // Realiza la actualización en la base de datos utilizando Sequelize
      await paciente.update(updatedData, {
          where: { id_paciente: pacienteId }
      });

      res.status(200).json({ message: 'Paciente actualizado exitosamente' });
  } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el paciente' });
  }
});

*/

/*
router.put('/rutaPaciente/actualizar/:id', async (req, res) => {
  const { id } = req.params;
  const { field, value } = req.body;

  try {
    const paciente = await paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).send('Paciente no encontrado');
    }

    // Actualiza el campo correspondiente
    paciente[field] = value;
    await paciente.save();

    res.status(200).send('Paciente actualizado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar el paciente');
  }
});


// Ruta para mostrar la vista de edición
router.get('/rutaPaciente/editar/:id_paciente', async (req, res) => {
  try {
    const pacientes = await pacientes.findByPk(req.params.id_paciente);
    const obrasSociales = await obra_social.findAll(); // Asume que tienes un modelo 'ObraSocial'
    const sexos = await sexo.findAll(); // Asume que tienes un modelo 'Sexo'

    res.render('editarPaciente', { pacientes, obrasSociales, sexos });
  } catch (error) {
    // Manejar errores
  }
});

// Ruta para procesar la actualización de un paciente
router.post('/rutaPaciente/editar/:id_paciente', async (req, res) => {
  try {
    const pacientes = await paciente.findByPk(req.params.id_paciente);
    if (pacientes) {
      // Actualiza los campos del paciente con los valores del formulario
      paciente.dni = req.body.dni;
      paciente.nombre = req.body.nombre;
      paciente.apellido = req.body.apellido;
      paciente.fecha_nacimiento = req.body.fecha_nacimiento;
      paciente.id_obra_social = req.body.id_obra_social;
      paciente.numero_afiliado = req.body.numero_afiliado;
      paciente.telefono = req.body.telefono;
      paciente.id_sexo = req.body.id_sexo;

      if (paciente.direccion) {
        // Si el paciente tiene una dirección, actualiza sus campos
        paciente.direccion.calle = req.body.calle;
        paciente.direccion.numero = req.body.numero;
        await paciente.direccion.save();
      }

      await paciente.save(); // Guarda los cambios en el paciente

      res.redirect('/rutaPaciente'); // Redirige de vuelta a la lista de pacientes
    }
  } catch (error) {
    // Manejar errores
  }
});
*/



module.exports = router;