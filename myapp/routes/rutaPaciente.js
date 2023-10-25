// routes/rutaPaciente.js
/*
const express = require('express');
const router = express.Router();
const { Paciente } = require("models");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// Ruta para crear un nuevo paciente
router.post('/Paciente', async (req, res) => {
  try {
    // Obtén los datos del paciente desde la solicitud (req.body)
    const { nombre, apellido, telefono, dni, fechaNacimiento, sexo, edad, obraSocial, numeroAfiliado, ciudad } = req.body;
    console.log('Datos del paciente:', nombre, apellido, telefono, dni, fechaNacimiento, sexo, edad, obraSocial, numeroAfiliado, ciudad);

    // Crea un nuevo registro de paciente en la base de datos
    const nuevoPaciente = await Paciente.create({
      nombre,
      apellido,
      telefono,
      dni,
      fecha_nacimiento: fechaNacimiento,
      sexo,
      edad,
      obra_social: obraSocial,
      numero_afiliado: numeroAfiliado,
      ciudad,
    });

    // Devuelve una respuesta exitosa
    res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });
  } catch (error) {
    console.error('Error al agregar paciente:', error);
    res.status(500).json({ error: 'Hubo un error al agregar al paciente. Por favor, inténtalo nuevamente.' });
  }
});

// Otras rutas relacionadas con pacientes, como obtener pacientes, actualizar, borrar, etc.

module.exports = router;



// rutaPaciente.js
const express = require('express');
const router = express.Router();
const Paciente = require('../models').Paciente; // Importa el modelo Paciente

router.post('/agregarPaciente', (req, res) => {
  const datosPaciente = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    fechaNacimiento: req.body.fechaNacimiento,
    sexo: req.body.sexo,
    edad: req.body.edad,
    dni: req.body.dni,
    obraSocial: req.body.obraSocial,
    telefono: req.body.telefono,
    numeroAfiliado: req.body.numeroAfiliado,
    ciudad: req.body.ciudad,
  };

  // Crea un nuevo paciente en la base de datos
  Paciente.create(datosPaciente)
    .then((paciente) => {
      res.json({ message: 'Paciente agregado con éxito', paciente });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al agregar paciente' });
    });
});

module.exports = router;



// routes/rutaPaciente.js

const express = require('express');
const router = express.Router();
const Paciente = require('../models').Paciente;




// Ruta para buscar pacientes por nombre, apellido, o DNI
router.get('/buscar', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;

    // Realiza la búsqueda en la base de datos
    const pacientes = await Paciente.findAll({
      where: {
        [Sequelize.Op.or]: [
          { nombre: { [Sequelize.Op.like]: `%${busqueda}%` } },
          { apellido: { [Sequelize.Op.like]: `%${busqueda}%` } },
          { dni: { [Sequelize.Op.like]: `%${busqueda}%` } },
        ]
      }
    });

    res.status(200).json({ pacientes });
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).json({ error: 'Hubo un error al buscar pacientes. Por favor, inténtalo nuevamente.' });
  }
});


//module.exports = router;



// Ruta para agregar un nuevo paciente
router.post('/agregarPaciente', (req, res, next) => {
  const { nombre, apellido, email, fechaNacimiento, sexo, edad, dni, obraSocial, telefono, numeroAfiliado, ciudad } = req.body;

  Paciente.create({
    nombre,
    apellido,
    email,
    fechaNacimiento,
    sexo,
    edad,
    dni,
    obraSocial,
    telefono,
    numeroAfiliado,
    ciudad,
  })
    .then(() => {
      res.redirect('/?message=Paciente%20agregado%20correctamente'); // Redirige a la página principal con un mensaje
    })
    .catch((error) => {
      console.error('Error al agregar paciente: ', error);
      next(error);
    });
});

module.exports = router;

*/
/* //ultima version andando
const express = require('express');
const router = express.Router();
const { Paciente } = require('../models'); // Importa el modelo Paciente
const { Op } = require('sequelize');

// Requiere la vista Pug
const pug = require('pug');

// Ruta para buscar pacientes por nombre, apellido, o DNI
router.get('/buscar', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;

    // Realiza la búsqueda en la base de datos
    const pacientes = await Paciente.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.like]: `%${busqueda}%` } },
          { apellido: { [Op.like]: `%${busqueda}%` } },
          { dni: { [Op.like]: `%${busqueda}%` } },
        ]
      }
    });

    // Renderiza la vista Pug con los resultados
    const renderizado = pug.renderFile(path.join(__dirname, 'views', 'index.pug'), { pacientes });
    res.send(renderizado);
  } catch (error) {
    console.error('Error al buscar pacientes:', error);

    // Renderiza una vista de error en caso de error
    const renderizadoError = pug.renderFile(path.join(__dirname, 'views', 'error.pug'));
    res.send(renderizadoError);
  }
});




// Ruta para buscar pacientes por nombre, apellido, o DNI

router.get('/buscar', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;

    // Realiza la búsqueda en la base de datos
    const pacientes = await Paciente.findAll({
      where: {
        [Sequelize.Op.or]: [
          { nombre: { [Sequelize.Op.like]: `%${busqueda}%` } },
          { apellido: { [Sequelize.Op.like]: `%${busqueda}%` } },
          { dni: { [Sequelize.Op.like]: `%${busqueda}%` } },
        ]
      }
    });

    // Renderiza la página HTML con los resultados
    res.render('', { pacientes });
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).json({ error: 'Hubo un error al buscar pacientes. Por favor, inténtalo nuevamente.' });
  }
});


// Ruta para agregar un nuevo paciente
router.post('/agregarPaciente', async (req, res, next) => {
  const { nombre, apellido, email, fechaNacimiento, sexo, edad, dni, obraSocial, telefono, numeroAfiliado, ciudad } = req.body;

  try {
    // Crea un nuevo paciente en la base de datos
    const nuevoPaciente = await Paciente.create({
      nombre,
      apellido,
      email,
      fechaNacimiento,
      sexo,
      edad,
      dni,
      obraSocial,
      telefono,
      numeroAfiliado,
      ciudad,
    });

    res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });
  } catch (error) {
    console.error('Error al agregar paciente: ', error);
    res.status(500).json({ error: 'Error al agregar paciente' });
  }
});

module.exports = router;
*/


/*
const express = require('express');
const router = express.Router();
const { Paciente } = require('../models');
const { Op } = require('sequelize');
const path = require('path');
const pug = require('pug');

// Ruta para buscar pacientes por nombre, apellido o DNI
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
      // Si no se encuentra ningún paciente, muestra el formulario "Agregar Nuevo Paciente"
      return res.render('index'); // Suponiendo que 'nuevo_paciente' es el nombre de la vista para el formulario.

     // return res.render('nuevo_paciente'); // Suponiendo que 'nuevo_paciente' es el nombre de la vista para el formulario.
    }

    // Renderiza la vista con los resultados de la búsqueda
    const renderizado = pug.renderFile(
      path.join(__dirname, '..', 'views', 'index.pug'),
      { pacientes }
    );
    res.send(renderizado);
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    const renderizadoError = pug.renderFile(
      path.join(__dirname, '..', 'views', 'error.pug')
    );
    res.send(renderizadoError);
  }
});




// Ruta para agregar un nuevo paciente
router.post('/agregarPaciente', async (req, res, next) => {
  const {
    nombre,
    apellido,
    email,
    fechaNacimiento,
    sexo,
    edad,
    dni,
    obraSocial,
    telefono,
    numeroAfiliado,
    ciudad,
  } = req.body;

  try {
    const nuevoPaciente = await Paciente.create({
      nombre,
      apellido,
      email,
      fechaNacimiento,
      sexo,
      edad,
      dni,
      obraSocial,
      telefono,
      numeroAfiliado,
      ciudad,
    });
    res.status(201)({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });

   // res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });
  } catch (error) {
    console.error('Error al agregar paciente: ', error);
    res.status(500).json({ error: 'Error al agregar paciente' });
  }
});



module.exports = router;
*/



// routes/rutaPaciente.js
/*
const express = require('express');
const router = express.Router();
const { Paciente } = require("models");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// Ruta para crear un nuevo paciente
router.post('/Paciente', async (req, res) => {
  try {
    // Obtén los datos del paciente desde la solicitud (req.body)
    const { nombre, apellido, telefono, dni, fechaNacimiento, sexo, edad, obraSocial, numeroAfiliado, ciudad } = req.body;
    console.log('Datos del paciente:', nombre, apellido, telefono, dni, fechaNacimiento, sexo, edad, obraSocial, numeroAfiliado, ciudad);

    // Crea un nuevo registro de paciente en la base de datos
    const nuevoPaciente = await Paciente.create({
      nombre,
      apellido,
      telefono,
      dni,
      fecha_nacimiento: fechaNacimiento,
      sexo,
      edad,
      obra_social: obraSocial,
      numero_afiliado: numeroAfiliado,
      ciudad,
    });

    // Devuelve una respuesta exitosa
    res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });
  } catch (error) {
    console.error('Error al agregar paciente:', error);
    res.status(500).json({ error: 'Hubo un error al agregar al paciente. Por favor, inténtalo nuevamente.' });
  }
});

// Otras rutas relacionadas con pacientes, como obtener pacientes, actualizar, borrar, etc.

module.exports = router;



// rutaPaciente.js
const express = require('express');
const router = express.Router();
const Paciente = require('../models').Paciente; // Importa el modelo Paciente

router.post('/agregarPaciente', (req, res) => {
  const datosPaciente = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    fechaNacimiento: req.body.fechaNacimiento,
    sexo: req.body.sexo,
    edad: req.body.edad,
    dni: req.body.dni,
    obraSocial: req.body.obraSocial,
    telefono: req.body.telefono,
    numeroAfiliado: req.body.numeroAfiliado,
    ciudad: req.body.ciudad,
  };

  // Crea un nuevo paciente en la base de datos
  Paciente.create(datosPaciente)
    .then((paciente) => {
      res.json({ message: 'Paciente agregado con éxito', paciente });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al agregar paciente' });
    });
});

module.exports = router;



// routes/rutaPaciente.js

const express = require('express');
const router = express.Router();
const Paciente = require('../models').Paciente;




// Ruta para buscar pacientes por nombre, apellido, o DNI
router.get('/buscar', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;

    // Realiza la búsqueda en la base de datos
    const pacientes = await Paciente.findAll({
      where: {
        [Sequelize.Op.or]: [
          { nombre: { [Sequelize.Op.like]: `%${busqueda}%` } },
          { apellido: { [Sequelize.Op.like]: `%${busqueda}%` } },
          { dni: { [Sequelize.Op.like]: `%${busqueda}%` } },
        ]
      }
    });

    res.status(200).json({ pacientes });
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).json({ error: 'Hubo un error al buscar pacientes. Por favor, inténtalo nuevamente.' });
  }
});


//module.exports = router;



// Ruta para agregar un nuevo paciente
router.post('/agregarPaciente', (req, res, next) => {
  const { nombre, apellido, email, fechaNacimiento, sexo, edad, dni, obraSocial, telefono, numeroAfiliado, ciudad } = req.body;

  Paciente.create({
    nombre,
    apellido,
    email,
    fechaNacimiento,
    sexo,
    edad,
    dni,
    obraSocial,
    telefono,
    numeroAfiliado,
    ciudad,
  })
    .then(() => {
      res.redirect('/?message=Paciente%20agregado%20correctamente'); // Redirige a la página principal con un mensaje
    })
    .catch((error) => {
      console.error('Error al agregar paciente: ', error);
      next(error);
    });
});

module.exports = router;






*/
/* //ultima version andando
const express = require('express');
const router = express.Router();
const { Paciente } = require('../models'); // Importa el modelo Paciente
const { Op } = require('sequelize');

// Requiere la vista Pug
const pug = require('pug');

// Ruta para buscar pacientes por nombre, apellido, o DNI
router.get('/buscar', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;

    // Realiza la búsqueda en la base de datos
    const pacientes = await Paciente.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.like]: `%${busqueda}%` } },
          { apellido: { [Op.like]: `%${busqueda}%` } },
          { dni: { [Op.like]: `%${busqueda}%` } },
        ]
      }
    });

    // Renderiza la vista Pug con los resultados
    const renderizado = pug.renderFile(path.join(__dirname, 'views', 'index.pug'), { pacientes });
    res.send(renderizado);
  } catch (error) {
    console.error('Error al buscar pacientes:', error);

    // Renderiza una vista de error en caso de error
    const renderizadoError = pug.renderFile(path.join(__dirname, 'views', 'error.pug'));
    res.send(renderizadoError);
  }
});




// Ruta para buscar pacientes por nombre, apellido, o DNI
/*
router.get('/buscar', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;

    // Realiza la búsqueda en la base de datos
    const pacientes = await Paciente.findAll({
      where: {
        [Sequelize.Op.or]: [
          { nombre: { [Sequelize.Op.like]: `%${busqueda}%` } },
          { apellido: { [Sequelize.Op.like]: `%${busqueda}%` } },
          { dni: { [Sequelize.Op.like]: `%${busqueda}%` } },
        ]
      }
    });

    // Renderiza la página HTML con los resultados
    res.render('', { pacientes });
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).json({ error: 'Hubo un error al buscar pacientes. Por favor, inténtalo nuevamente.' });
  }
});


// Ruta para agregar un nuevo paciente
router.post('/agregarPaciente', async (req, res, next) => {
  const { nombre, apellido, email, fechaNacimiento, sexo, edad, dni, obraSocial, telefono, numeroAfiliado, ciudad } = req.body;

  try {
    // Crea un nuevo paciente en la base de datos
    const nuevoPaciente = await Paciente.create({
      nombre,
      apellido,
      email,
      fechaNacimiento,
      sexo,
      edad,
      dni,
      obraSocial,
      telefono,
      numeroAfiliado,
      ciudad,
    });

    res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });
  } catch (error) {
    console.error('Error al agregar paciente: ', error);
    res.status(500).json({ error: 'Error al agregar paciente' });
  }
});

module.exports = router;
*/

// routes/rutaPaciente.js
/*
const express = require('express');
const router = express.Router();
const { Paciente } = require("models");

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// Ruta para crear un nuevo paciente
router.post('/Paciente', async (req, res) => {
  try {
    // Obtén los datos del paciente desde la solicitud (req.body)
    const { nombre, apellido, telefono, dni, fechaNacimiento, sexo, edad, obraSocial, numeroAfiliado, ciudad } = req.body;
    console.log('Datos del paciente:', nombre, apellido, telefono, dni, fechaNacimiento, sexo, edad, obraSocial, numeroAfiliado, ciudad);

    // Crea un nuevo registro de paciente en la base de datos
    const nuevoPaciente = await Paciente.create({
      nombre,
      apellido,
      telefono,
      dni,
      fecha_nacimiento: fechaNacimiento,
      sexo,
      edad,
      obra_social: obraSocial,
      numero_afiliado: numeroAfiliado,
      ciudad,
    });

    // Devuelve una respuesta exitosa
    res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });
  } catch (error) {
    console.error('Error al agregar paciente:', error);
    res.status(500).json({ error: 'Hubo un error al agregar al paciente. Por favor, inténtalo nuevamente.' });
  }
});

// Otras rutas relacionadas con pacientes, como obtener pacientes, actualizar, borrar, etc.

module.exports = router;



// rutaPaciente.js
const express = require('express');
const router = express.Router();
const Paciente = require('../models').Paciente; // Importa el modelo Paciente

router.post('/agregarPaciente', (req, res) => {
  const datosPaciente = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    fechaNacimiento: req.body.fechaNacimiento,
    sexo: req.body.sexo,
    edad: req.body.edad,
    dni: req.body.dni,
    obraSocial: req.body.obraSocial,
    telefono: req.body.telefono,
    numeroAfiliado: req.body.numeroAfiliado,
    ciudad: req.body.ciudad,
  };

  // Crea un nuevo paciente en la base de datos
  Paciente.create(datosPaciente)
    .then((paciente) => {
      res.json({ message: 'Paciente agregado con éxito', paciente });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Error al agregar paciente' });
    });
});

module.exports = router;



// routes/rutaPaciente.js

const express = require('express');
const router = express.Router();
const Paciente = require('../models').Paciente;




// Ruta para buscar pacientes por nombre, apellido, o DNI
router.get('/buscar', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;

    // Realiza la búsqueda en la base de datos
    const pacientes = await Paciente.findAll({
      where: {
        [Sequelize.Op.or]: [
          { nombre: { [Sequelize.Op.like]: `%${busqueda}%` } },
          { apellido: { [Sequelize.Op.like]: `%${busqueda}%` } },
          { dni: { [Sequelize.Op.like]: `%${busqueda}%` } },
        ]
      }
    });

    res.status(200).json({ pacientes });
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).json({ error: 'Hubo un error al buscar pacientes. Por favor, inténtalo nuevamente.' });
  }
});


//module.exports = router;



// Ruta para agregar un nuevo paciente
router.post('/agregarPaciente', (req, res, next) => {
  const { nombre, apellido, email, fechaNacimiento, sexo, edad, dni, obraSocial, telefono, numeroAfiliado, ciudad } = req.body;

  Paciente.create({
    nombre,
    apellido,
    email,
    fechaNacimiento,
    sexo,
    edad,
    dni,
    obraSocial,
    telefono,
    numeroAfiliado,
    ciudad,
  })
    .then(() => {
      res.redirect('/?message=Paciente%20agregado%20correctamente'); // Redirige a la página principal con un mensaje
    })
    .catch((error) => {
      console.error('Error al agregar paciente: ', error);
      next(error);
    });
});

module.exports = router;

*/
/* //ultima version andando
const express = require('express');
const router = express.Router();
const { Paciente } = require('../models'); // Importa el modelo Paciente
const { Op } = require('sequelize');

// Requiere la vista Pug
const pug = require('pug');

// Ruta para buscar pacientes por nombre, apellido, o DNI
router.get('/buscar', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;

    // Realiza la búsqueda en la base de datos
    const pacientes = await Paciente.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.like]: `%${busqueda}%` } },
          { apellido: { [Op.like]: `%${busqueda}%` } },
          { dni: { [Op.like]: `%${busqueda}%` } },
        ]
      }
    });

    // Renderiza la vista Pug con los resultados
    const renderizado = pug.renderFile(path.join(__dirname, 'views', 'index.pug'), { pacientes });
    res.send(renderizado);
  } catch (error) {
    console.error('Error al buscar pacientes:', error);

    // Renderiza una vista de error en caso de error
    const renderizadoError = pug.renderFile(path.join(__dirname, 'views', 'error.pug'));
    res.send(renderizadoError);
  }
});




// Ruta para buscar pacientes por nombre, apellido, o DNI
/*
router.get('/buscar', async (req, res) => {
  try {
    const busqueda = req.query.busqueda;

    // Realiza la búsqueda en la base de datos
    const pacientes = await Paciente.findAll({
      where: {
        [Sequelize.Op.or]: [
          { nombre: { [Sequelize.Op.like]: `%${busqueda}%` } },
          { apellido: { [Sequelize.Op.like]: `%${busqueda}%` } },
          { dni: { [Sequelize.Op.like]: `%${busqueda}%` } },
        ]
      }
    });

    // Renderiza la página HTML con los resultados
    res.render('', { pacientes });
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).json({ error: 'Hubo un error al buscar pacientes. Por favor, inténtalo nuevamente.' });
  }
});


// Ruta para agregar un nuevo paciente
router.post('/agregarPaciente', async (req, res, next) => {
  const { nombre, apellido, email, fechaNacimiento, sexo, edad, dni, obraSocial, telefono, numeroAfiliado, ciudad } = req.body;

  try {
    // Crea un nuevo paciente en la base de datos
    const nuevoPaciente = await Paciente.create({
      nombre,
      apellido,
      email,
      fechaNacimiento,
      sexo,
      edad,
      dni,
      obraSocial,
      telefono,
      numeroAfiliado,
      ciudad,
    });

    res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });
  } catch (error) {
    console.error('Error al agregar paciente: ', error);
    res.status(500).json({ error: 'Error al agregar paciente' });
  }
});

module.exports = router;
*/





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

    // Generar una tabla HTML con todos los datos
    let tableHtml = '<table>';
    tableHtml += '<thead><tr><th>Nombre</th><th>Apellido</th><th>DNI</th><th>Email</th><th>Fecha de Nacimiento</th><th>Sexo</th><th>Edad</th><th>Obra Social</th><th>Número de Afiliado</th><th>Teléfono</th><th>Ciudad</th></tr></thead>';
    tableHtml += '<tbody>';

    pacientes.forEach((paciente) => {
      tableHtml += `<tr><td>${paciente.nombre}</td><td>${paciente.apellido}</td><td>${paciente.dni}</td><td>${paciente.email}</td><td>${paciente.fechaNacimiento}</td><td>${paciente.sexo}</td><td>${paciente.edad}</td><td>${paciente.obraSocial}</td><td>${paciente.numeroAfiliado}</td><td>${paciente.telefono}</td><td>${paciente.ciudad}</td></tr>`;
    });

    tableHtml += '</tbody></table>';

    res.send(tableHtml);
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).send('Error al buscar pacientes');
  }
});
*/



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

    // Generar una tabla HTML con todos los datos
    let tableHtml = '<table>';
    tableHtml += '<thead><tr><th>Nombre</th><th>Apellido</th><th>DNI</th><th>Email</th><th>Fecha de Nacimiento</th><th>Sexo</th><th>Edad</th><th>Obra Social</th><th>Número de Afiliado</th><th>Teléfono</th><th>Ciudad</th></tr></thead>';
    tableHtml += '<tbody>';

    pacientes.forEach((paciente) => {
      tableHtml += `<tr><td>${paciente.nombre}</td><td>${paciente.apellido}</td><td>${paciente.dni}</td><td>${paciente.email}</td><td>${paciente.fechaNacimiento}</td><td>${paciente.sexo}</td><td>${paciente.edad}</td><td>${paciente.obraSocial}</td><td>${paciente.numeroAfiliado}</td><td>${paciente.telefono}</td><td>${paciente.ciudad}</td></tr>`;
    });

    tableHtml += '</tbody></table>';

    // Si no se encontraron pacientes, mostrar el botón "Nuevo Paciente"
    if (pacientes.length === 0) {
      // Puedes establecer el estilo en "block" para mostrar el botón
      // Cambia "botonNuevoPacienteInicio" por el ID real de tu botón
      const botonNuevoPacienteInicio = document.getElementById('botonNuevoPacienteInicio');
      botonNuevoPacienteInicio.style.display = 'block';
    }

    res.send(tableHtml);
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).send('Error al buscar pacientes');
  }
});
*/
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

    res.render('index', { pacientes });

  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).send('Error al buscar pacientes');
  }
});
*/

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

    // Renderiza la vista index.pug y pasa la variable pacientes
    res.render('resultBusquedaP', { pacientes, noResult: pacientes.length === 0 });
  } catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).send('Error al buscar pacientes');
  }
});

*/

const express = require('express');
const router = express.Router();
const { Paciente } = require('../models');
const { Op } = require('sequelize');
const path = require('path');


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



//ruta para agregar un nuevo paciente
router.post('/agregarPaciente', async (req, res, next) => {
  const {
    nombre,
    apellido,
    email,
    fechaNacimiento,
    sexo,
    edad,
    dni,
    obraSocial,
    telefono,
    numeroAfiliado,
    ciudad,
  } = req.body;

  try {
    const nuevoPaciente = await Paciente.create({
      nombre,
      apellido,
      email,
      fechaNacimiento,
      sexo,
      edad,
      dni,
      obraSocial,
      telefono,
      numeroAfiliado,
      ciudad,
    });
    res.status(201).json({ message: 'Paciente creado con éxito', paciente: nuevoPaciente });
  } catch (error) {
    console.error('Error al agregar paciente: ', error);
    res.status(500).json({ error: 'Error al agregar paciente' });
  }
});

module.exports = router;





