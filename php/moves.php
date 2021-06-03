{<?php 
    $connection = mysql_connect('mysql1.ugu.pl', 'db699059', 'MalaRuka.037') or die(mysql_error());
    $db = mysql_select_db('db699059', $connection) or die(mysql_error());
    $array = 'mozillavulpix_pokemon_moves';
    
    $cols;
    $isString;
    $dbquery = mysql_query("show columns from ".$array);
    while($result = mysql_fetch_array($dbquery))
    {
        $cols[count($cols)] = $result[0];
        if(strpos($result[1], 'varchar') === 0){$isString[count($isString)] = 1;}
        else{$isString[count($isString)] = 0;}
    }
    if(isset($_POST['new']))
    {
        mysql_query('insert into '.$array.' () values()');
        echo '"id":"'.mysql_insert_id().'"';
    }
    elseif(isset($_POST['id']))
    {
        $update = '';
        for($i=1;$i<count($cols);$i++)
        {
            if(isset($_POST[$cols[$i]]))
            {
                if($update != ''){$update.= ',';}

                $update.= $cols[$i].'=';
                if($isString[$i]){$update.='\''.$_POST[$cols[$i]].'\'';}
                else{$update.=$_POST[$cols[$i]];}
            }
        }
        mysql_query('update '.$array.' set '.$update.' where id='.$_POST['id']) or die(mysql_error());
    }
    else
    {
        $index = 0;
        
        $where = '';

        if(isset($_POST['move']))
        {
            $where = ' where id='.$_POST['move'];
        }

        $dbquery = mysql_query("select * from ".$array.$where);
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
    }
?>}