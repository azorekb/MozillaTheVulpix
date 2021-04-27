let map_menu;
let worldMapConteiner;
let worldmapContent;
let mapCenter={
	toX: 0,
	isX: 0,
	toY: 0,
	isY: 0,
}
let mapMenu_buttons=[];
mapMenu_buttons.push(['Przygoda','Adventure']);
mapMenu_buttons.push(['Pokedex','Pokedex']);
mapMenu_buttons.push(['Pokemony','Pokemon']);
mapMenu_buttons.push(['Przedmioty','Items']);
mapMenu_buttons.push(['Opcje','Options']);

function start()
{
	okno.innerHTML='';

	worldMapConteiner=document.createElement('div');
	worldMapConteiner.classList.add('widnow_map');
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
	worldMapConteiner.appendChild(map_menu);

	worldmapContent=document.createElement('div');
	worldMapConteiner.appendChild(worldmapContent);

	okno.appendChild(worldMapConteiner);
	
	activeWindow=0;
	clickMenuButton(document.getElementById('mapMenuButton_Adventure'));
}