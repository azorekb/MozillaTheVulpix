{
	"error": "<?php

$connection = @mysql_connect('mysql1.ugu.pl', 'db699059', 'MalaRuka.037') or die(mysql_error());
$db = @mysql_select_db('db699059', $connection) or die(mysql_error());

if(isset($_GET['type']))
{
	$type = $_GET['type'];// $_POST['type'];
	$login = trim($_GET['name']); //trim($_POST['name']);
	$haslo = $_GET['pass']; //$_POST['pass'];

	if($type == 'login')
	{
		$w=mysql_query("select password,admin from mozillavulpix_logowanie where name_low='".strtolower($login)."'");
		if($wu=mysql_fetch_array($w))
		{
			if($wu[1] == 1){$admin = 'true';}else{$admin = 'false';}
			if($wu[0] == $haslo)
			{
				echo '", "admin": '.$admin.', "name": "'.$login;
			}
			else
			{
				echo 'wrongPassword';
			}
		}
		else
		{
			echo 'wrongLogIn';
		}
	
	}
	else if($type == 'register')
	{
	
	}
}
	
?>"
}