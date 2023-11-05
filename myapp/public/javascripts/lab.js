// lab.js

const botonAgregarPaciente = document.getElementById('botonAgregarPaciente');
const botonBuscarPaciente2 = document.getElementById('botonBuscarPaciente2');
const botonPacienteInicio = document.getElementById('NuevoPacienteInicio');
const botonInicio = document.getElementById('botonInicio');
const botonExamenes= document.getElementById('botonExamenes');



botonInicio.addEventListener('click', function () {
  
    window.location.href = "/index"; 
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

