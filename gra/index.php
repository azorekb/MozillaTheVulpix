<html lang='pl'>
<head>
<meta charset=utf8>
<link rel="stylesheet" href="style.css">
<title>PKMN Game</title>
<link rel="shortcut icon" href="../img/icon.ico" type="image/x-icon">
<script src="script/load.js"></script>
</head>
<body onload="loadScripts()"> <!---onresize="resize_body()"> -->
<?php
session_start();
if($_SESSION['nazwa']=="")
{
	header("Location: ../index.php");
}

echo "Witaj ".$_SESSION['nazwa'].". Miło cię widzieć.";
?>
<div id=pozaza>0/0</div>
<div id=okno><button onclick="start()">Test Mapy</button></div>

</body>
</html>
