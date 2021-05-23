function start()
{
	let mapMenu_buttons = [];
	mapMenu_buttons.push(['Przygoda','Adventure']);
	mapMenu_buttons.push(['Pokedex','Pokedex']);
	mapMenu_buttons.push(['Pokemony','Pokemon']);
	mapMenu_buttons.push(['Przedmioty','Items']);
	mapMenu_buttons.push(['Opcje','Options']);
	if(activeUser.admin){mapMenu_buttons.push(['Panel Admina','Admin Panel']);}
	
	okno.innerHTML = '';

	worldMapConteiner = document.createElement('div');
	worldMapConteiner.classList.add('widnow_map');
	map_menu = document.createElement('div');
	map_menu.classList.add('mapMenu');
	map_menu.id = 'map_menu';
	worldMapConteiner.appendChild(map_menu);

	for(let i=0;i<mapMenu_buttons.length;i++)
	{
		let newbutton = document.createElement('div');
		newbutton.classList.add('mapMenuButton');
		newbutton.id = 'mapMenuButton_'+mapMenu_buttons[i][ENGLISH];
		newbutton.innerHTML = mapMenu_buttons[i][language];
		newbutton.onclick = function(){clickMenuButton(this);}
		map_menu.appendChild(newbutton);
	}

	worldmapContent = document.createElement('div');
	worldMapConteiner.appendChild(worldmapContent);

	const BUTTON_PLACES = [[1,0],[0,1],[1,2],[2,1]];

	tableButton = document.createElement('table');
	tableButton.classList='tableButton';
	for(let i=0;i<3;i++)
	{
		tableButton.insertRow(i);
		for(let j=0;j<3;j++)
		{
			tableButton.rows[i].insertCell(j);
		}
	}
	worldMapConteiner.appendChild(tableButton);
	
	for(let i=0;i<4;i++)
	{
		const BUTTONS=['left','up','right','down'];
		let buttondiv = document.createElement('div');
		buttondiv.classList.add('directButton');
		buttondiv.classList.add('button'+i);
		buttondiv.onmousedown = function(event){wayActive(event, this, BUTTONS[i]);}
		buttondiv.onmouseup = function(){wayUnactive(this);}
		buttondiv.onmouseout = function(){wayUnactive(this);}
		buttondiv.ontouchstart = function(event){wayActive(event, this, BUTTONS[i]);}
		buttondiv.ontouchend = function(){wayUnactive(this);}
		tableButton.rows[BUTTON_PLACES[i][0]].cells[BUTTON_PLACES[i][1]].appendChild(buttondiv);
	}

	okno.appendChild(worldMapConteiner);
	
	activeWindow = 'worldmap';
	actualMap = MAPS[0];
	clickMenuButton(document.getElementById('mapMenuButton_Adventure'));
}

function wayActive(_event, _element, _direct)
{
	way_comming = _direct;
	globalButtons('direct', _direct);
	_element.classList.add('active');
	_event.preventDefault();
}

function wayUnactive(_element)
{
	way_comming = null;
	_element.classList.remove('active');
}