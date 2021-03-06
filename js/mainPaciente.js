var jsonResponse;
var prescriptions;
//var url = "http://localhost:5000/api/v1/patients/search_patients";

var url = "http://172.20.10.2:5000/api/v1/patients/search_patients";
var path = ""

$( document ).ready(function() {
    //loadBasicInfoUser();
    loadRecetasActive();
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

        var ssn = response.ss_num;
        var nombre = response.name;
        var poliza = response.ass_policy;
        
        $("#nombreHeader").append("<h3 class='text-center display-4'>"+nombre+"</h3>");
        $("#ssnHeader").append("<h4>"+ssn+"</h4>");
        $("#polizaHeader").append("<h4'>"+poliza+"</h4>");
    });
}

function addPrescription(){
    var ssn = $("#ssnHeader").text();

    window.location.replace("crearReceta.html?ssn="+ssn);
}


function loadRecetas(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\n\t\"action\": \"GET_PRESCRIPTIONS_WITH_STATUS\",\n\t\"status\": \"INACTIVE\",\n\t\"ss_num\": \"" +getParameterByName('ssn')+"\"\n}\n"
        //"data": "{\n\t\"action\": \"GET_PRESCRIPTION\",\n\t\"ss_num\": \""+getParameterByName('ssn')+"\"\n}"
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
          
        response = response["Patient"]["data"];

        var html = "";
        var activeTab = "true";
        var showTab = "collapse show";
          
        if(response == null)
            return;
       
        html += '<div class="card">';
    
        for (var i = 0; i < response.length; i++) {
            html += '<div class="card-header" id="heading'+i+'">';
            html += '<h5 class="mb-0">';

            var status = response[i].status;

            if(status != "ACTIVE"){
                activeTab = "false";
                showTab = "collapse";
                
            }
            else{
                continue;
            }

            html += '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse'+i+'" aria-expanded="'+activeTab+'" aria-controls="collapse'+i+'">';

            var date = response[i].date;
            var diagnose = response[i].diagnose;
            var doctor = response[i].doctor;
            var drug = response[i].drug;
            var duration = response[i].duration;
            var interval = response[i].interval;
            var professional_card = response[i].professional_card;
            var sickness = response[i].sickness;
            var symptoms = response[i].symptoms;
            

            //alert(status);

            html += ' '+date;
            html += '</button>';

            
            html += '</h5>';
            html += '</div>';

            html += '<div id="collapse'+i+'" class="'+showTab+'" aria-labelledby="heading'+i+'" data-parent="#accordionExample">';
            html += '<div class="card-body">';

            if(status == "ACTIVE"){
                /* html += '<button class="btn btn-primary" onclick="modifyPrescription('+getParameterByName('ssn')+')">';
                html += 'Modificar receta';
                html += '</button>'; 
                html += '<a class="btn btn-primary" href="modificarReceta.html?ssn='+getParameterByName('ssn')+'&date='+date+'">';
                html += 'Modificar receta';
                html += '</a>'; 
                html += '<button class="btn btn-danger" onclick="terminateDiagnosis('+getParameterByName('ssn')+')">';
                html += 'Terminar tratamiento';
                html += '</button>';*/
                continue;
            }

            html += '<h5>Diagnóstico:</h5> '+diagnose+'. <br>';
            html += '<h5>Síntomas:</h5> '+sickness+'. <br>';
            html += '<h5>Tratamiento:</h5> '+drug+', por '+duration+' cada '+interval+'. ';
            html += '<br><br><img src="./images/QR.jpg" height="80" width="80">';
            html += '<br>';
            html += '<br>';
       
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
          
        $("#accordionExample").empty();
        $("#accordionExample").append(html);
        
      });
}

function loadRecetasActive(){
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\n\t\"action\": \"GET_PRESCRIPTIONS_WITH_STATUS\",\n\t\"status\": \"ACTIVE\",\n\t\"ss_num\": \"" +getParameterByName('ssn')+"\"\n}\n"
        //"data": "{\n\t\"action\": \"GET_PRESCRIPTION\",\n\t\"ss_num\": \""+getParameterByName('ssn')+"\"\n}"
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
          
          
        response = response["Patient"]["data"];

        var html = "";
        var activeTab = "true";
        var showTab = "collapse show";

        html += '<div class="card">';
          
        if(response == null)
            return;
       
        for (var i = 0; i < response.length; i++) {
            html += '<div class="card-header" id="heading'+i+'">';
            html += '<h5 class="mb-0">';
            
            var status = response[i].status;

            if(status != "ACTIVE"){
                activeTab = "false";
                showTab = "collapse";
                
            }


            html += '<button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse'+i+'" aria-expanded="'+activeTab+'" aria-controls="collapse'+i+'">';

            var date = response[i].date;
            var diagnose = response[i].diagnose;
            var doctor = response[i].doctor;
            var drug = response[i].drug;
            var duration = response[i].duration;
            var interval = response[i].interval;
            var professional_card = response[i].professional_card;
            var sickness = response[i].sickness;
            var symptoms = response[i].symptoms;
            

            //alert(status);

            html += ' '+date;
            html += '</button>';

            
            html += '</h5>';
            html += '</div>';

            html += '<div id="collapse'+i+'" class="'+showTab+'" aria-labelledby="heading'+i+'" data-parent="#usuariosActivos">';
            html += '<div class="card-body">';

            html += '<h5>Diagnóstico:</h5> '+diagnose+'. <br>';
            html += '<h5>Síntomas:</h5> '+sickness+'. <br>';
            html += '<h5>Tratamiento:</h5> '+drug+', por '+duration+' cada '+interval+'. ';
            html += '<br><br><img src="./images/QR.jpg" height="80" width="80">';
            html += '<br>';
            html += '<br>';
       
            html += '</div>';
            html += '</div>';
            html += '</div>';
        }
          
        $("#usuariosActivos").empty();
        $("#usuariosActivos").append(html);
        
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
