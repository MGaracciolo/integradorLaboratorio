// lab.js

const botonAgregarPaciente = document.getElementById('botonAgregarPaciente');
const botonBuscarPaciente2 = document.getElementById('botonBuscarPaciente2');
const botonPacienteInicio = document.getElementById('NuevoPacienteInicio');
const botonInicio = document.getElementById('botonInicio');
const botonExamenes= document.getElementById('botonExamenes');



botonInicio.addEventListener('click', function () {
  
    window.location.href = "/index"; // Reemplazar '/rutaPantallaPrincipal' con la URL correcta.
});

botonExamenes.addEventListener('click', function () {
    window.location.href = "/examenes"; 
})

const botonNuevoPacienteInicio = document.getElementById('botonNuevoPacienteInicio');
//botonNuevoPacienteInicio.style.display = 'block';

botonNuevoPacienteInicio.addEventListener('click', function () {
 
    contenedorPADRE_NUEVOPACIENTE.style.display = 'block';
   formularioPaciente.style.display = 'block';
  
});



/*
const botonBuscar = document.getElementById('botonBuscar');

botonBuscar.addEventListener('click', function () {
  const busqueda = document.getElementById('busquedaPaciente').value;

  $.get(`/rutaPaciente/buscar?busqueda=${busqueda}`, function (data) {
    $('#tablaResultados tbody').empty();

    data.pacientes.forEach(function (paciente) {
      $('#tablaResultados tbody').append(`
        <tr>
          <td>${paciente.nombre}</td>
          <td>${paciente.apellido}</td>
          <td>${paciente.dni}</td>
          <td>${paciente.email}</td>
          <td>${paciente.fechaNacimiento}</td>
          <td>${paciente.sexo}</td>
          <td>${paciente.edad}</td>
          <td>${paciente.obraSocial}</td>
          <td>${paciente.numeroAfiliado}</td>
          <td>${paciente.telefono}</td>
          <td>${paciente.ciudad}</td>
        </tr>
      `);
    });
  });
});
*/


