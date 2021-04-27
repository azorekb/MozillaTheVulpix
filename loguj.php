<?php
$connection = @mysql_connect('mysql1.ugu.pl', 'db681477', 'adi_j111') or die('Brak połączenia z serwerem MySQL.<br />Błąd: '.mysql_error());
$db = @mysql_select_db('db681477', $connection) or die('Nie mogę połączyć się z bazą danych<br />Błąd: '.mysql_error());
if(isset($_POST['log_login']))
{
	$login=trim($_POST['log_login']);
	$haslo=$_POST['log_haslo'];
	if((!empty($login))&&(!empty($haslo)))
	{
		$w=mysql_query("select haslo from mozillavulpix_logowanie where login_low='".strtolower($login)."'");
		if($wu=mysql_fetch_array($w))
		{
			if($wu[0]==$haslo)
			{
				session_start();
				$_SESSION['nazwa']=$login;
				$_SESSION['lang']=$_POST['lang'];
				header("Location: gra/index.php");
			}
			else
			{
				header("Location: index.php?log=2");
			}
		}
		else
		{
			header("Location: index.php?log=1");
		}
	}
	else
	{
		header("Location: index.php?log=0");
	}
}
else if(isset($_POST['rej_login']))
{
	$login=trim($_POST['rej_login']);
	$haslo=$_POST['rej_haslo'];
	if((!empty($login))&&(!empty($haslo)))
	{
		$w=mysql_query("select * from mozillavulpix_logowanie where login_low=".strtolower($login));
		if(mysql_fetch_array($w))
		{
			header("Location: index.php?log=3");
		}
		else
		{
			mysql_query("insert into mozillavulpix_logowanie (login,login_low,haslo) values('".$login."','".strtolower($login)."','".$haslo."')") or die(mysql_error());
			header("Location: index.php?log=4");
		}
	}
	else
	{
		header("Location: index.php?log=0");
	}
}
else
{
	header("Location: index.php?log=0");
}
?>