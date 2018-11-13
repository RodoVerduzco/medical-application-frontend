$( document ).ready(function() {
    loadActiveUsers();
});

//var url = "http:/localhost:5000/api/v1/patients/search_patients";
var url = "http:/172.20.10.2:5000/api/v1/patients/search_patients";

function loadActiveUsers(){

    deleteChildsElement("usuariosActivosLista");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
            "cache-control": "no-cache",
            "Postman-Token": "5b75ed41-afbc-45a9-a436-9ca06d8389b2"
        },
        "processData": false,
        "data": " {\"action\": \"GET\",\"user_type\": \"active\"}"
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        var html = "";

        html += "<table class='table table-sm table-hover header-fixed'  id='usuarios-activos-listing'>";
        html += "<thead class='thead-light'><tr><th class='nombre-col'>Nombre</th><th class='nss-col'>NSS</th><th class='poliza-col'>Poliza</th><th class='act1-col'>Acción 1</th><th class='act2-col'>Acción 2</th></tr></thead>";
        
        html += "<tbody class = ''>";
        for (var i = 0; i < response.length; i++) {
            var ssn = response[i].ss_num;
            var nombre = response[i].name;
            var poliza = response[i].ass_policy;

            html += "<tr class='usuario-row' data-href='#'>";
            html += "<td class='nombre-col'>"+nombre+"</td><td class='nss-col'>"+ssn+"</td><td class='poliza-col'>"+poliza+"</td><td class='act1-col'><a href='paciente.html?ssn="+ssn+"' class='btn btn-outline-primary' role='button'>Ver Reporte</a></td><td class='act2-col'><a onclick='modify("+ssn+")' href='#'class='btn btn-outline-secondary' role='button'>Modificar Status</a></td>";
            html += "</tr>";
        }
        
        html += "</tbody>";
        html += "</table>";
        html += "</br></br></br>";
        html += "</br></br></br>";

        $("#usuariosActivosLista").append(html);
    });
}

function loadInactiveUsers(){

    deleteChildsElement("usuariosInactivosLista");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
        "Content-Type": "application/json",
        "cache-control": "no-cache",
        "Postman-Token": "5b75ed41-afbc-45a9-a436-9ca06d8389b2"
        },
        "processData": false,
        "data": " {\"action\": \"GET\",\"user_type\": \"inactive\"}"
    }
    
    $.ajax(settings).done(function (response) {
        console.log(response);
        var html = "";

        html += "<table class='table table-sm table-hover header-fixed'  id='usuarios-activos-listing'>";
        html += "<thead class='thead-light'><tr><th class='nombre-col'>Nombre</th><th class='nss-col'>NSS</th><th class='poliza-col'>Poliza</th><th class='act1-col'>Acción 1</th></thead>";
        
        html += "<tbody class = ''>";
        for (var i = 0; i < response.length; i++) {
        var ssn = response[i].ss_num;
        var nombre = response[i].name;
        var poliza = response[i].ass_policy;

        html += "<tr class='usuario-row' data-href='#'>";
        html += "<td class='nombre-col'>"+nombre+"</td><td class='nss-col'>"+ssn+"</td><td class='poliza-col'>"+poliza+"</td><td class='act2-col'><a onclick='modify2("+ssn+")' href='#'class='btn btn-outline-secondary' role='button'>Modificar Status</a></td>";
        html += "</tr>";
        }
        
        html += "</tbody>";
        html += "</table>";
        html += "</br></br></br>";
        html += "</br></br></br>";

        $("#usuariosInactivosLista").append(html);
    });
}

function deleteChildsElement(nombre){
    var element = document.getElementById(nombre);
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }  
}