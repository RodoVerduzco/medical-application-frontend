

function createUser(){
    var name = $("#name").val();
    var last = $("#lastname").val();
    var numseguro = $("#nss").val();
    var poliza = $("#polza").val();

    //var data = ;

    var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://172.20.10.8:5000/api/v1/patients/search_patients",
  "method": "POST",
  "headers": {
    "Content-Type": "application/json",
    "cache-control": "no-cache",
    "Postman-Token": "090d811b-ff64-4c12-8c19-f4bcc9e3ce3d"
  },
  "processData": false,
  "data": "{\n\t\"action\": \"LOGIN\",\n\t\"ss_num\": \"1\"\n}"
}

$.ajax(settings).done(function (response) {
  console.log(response);
});

}


function getUsers(){

    var data = {"type": "GET_USERS"};
    $.post( "172.20.10.8:5000/api/v1/patients/search_patients", function( data ) {
    $( ".result" ).html( data );

            answer = JSON.parse(data);
    
    });

}

function getOldUsers(){

    var data = {"type": "GET_INACTIVE_USERS"};
    $.post( "172.20.10.8:5000/api/v1/patients/search_patients", function( data ) {
    $( ".result" ).html( data );

            answer = JSON.parse(data);
    });
}

function getActiveUsers(){

    var data = {"type": "GET_ACTIVE_USERS"};
    $.post( "172.20.10.8:5000/api/v1/patients/search_patients", function( data ) {
    $( ".result" ).html( data );

            answer = JSON.parse(data);
    
    });
}

function getUserData(){

    var medata = {
        "type": "GET_USER_DATA",
        "user": $("#user").val()
    };
    $.post( "172.20.10.8:5000/api/v1/patients/search_patients", function( data ) {
    $( ".result" ).html( data );

            answer = JSON.parse(data);
    
    });
}