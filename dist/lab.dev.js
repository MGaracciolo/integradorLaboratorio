"use strict";

//lab.js
var botonAgregarPaciente = document.getElementById('botonAgregarPaciente');
var contenedorPADRE_NUEVOPACIENTE = document.getElementById('contenedorPADRE_NUEVOPACIENTE');
var botonBuscarPaciente = document.getElementById('botonBuscarPaciente');
var contenedorPADRE_BUSCARPACIENTE = document.getElementById('contenedorPADRE_BUSCARPACIENTE');
var botonBuscarPaciente2 = document.getElementById('botonBuscarPaciente2');
var tablapacientes = document.getElementById('tablapacientes');
var botonPacienteInicio = document.getElementById('NuevoPacienteInicio');
var contenedorPADRE_NUEVOPACIENTEinicio = document.getElementById('contenedorPADRE_NUEVOPACIENTE');
botonAgregarPaciente.addEventListener('click', function () {
  contenedorPADRE_NUEVOPACIENTE.style.display = 'block';
});
botonBuscarPaciente.addEventListener('click', function () {
  contenedorPADRE_BUSCARPACIENTE.style.display = 'block';
});
botonPacienteInicio.addEventListener('click', function () {
  contenedorPADRE_NUEVOPACIENTE.style.display = 'block';
});
botonBuscarPaciente2.addEventListener('click', function () {
  // Verificamos si se ingreso algun valor en el campo de búsqueda
  var campoBusqueda = document.querySelector('input[placeholder="Ingrese el nombre/apellido/dni del paciente"]');

  if (campoBusqueda.value.trim() !== '') {
    tablapacientes.style.display = 'table'; // Mostrmos la tabla
  }
}); //lab.js

var celdasEditable = document.querySelectorAll('td.editable');
var guardarCambiosBtn = document.getElementById('guardarCambios');
celdasEditable.forEach(function (celda) {
  celda.addEventListener('click', function () {
    if (!celda.classList.contains('editing')) {
      celda.classList.add('editing');
      var valorActual = celda.innerText;
      celda.innerHTML = "<input type=\"text\" value=\"".concat(valorActual, "\">");
    }
  });
});
guardarCambiosBtn.addEventListener('click', function () {
  celdasEditable.forEach(function (celda) {
    if (celda.classList.contains('editing')) {
      var nuevoValor = celda.querySelector('input').value;
      celda.innerText = nuevoValor;
      celda.classList.remove('editing');
    }
  });
});