<?php
header("Access-Control-Allow-Origin: *");
//<script type="text/javascript" src="js/auth.js"></script>


//Conectar y seleccionar base de datos
$conexion = mysql_connect("127.0.0.1","root","") or die("no se pudo conectar al servidor");
mysql_select_db("phonegap_demo", $conexion) or die("no se pudo conectar a la base de datos");

/*

if(isset($_POST['nombre'])){
	

     echo "<p id="email1"></p>";
    
$res=mysql_query("select * from `phonegap_login` WHERE email = '$email1'") ;

$arr=mysql_fetch_array($res);  
echo $arr["fullname"]; 
}

*/




//Crea una nueva cuenta de usuario
if(isset($_POST['signup']))
{
	$fullname=mysql_real_escape_string(htmlspecialchars(trim($_POST['fullname'])));
	$email=mysql_real_escape_string(htmlspecialchars(trim($_POST['email'])));
	$password=mysql_real_escape_string(htmlspecialchars(trim($_POST['password'])));
	$login=mysql_num_rows(mysql_query("select * from `phonegap_login` where `email`='$email'"));
	if($login!=0)
	{
		echo "exist";
	}
	else
	{
		$date=date("d-m-y h:i:s");
		$q=mysql_query("insert into `phonegap_login` (`reg_date`,`fullname`,`email`,`password`) values ('$date','$fullname','$email','$password')");
		if($q)
		{
			echo "success";
		}
		else
		{
			echo "failed";
		}
	}
	echo mysql_error();
}

//Login
if(isset($_POST['login']))
{
	$email=mysql_real_escape_string(htmlspecialchars(trim($_POST['email'])));
	$password=mysql_real_escape_string(htmlspecialchars(trim($_POST['password'])));
	$login=mysql_num_rows(mysql_query("select * from `phonegap_login` where `email`='$email' and `password`='$password'"));
	if($login!=0)
	{
		echo "success";
	}
	else
	{
		echo "failed";
	}
}

//Cambia contrasenna
if(isset($_POST['change_password']))
{
	$email=mysql_real_escape_string(htmlspecialchars(trim($_POST['email'])));
	$old_password=mysql_real_escape_string(htmlspecialchars(trim($_POST['old_password'])));
	$new_password=mysql_real_escape_string(htmlspecialchars(trim($_POST['new_password'])));
	$check=mysql_num_rows(mysql_query("select * from `phonegap_login` where `email`='$email' and `password`='$old_password'"));
	if($check!=0)
	{
		mysql_query("update `phonegap_login` set `password`='$new_password' where `email`='$email'");
		echo "success";
	}
	else
	{
		echo "incorrect";
	}
}


?>