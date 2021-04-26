const WINDOW_UNACTIVE=-1;
const WINDOW_WORLDMAP=0;
const WINDOW_OPTIONS=1;
const POKEDEX_TEXTS={
    no:['nr','no.'],
    types:['typy','types'],
    ability:['umiejętności','abilities'],
    baseStats:['bazowe statystyki','base stats'],
    hp:['życie','hit points'],
    attack:['atak','attack'],
    defence:['obrona','defence'],
    spAttack:['sp. atak','sp. attack'],
    spDefence:['sp. obrona','sp. defence'],
    speed:['szybkość','speed'],
    
}

let poktable;
let activeButton=null;
let worldMapTable;
let worldMapWindow;
let dex_containter;
let dex_dataPlace;
let dex_baseStats;


// var xmlhttp = new XMLHttpRequest();
// var url = "myTutorials.txt";

// xmlhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         var myArr = JSON.parse(this.responseText);
//         myFunction(myArr);
//     }
// };
// xmlhttp.open("GET", url, true);
// xmlhttp.send();

function clickMenuButton(_element)
{
    if(activeWindow != WINDOW_UNACTIVE)
    {
        switch(_element.id)
        {
            case 'mapMenuButton_Adventure': openMap(); break;
            case 'mapMenuButton_Pokedex': openPokedex(); break;

            default: return false;
        }

        if(activeButton!=null){activeButton.classList.remove('active');}
        activeButton=_element;
        _element.classList.add('active');
    }

}

function openPokedex()
{
    worldmapContent.innerHTML='';

    dex_containter=document.createElement('div');
    dex_containter.classList.add('dexContainer');
    worldmapContent.appendChild(dex_containter);

    dex_dataPlace=document.createElement('div');
    dex_dataPlace.classList.add('dexPlace');
    dex_containter.appendChild(dex_dataPlace);

    dex_baseStats=document.createElement('div');
    dex_baseStats.classList.add('dexBaseStats');
    dex_dataPlace.appendChild(dex_baseStats);

    pokedex_show('eevee');
}

function pokedex_show(_pokemon)
{
    const BR='<br>';
    let type_text=POKEMON_LIST[_pokemon].types.first;
    if(POKEMON_LIST[_pokemon].types.second!=''){type_text+='/'+POKEMON_LIST[_pokemon].types.second;}

    dex_baseStats.innerHTML='';
    dex_baseStats.innerHTML+=POKEDEX_TEXTS.no[language]+' '+POKEMON_LIST[_pokemon].no+': '+ _pokemon+BR;
    dex_baseStats.innerHTML+=POKEDEX_TEXTS.types[language]+': '+type_text+BR;
    dex_baseStats.innerHTML+=POKEDEX_TEXTS.ability[language]+':'+BR;
    dex_baseStats.innerHTML+=POKEMON_LIST[_pokemon].abilities.first+BR;
    dex_baseStats.innerHTML+=POKEMON_LIST[_pokemon].abilities.second+BR;
    dex_baseStats.innerHTML+='<i>'+POKEMON_LIST[_pokemon].abilities.hidden+'</i>'+BR;
    dex_baseStats.innerHTML+=POKEDEX_TEXTS.baseStats[language]+BR;
    dex_baseStats.innerHTML+=POKEDEX_TEXTS.hp[language]+': '+POKEMON_LIST[_pokemon].baseStats.hp+BR;
    dex_baseStats.innerHTML+=POKEDEX_TEXTS.attack[language]+': '+POKEMON_LIST[_pokemon].baseStats.attack+BR;
    dex_baseStats.innerHTML+=POKEDEX_TEXTS.defence[language]+': '+POKEMON_LIST[_pokemon].baseStats.defence+BR;
    dex_baseStats.innerHTML+=POKEDEX_TEXTS.spAttack[language]+': '+POKEMON_LIST[_pokemon].baseStats.spAttack+BR;
    dex_baseStats.innerHTML+=POKEDEX_TEXTS.spDefence[language]+': '+POKEMON_LIST[_pokemon].baseStats.spDefence+BR;
    dex_baseStats.innerHTML+=POKEDEX_TEXTS.speed[language]+': '+POKEMON_LIST[_pokemon].baseStats.speed+BR;
    dex_baseStats.innerHTML+='';
    dex_baseStats.innerHTML+='';
    dex_baseStats.innerHTML+='';

}

function openMap()
{
    worldmapContent.innerHTML='';
	worldMapWindow=document.createElement('div');
	worldMapWindow.style.position='relative';
	
	worldMapTable=document.createElement('table');
	worldMapTable.classList.add('worldmap');
	worldMapTable.style.position='relative';
	worldMapTable.style.left=0;
	worldMapTable.style.top=0;
	worldMapWindow.appendChild(worldMapTable);
	
	mainCharacter = document.createElement('img');
	mainCharacter.style.position='absolute';
	mainCharacter.src='../img/joy.png';
	resize_worldMap();
	worldMapWindow.appendChild(mainCharacter);
	worldmapContent.appendChild(worldMapWindow);

	activeWindow = WINDOW_WORLDMAP;
	
}

function resize_worldMap()
{
	let x_count=20;//Math.floor((window.innerWidth-800)/20);
	let y_count=20;//Math.floor((window.innerHeight-400)/20);
	mapCenter.toY=Math.ceil(y_count/2);
	mapCenter.isY=1-y_count%2;
	mapCenter.toX=Math.ceil(x_count/2);
	mapCenter.isX=1-x_count%2;

	let firstCell = {x:0,y:0};
	let newPosition = {x:actualPosition.x,y:actualPosition.y};

	if(actualMap[0].length > x_count)
	{
		if(actualPosition.x > mapCenter.toX - mapCenter.isX && actualPosition.x < actualMap[0].length - mapCenter.toX)
		{
			firstCell.x = actualPosition.x - mapCenter.toX + mapCenter.isX;
			newPosition.x = mapCenter.toX - mapCenter.isX;
		}
		if(actualPosition.x >= actualMap[0].length - mapCenter.toX)
		{
			firstCell.x = actualMap[0].length - x_count;
			newPosition.x = actualPosition.x - (actualMap[0].length - x_count);
		}
		
	}
	if(actualMap.length > y_count)
	{
		if(actualPosition.y > mapCenter.toY - mapCenter.isY && actualPosition.y < actualMap.length - mapCenter.toY)
		{
			firstCell.y = actualPosition.y - mapCenter.toY + mapCenter.isY;
			newPosition.y = mapCenter.toY - mapCenter.isY;
		}
		if(actualPosition.y >= actualMap.length - mapCenter.toY)
		{
			firstCell.y = actualMap.length - y_count;
			newPosition.y = actualPosition.y - (actualMap.length - y_count);
		}
	}

	while(worldMapTable.rows.length>0)
	{
		worldMapTable.deleteRow(0);
	}
	
	for(let i=0;i<y_count;i++)
	{
		worldMapTable.insertRow(i);
		for(let j=0;j<x_count;j++)
		{
			worldMapTable.rows[i].insertCell(j).innerHTML='<img src=../img/'+actualMap[i+firstCell.y][j+firstCell.x]+'.png>';
		}
	}
	
	mainCharacter.style.left = 20 * newPosition.x;
	mainCharacter.style.top = 20 * newPosition.y;
	
}