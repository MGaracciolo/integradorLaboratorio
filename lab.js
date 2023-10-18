//lab.js
const botonAgregarPaciente = document.getElementById('botonAgregarPaciente');
const contenedorPADRE_NUEVOPACIENTE = document.getElementById('contenedorPADRE_NUEVOPACIENTE');
const botonBuscarPaciente = document.getElementById('botonBuscarPaciente');
const contenedorPADRE_BUSCARPACIENTE = document.getElementById('contenedorPADRE_BUSCARPACIENTE');
const botonBuscarPaciente2 = document.getElementById('botonBuscarPaciente2');
const tablapacientes = document.getElementById('tablapacientes');
const botonPacienteInicio= document.getElementById('NuevoPacienteInicio');
const contenedorPADRE_NUEVOPACIENTEinicio = document.getElementById('contenedorPADRE_NUEVOPACIENTE');



botonAgregarPaciente.addEventListener('click', function() {
  contenedorPADRE_NUEVOPACIENTE.style.display = 'block';
});

botonBuscarPaciente.addEventListener('click', function() {
  contenedorPADRE_BUSCARPACIENTE.style.display = 'block';
});

botonPacienteInicio.addEventListener('click', function() {
  contenedorPADRE_NUEVOPACIENTE.style.display = 'block';
});

botonBuscarPaciente2.addEventListener('click', function() {
  // Verificamos si se ingreso algun valor en el campo de búsqueda
  const campoBusqueda = document.querySelector('input[placeholder="Ingrese el nombre/apellido/dni del paciente"]');
  if (campoBusqueda.value.trim() !== '') {
    tablapacientes.style.display = 'table'; // Mostrmos la tabla
  }
});





//lab.js
const celdasEditable = document.querySelectorAll('td.editable');
const guardarCambiosBtn = document.getElementById('guardarCambios');

celdasEditable.forEach((celda) => {
  celda.addEventListener('click', () => {
    if (!celda.classList.contains('editing')) {
      celda.classList.add('editing');
      const valorActual = celda.innerText;
      celda.innerHTML = `<input type="text" value="${valorActual}">`;
    }
  });
});

guardarCambiosBtn.addEventListener('click', () => {
  celdasEditable.forEach((celda) => {
    if (celda.classList.contains('editing')) {
      const nuevoValor = celda.querySelector('input').value;
      celda.innerText = nuevoValor;
      celda.classList.remove('editing');
    }
  });
});


