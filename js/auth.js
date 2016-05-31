$(document).ready(function(){
	var url="http://20.0.10.188:80/phone/www/auth.php";
    
    //Login Function
    $("#login").click(function(){
    	
    	var email=$("#email").val();
    	var password=$("#password").val();
    	var dataString="email="+email+"&password="+password+"&login=";
    	if($.trim(email).length>0 & $.trim(password).length>0)
		{
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#login").html('Conectando...');},
				success: function(data){
					if(data=="success")
					{
						localStorage.login="true";
						localStorage.email=email;
						window.location.href = "index2.html";
					}
					else if(data="failed")
					{
						alert("Login error");
						$("#login").html('Login');
					}
				}
			});
		}return false;

    });

    //signup function
    $("#signup").click(function(){
    	var fullname=$("#fullname").val();
    	var email=$("#email").val();
    	var password=$("#password").val();
    	var dataString="fullname="+fullname+"&email="+email+"&password="+password+"&signup=";

    	if($.trim(fullname).length>0 & $.trim(email).length>0 & $.trim(password).length>0)
		{
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#signup").val('Connectando...');},
				success: function(data){
					if(data=="success")
					{
						alert("Gracias por registrarce! ya puedes chatear");
					}
					else if(data="exist")
					{
						alert("Disculpa! Ya tienes una cuenta asignada a este correo! puedes loguearte con el!");
					}
					else if(data="failed")
					{
						alert("Algo salio mal ");
					}
				}
			});
		}return false;

    });

    //Change Password
    $("#change_password").click(function(){
    	var email=localStorage.email;
    	var old_password=$("#old_password").val();
    	var new_password=$("#new_password").val();
    	var dataString="old_password="+old_password+"&new_password="+new_password+"&email="+email+"&change_password=";
    	if($.trim(old_password).length>0 & $.trim(old_password).length>0)
		{
			$.ajax({
				type: "POST",
				url: url,
				data: dataString,
				crossDomain: true,
				cache: false,
				beforeSend: function(){ $("#change_password").val('Connecting...');},
				success: function(data){
					if(data=="incorrect")
					{
						alert("Tu contrasenna pasada es incorrecta");
					}
					else if(data="success")
					{
						alert("Contrasenna cambiada con exito");
					}
					else if(data="failed")
					{
						alert("Algo salio mal");
					}
				}
			});
		}return false;

    });



    //logout function
    $("#logout").click(function(){
    	localStorage.login="false";
    	window.location.href = "login.html";
    });

    //Displaying user email on home page
    $("#email1").html(localStorage.email);
    var imageHash="http://www.gravatar.com/avatar/"+md5(localStorage.email);
    $("#profilepic").attr('src',imageHash);
});