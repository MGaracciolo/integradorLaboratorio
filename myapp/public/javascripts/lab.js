// lab.js

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