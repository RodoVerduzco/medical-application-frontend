//var url = "http://localhost:5000/api/v1/patients/search_patients";
//var url2 = "http://localhost:5000/api/v1/doctors/search_doctors";
var url = "http://172.20.10.2:5000/api/v1/patients/search_patients";
var url2 = "http://172.20.10.2:5000/api/v1/doctors/search_doctors";

$( document ).ready(function() {
    loadBasicInfoUser();
    loadDocInfo();
    if(getParameterByName('date') != null)
        loadPrescription();
});

function loadBasicInfoUser(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\n\t\"action\": \"GET_PATIENT\",\n\t\"ss_num\": \""+getParameterByName('ssn')+"\"\n}"
    }
      
    $.ajax(settings).done(function (response) {
        console.log(response);

        jsonResponse = response;
        var nombre = response.name;
        
        $("#nombrePacienteId").val(nombre);
    });
}

function loadDocInfo(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url2,
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": "{\n\t\"action\": \"INFO_DOC\"\n}"
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        $("#medicoId").val(response["data"]["name"]);
        $("#cedulaId").val(response["data"]["p_card"]);
      });
}

function loadPrescription(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
          "Content-Type": "application/json",
          "cache-control": "no-cache"
        },
        "processData": false,
        "data": "{\n\t\"action\": \"SELECT_PRESCRIPTION\",\n\t\"ss_num\": \"1\",\n\t\"date\":\""+getParameterByName('date')+"\"\n}"
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        var padecimiento = response.sickness;
        var diagnostico = response.diagnose;
        var medicina = response.drug;
        var duracion = response.duration;
        var intervalo = response.interval;

        $("#padecimientoId").val(padecimiento);
        $("#diagnosticoId").val(diagnostico);
        $("#medicamentoId").val(medicina);
        $("#duracionId").val(duracion);
        $("#intervaloId").val(intervalo);

      });
}

function mod(){
    var f_nombre= $("#nombrePacienteId").val();
    var f_medico= $("#medicoId").val();
    var f_padecimiento= $("#padecimientoId").val();
    var f_diagnostico= $("#diagnosticoId").val();
    var f_medicamento= $("#medicamentoId").val();
    var f_duracion= $("#duracionId").val();
    var f_intervalo= $("#intervaloId").val();
    var f_cedula= $("#cedulaId").val();
    var date = getParameterByName('date');
    var ssn = getParameterByName('ssn');
 
    var data_to_send = {
        "action" : "MODIFY_PRESCRIPTION",
        "patient_name" : f_nombre,
        "date" : date,
        "doctor_name" : f_medico,
        "sickness" : f_padecimiento,
        "diagnose" : f_diagnostico,
        "drug" : f_medicamento,
        "p_card" : f_cedula,
        "interval" : f_intervalo,
        "duration" : f_duracion,
        "ssn" : ssn
    }

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        "processData": false,
        "data": JSON.stringify(data_to_send)
    }
 
    $.ajax(settings).done(function (response) {
        //alert("S")
        console.log(response);

        if(response['Patient'] == "success"){
            alert("Prescription modified correctly");
            window.location.replace("paciente.html?ssn="+ssn+"");
        }
    });
}

function reg(){
    var f_nombre= $("#nombrePacienteId").val();
    var f_medico= $("#medicoId").val();
    var f_padecimiento= $("#padecimientoId").val();
    var f_diagnostico= $("#diagnosticoId").val();
    var f_medicamento= $("#medicamentoId").val();
    var f_duracion= $("#duracionId").val();
    var f_intervalo= $("#intervaloId").val();
    var f_cedula= $("#cedulaId").val();
    var ssn = getParameterByName('ssn');
 
    var data_to_send = {
        "action" : "ADD_PRESCRIPTION",
        "patient_name" : f_nombre,
        "doctor_name" : f_medico,
        "sickness" : f_padecimiento,
        "diagnose" : f_diagnostico,
        "drug" : f_medicamento,
        "p_card" : f_cedula,
        "interval" : f_intervalo,
        "duration" : f_duracion,
        "ssn" : ssn
    }
 
    //alert(ssn);
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
        },
        "processData": false,
        "data": JSON.stringify(data_to_send)
    }
 
    $.ajax(settings).done(function (response) {
        //alert("S")
        console.log(response);

        if(response['Patient'] == "Added prescription correctly"){
            alert("Prescription added correctly");
            window.location.replace("paciente.html?ssn="+ssn+"");
        }
    });
 }

 function getParameterByName(name, url) {
     if (!url) url = window.location.href;
     name = name.replace(/[\[\]]/g, "\\$&");
     var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
         results = regex.exec(url);
     if (!results) return null;
     if (!results[2]) return '';
     return decodeURIComponent(results[2].replace(/\+/g, " "));
 }