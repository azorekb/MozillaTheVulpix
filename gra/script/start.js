let worldMapTable;
let map_menu;
const POLSKI=0;
const ENGLISH=1;
let language=POLSKI;
let mapCenter={
	toX: 0,
	isX: 0,
	toY: 0,
	isY: 0,
}
let mapMenu_buttons=[];
mapMenu_buttons.push(['Pokedex','Pokedex']);
mapMenu_buttons.push(['Pokemony','Pokemon']);
mapMenu_buttons.push(['Przedmioty','Items']);
mapMenu_buttons.push(['Opcje','Options']);

function openMap()
{
	okno.innerHTML='';

	let worldMapConteinter=document.createElement('div');
	worldMapConteinter.style.position='relative';
	worldMapConteinter.classList.add('widnow_map');
	
	worldMapTable=document.createElement('table');
	worldMapTable.classList.add('worldmap');
	worldMapTable.style.position='relative';
	worldMapTable.style.left=0;
	worldMapTable.style.top=0;
	worldMapConteinter.appendChild(worldMapTable);
	
	mainCharacter = document.createElement('img');
	mainCharacter.style.position='absolute';
	mainCharacter.src='../img/joy.png';
	resize_worldMap();
	worldMapConteinter.appendChild(mainCharacter);
	
	map_menu=document.createElement('div');
	map_menu.classList.add('mapMenu');
	for(let i=0;i<mapMenu_buttons.length;i++)
	{
		let newbutton=document.createElement('div');
		newbutton.classList.add('mapMenuButton');
		newbutton.id='mapMenuButton_'+mapMenu_buttons[i][ENGLISH];
		newbutton.innerHTML=mapMenu_buttons[i][language];
		newbutton.onclick=function(){clickMenuButton(this);}
		map_menu.appendChild(newbutton);
	}
	worldMapConteinter.appendChild(map_menu);

	okno.appendChild(worldMapConteinter);
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

// function resize_body()
// {
// 	if(worldMapTable!=undefined)
// 	{
// 		resize_worldMap();
// 	}
// }