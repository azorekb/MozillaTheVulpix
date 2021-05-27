{
<?php
    $connection = @mysql_connect('mysql1.ugu.pl', 'db699059', 'MalaRuka.037') or die(mysql_error());
    $db = @mysql_select_db('db699059', $connection) or die(mysql_error());
    
    $cols;
    $dbquery = mysql_query("show columns from mozillavulpix_pokemon_moves");
    while($result = mysql_fetch_array($dbquery))
    {
        $cols[count($cols)] = $result[0];
    }
    $index = 0;
    
    $where = '';
    
    if(isset($_POST['move']))
    {
        $where = ' where id='.$_POST['move'];
    }
    
    $dbquery = mysql_query("select * from mozillavulpix_pokemon_moves".$where);
    while($result = mysql_fetch_array($dbquery))
    {
        if($index>0){echo ',';}
        echo '"'.$index++.'":{';
        for($i=0;$i<count($cols);$i++)
        {
            if($i>0){echo ',';}
            echo '"'.$cols[$i].'":"'.$result[$i].'"';
        }
        echo '}';
    }
    ?>
}