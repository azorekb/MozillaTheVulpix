<html lang='pl'>
<head>
<meta charset=utf8>
<title>PKMN Game</title>
<link rel="shortcut icon" href="img/icon.ico" type="image/x-icon">
</head>
<body>
<table cellpadding=10>
<tr align=center>
<td colspan=2><b>
<?php
if(isset($_GET['log']))
{
	switch($_GET['log'])
	{
		case 0: echo "<font color=red>Nie zostały podane wszystkie dane<br>You didn't insert all data</font>"; break;
		case 1: echo "<font color=red>Podany login nieistnieje<br>Given username doesn't exists</font>"; break;
		case 2: echo "<font color=red>Podane hasło jest nieprawidłowe<br>Given password is incorrect</font>"; break;
		case 3: echo "<font color=red>Podany login już istnieje<br>Given username already exists</font>"; break;
		case 4: echo "<font color=green>Rejestracja zakończyła się sukcesem<br>Registration was successful</font>"; break;
		case 5: echo "<font color=red>Chyba ci się nudzi<br>I guess you're bored</font>"; break;
	}
}

?>
</b>
</td>
</tr>
<tr valign=top>
<td>
<h1>Logowanie<br>Log in</h1>
<form action='loguj.php' method='POST'>
<label>login:<br>
<input name='log_login' maxlength=30></label><br>
<label>hasło/password:<br>
<input type=password name='log_haslo' maxlength=30><br></label>
<button>logowanie</button>
</form>
</td>
<td>
<h1>Rejestracja<br>Register</h1>
<form action='loguj.php' method='POST'>
<label>login:<br>
<input name='rej_login' maxlength=30></label><br>
<label>hasło/password:<br>
<input type=password name='rej_haslo' maxlength=30><br></label>
<label>
<input type=checkbox id='reg' onchange="if(reg.checked){reg_ok.disabled=false;}else{reg_ok.disabled=true;}">Oświadczam, że nie zapoznałem/zapoznałam się z żadnym regulaminem, ale za to przeczytałem/przeczytałam ten jakże wzruszający wierszyk po prawej stronie.<br><BR>I declare, that i didn't read any regulations, but i was trying to read this so touching poem on the right side.
</label>
<button id='reg_ok' disabled>rejestracja</button>
</form>
</td>
<td width=33%>
Azorek jęzorek wystawił<br>
I ładnie tu z nami się bawił.<br>
Gdy nadszedł czas wrócić do domu,<br>
Wiedział, że nie chce się nikomu.<br>
Gdy szczekał tak sobie do siebie,<br>
Ptak usłyszał go tam na niebie.<br>
Chcąc odpowiedzieć na szczekanie<br>
Ptak zakończył swoje latanie.<br>
Azorek jęzorek wystawił,<br>
Śmiać się do wszystkiego potrafił.<br>
Gdy wróciła pani z powrotem,<br>
Ucałować ją miał ochotę.<br>
Lubi z nią wychodzić na spacer,<br>
Nie tylko, gdy coś mu się zachce.<br>
Wesoły jest z panią na dworze,<br>
Ona mu się bawić pomoże.<br>
Azorek jęzorek wystawił.<br>
Już długo tu u nas zabawił.<br>
Jest już czas pożegnać Azorka<br>
Nie wystawi już dziś jęzorka.<br>
Azorek idzie spać do łóżka,<br>
Pocałuję go w jego uszka.<br>
Niech przyśni mu się jego pani,<br>
Która ciężko pracuje dla nich.
</td>
</tr>
</table>

</body>
</html>
