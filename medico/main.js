
function login(){
  var user = $("#inputEmail").val();
  var pswd = $("#inputPassword").val();
  
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://172.20.10.8:5000/api/v1/doctors/search_doctors",
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
      console.log(response)
      alert("response")
      
      //var jsond = JSON.parse(response);

      alert(response['login'])

      if(response['login'] == "false")
        alert("INCORRECT");
      else 
        window.location.replace("C:/Users/Esteban/Documents/GitHub/medical-application-frontend/medico/main.html")
    });

 }

 //login();


