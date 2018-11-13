//var urld = "http://localhost:5000/api/v1/doctors/search_doctors";
//var url = "http://localhost:5000/api/v1/patients/search_patients";
var url = "http://172.20.10.2:5000/api/v1/patients/search_patients";

function modify(input)
{
    var id =input;
    var stat=prompt("Ingrese el estatus del Paciente", "active/inactive");

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\n\t\"action\": \"UPDATE_STATUS\",\n\t\"status\": \""+stat+"\",\n\t\"ss_num\": \""+id+"\"\n}"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function modify2(input)
{
    var id =input;
    var stat="active";

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "processData": false,
        "data": "{\n\t\"action\": \"UPDATE_STATUS\",\n\t\"status\": \""+stat+"\",\n\t\"ss_num\": \""+id+"\"\n}"
    }

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

function login(){
    var user = $("#inputEmail").val();
    var pswd = $("#inputPassword").val();

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": urld,
        "method": "POST",
        "headers": {
            "Content-Type": "application/json; charset=UTF-8"
        },
        "processData": false,
        "data": "{\n\t\"action\": \"LOGIN\",\n\t\"user\": \""+user+"\",\n\t\"password\": \""+pswd+"\"\n}\n"
    };
    //console.log(settings);
    alert(user+" "+pswd);

    $.ajax(settings).done(function (response) {
        console.log(response);
        alert("response");

        alert(response.login);

        if(response.login == "false")
            alert("INCORRECT");
        else
            window.location.replace("main.html");
    });

 }

function loginPatient(){
  var user = $("#inputSSN").val();

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://172.20.10.2:5000/api/v1/patients/search_patients",
      "method": "POST",
      "headers": {
        "Content-Type": "application/json; charset=UTF-8"

      },
      "processData": false,
      "data": "{\n\t\"action\": \"LOGIN\",\n\t\"user\": \"" + user + "\"}\n"
    };

    //console.log(settings);
    //alert("8" + user + "8");

    $.ajax(settings).done(function (response) {
      console.log(response);
      //alert("response");

      //var jsond = JSON.parse(response);

      //alert(response.loginPatient);

      if(response["login"] == "false")
        alert("SSN does not exist!");
      else
        window.location.replace("menuPaciente.html");
    });

}
