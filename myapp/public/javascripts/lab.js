
/*

const botonAgregarPaciente = document.getElementById('botonAgregarPaciente');
const botonBuscarPaciente = document.getElementById('botonBuscarPaciente');
const botonInicio = document.getElementById('botonInicio');
const botonExamenes = document.getElementById('botonExamenes');
const tablaPacientes = document.getElementById('examenesTable');
const botonNuevoPacienteInicio = document.getElementById('botonNuevoPaciente');

const contenedorPADRE_NUEVOPACIENTE = document.getElementById('contenedorPADRE_NUEVOPACIENTE');


botonInicio.addEventListener('click', function () {
    window.location.href = "/index";
});

botonExamenes.addEventListener('click', function () {
    window.location.href = "/examenes";
});

// Agrega un evento click al botón "Nuevo Paciente"






function updateNombreObraSocial() {
  var obraSocialSelect = document.getElementById('obraSocialSelect');
  var nombreObraSocialField = document.getElementById('nombreObraSocial');

  var selectedOption = obraSocialSelect.options[obraSocialSelect.selectedIndex].text;

  nombreObraSocialField.value = selectedOption;
}
*/

const botonInicio = document.getElementById('botonInicio');
const botonBuscarPaciente = document.getElementById('botonBuscarPaciente');
const botonAgregarPaciente = document.getElementById('botonAgregarPaciente');
const botonAgregarOrden =document.getElementById('botonAgregarOrden');
const botonBuscarOrden =document.getElementById('botonBuscarOrden');
const botonExamenes=document.getElementById('botonExamenes');
const botonNuevoPacienteInicio = document.getElementById('botonNuevoPacienteInicio');

botonInicio.addEventListener('click', function () {
    window.location.href = "/index"; 
}); 
botonBuscarPaciente.addEventListener('click', function () {
    window.location.href = "/index"; 
})
botonAgregarPaciente.addEventListener('click', function(){
    window.location.href="/rutaPaciente/buscar"
});
botonAgregarOrden.addEventListener('click', function () {
    window.location.href = "/rutaOrden/agregarOrden"; 
})
botonBuscarOrden.addEventListener('click', function () {
    window.location.href = "/rutaOrden/buscarOrden"; 
});
botonExamenes.addEventListener('click', function () {
    window.location.href = "/examenes"; 
});
botonNuevoPacienteInicio.addEventListener('click', function () {
    contenedorPADRE_NUEVOPACIENTE.style.display = 'block';
    formularioPaciente.style.display = 'block';
});