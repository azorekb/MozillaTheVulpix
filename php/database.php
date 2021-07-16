{<?php 
    if(isset($_GET['base']))
    {
        switch($_GET['base'])
        {
            case 'moves': $array = 'mozillavulpix_pokemon_moves'; break;
            case 'pokemon': $array = 'mozillavulpix_pokemon'; break;
            case 'maps': $array = 'mozillavulpix_maps'; break;
            case 'pokemon_moves': $array = 'mozillavulpix_movesForPokemon'; break;
        }

        $connection = mysql_connect('mysql1.ugu.pl', 'db699059', 'MalaRuka.037') or die('1: '.mysql_error());
        $db = mysql_select_db('db699059', $connection) or die('2: '.mysql_error());
        mysql_set_charset('utf8', $connection);
    
        $cols;
        $isString;
        $dbquery = mysql_query("show columns from ".$array) or die('3: '.mysql_error().'<br>'.$_GET['base']);
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
                if(isset($_POST[$cols[$i]]) && $_POST[$cols[$i]] != '')
                {
                    if($update != ''){$update.= ',';}

                    $update.= $cols[$i].'=';
                    if($isString[$i]){$update.='\''.$_POST[$cols[$i]].'\'';}
                    else{$update.=$_POST[$cols[$i]];}
                }
            }
            mysql_query('update '.$array.' set '.$update.' where id='.$_POST['id']) or die('4: '.mysql_error());
        }
        else
        {
            $index = 0;

            $where = '';

            if(isset($_POST['which']))
            {
                $where = ' where id='.$_POST['which'];
            }

            if(isset($_POST['pokemon']))
            {
                $where = ' where pokemon=\''.$_POST['pokemon'].'\'';
            }

            $dbquery = mysql_query("select * from ".$array.$where) or die('5: '.mysql_error());
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
    }
?>}