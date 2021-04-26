const WINDOW_UNACTIVE=-1;
const WINDOW_WORLDMAP=0;
const WINDOW_OPTIONS=1;
const POKEDEX_TEXTS={
    name:['gatunek','specie'],
    
}

let poktable;
let activeButton=null;

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
    if(_element.id == 'mapMenuButton_Adventure' && activeWindow != WINDOW_UNACTIVE)
    {
        openMap();
    }

    if(_element.id == 'mapMenuButton_Pokedex' && activeWindow != WINDOW_UNACTIVE)
    {
        
    }
    if(_element.id == 'mapMenuButton_Options' && activeWindow != WINDOW_UNACTIVE)

    {
        
    }

    if(activeButton!=null){activeButton.classList.remove('active');}
    activeButton=_element;
    _element.classList.add('active');


}

function pokedex_show(_pokemon)
{
    poktable.rows[0].cells[1].innerHTML=POKEMON_LIST[_pokemon].specie;


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