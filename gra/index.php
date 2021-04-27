<html lang='pl'>
<head>
<meta charset=utf8>
<link rel="stylesheet" href="style.css">
<title>PKMN Game</title>
<link rel="shortcut icon" href="../img/icon.ico" type="image/x-icon">
</head>
<body onload="loadScripts()"> 
<?php
session_start();
if($_SESSION['nazwa']=="")
{
	header("Location: ../index.php");
}

if($_SESSION['lang']==0){echo "Witaj ".$_SESSION['nazwa'].". Miło cię widzieć.";}
if($_SESSION['lang']==1){echo "Hello ".$_SESSION['nazwa'].". Nice to meet you.";}
?>
<div id=pozaza>0/0</div>
<div id=okno><button onclick="start()">Test Mapy</button></div>

<script src="script/load.js"></script>
</body>
</html>
