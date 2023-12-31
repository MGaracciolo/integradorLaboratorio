//app.js
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const { Sequelize } = require('sequelize');
const config = require('./config/config.json');
const fs = require('fs');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host,
  dialect: config.development.dialect,
});

// Carga todos los modelos desde la carpeta "models"
const modelsPath = path.join(__dirname, 'models');
const models = [];

fs.readdirSync(modelsPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const model = require(path.join(modelsPath, file));
    models.push(model);
  }
});

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Base de datos sincronizada correctamente');
  } catch (error) {
    console.error('Error al sincronizar la base de datos:', error);
  }
})();





const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const rutaPacienteRouter = require('./routes/rutaPaciente');
const rutaExamenesRouter = require('./routes/rutaExamenes');
const rutaOrdenRouter = require('./routes/rutaOrden');
const rutaMuestraRouter = require('./routes/rutaMuestra');
//const deterValoresR = require('./routes/deter-valoresR'); // Utiliza la ruta relativa correcta

const app = express();












app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/rutaPaciente', rutaPacienteRouter);
app.use('/rutaExamenes', rutaExamenesRouter);
app.use('/rutaOrden',rutaOrdenRouter);
app.use('/rutaMuestra',rutaMuestraRouter);
//app.use('/deter-valoresR', deterValoresR);

app.get('/index', (req, res) => {
  res.render('index');
});

app.get('/examenes', (req, res) => {
  res.render('examenes');
})

app.get('/rutaOrden/:tipoOrden', (req, res) => {
  const tipoOrden = req.params.tipoOrden;

  if (tipoOrden === 'buscarOrden') {
    res.render('buscarOrden'); // Renderiza buscarOrden.pug si se accede a rutaOrden/buscarOrden
  } else if (tipoOrden === 'agregarOrden') {
    res.render('orden'); // Renderiza orden.pug si se accede a rutaOrden/agregarOrden
  } else {
    res.send('Orden no encontrada'); // Manejo de situaciones donde el tipo de orden no coincide
  }
});


app.get('/examenesResult', (req, res) => {
  res.render('examenesResult');
})

app.get('/muestra', (req, res) => {
  res.render('muestra');
})

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
