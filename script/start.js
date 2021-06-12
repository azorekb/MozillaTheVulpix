function skipLogin(_admin)
{
	activeUser.admin = _admin;
	start();
}

function addLanguageFunction()
{
	let listOfObjects =
	[
		{object: POKEMON_TYPES},
		{object: POKEMON_STATS},
		{object: POKEMON_ABILITIES},
		{object: POKEMON_MOVE_TARGET},
		{object: POKEMON_EXP_GROWTH},
		{object: POKEMON_EGG_GROUP},
		{object: POKEMON_MOVE_EFFECTS},
		{object: MOVE_EFFECT_WHOM},
		{object: POKEDEX_TEXTS, noArray: true},
		{object: MAIN_TEXTS, noArray: true, parametr: 'texts'},
		{object: MAIN_ERRORS, noArray: true},
		{object: ADMIN_WARNINGS},
		{object: ADMIN_LIST_OF_TASKS},
		{object: ADMIN_EFFECTS_COLS},
		{object: ADMIN_EDIT_TEXTS, noArray: true},
		{object: ADMIN_POKEMON_TEXTS, noArray: true, skip: 'errors'},
		{object: ADMIN_POKEMON_TEXTS.errors},
		{object: ADMIN_MAPS_DESCRIPTIONS, noArray: true},
	];

	Object.keys(ADMIN_DATABASE_COLS).forEach(database => {

		listOfObjects[listOfObjects.length] = {object: ADMIN_DATABASE_COLS[database], parametr: 'description'};
	});
	
	for(let i=0;i<POKEMON_MOVE_EFFECTS.length;i++)
	{
		if(POKEMON_MOVE_EFFECTS[i].types !== undefined)
		{
			listOfObjects[listOfObjects.length] = {object: POKEMON_MOVE_EFFECTS[i].types};
		}
	}

	for(let i=0;i<listOfObjects.length;i++)
	{
		const OBJ = listOfObjects[i];
		let parametr = '';
		let end = 0;
		let help = '';

		if(OBJ.noArray == undefined)
		{
			parametr = '[j]';
			end = OBJ.object.length;
		}
		else
		{
			help = Object.keys(OBJ.object);
			end = help.length;
			parametr = '[help[j]]';
		}

		if(OBJ.parametr != undefined)
		{
			parametr += '.' + OBJ.parametr;
		}

		for(let j=0;j<end;j++)
		{
			if(OBJ.skip != undefined)
			{
				if(help[j] == OBJ.skip){continue;}
			}
			eval('OBJ.object' + parametr).language = function()
			{
				if(this[language] == undefined){return this.english}
				return this[language];
			}
		}
	}
} addLanguageFunction();

function start()
{
	let mapMenu_buttons = [];
	mapMenu_buttons.push({polski: 'Przygoda', english: 'Adventure'});
	mapMenu_buttons.push({polski: 'Pokedex', english: 'Pokedex'});
	mapMenu_buttons.push({polski: 'Pokemony', english: 'Pokemon'});
	mapMenu_buttons.push({polski: 'Przedmioty', english: 'Items'});
	mapMenu_buttons.push({polski: 'Opcje', english: 'Options'});
	if(activeUser.admin){mapMenu_buttons.push({polski: 'Panel Admina',english: 'Admin Panel'});}
	
	okno.innerHTML = '';

	let worldMapConteiner = document.createElement('div');
	worldMapConteiner.classList.add('widnow_map');
	worldMapConteiner.id = 'worldMapConteiner';


	let map_menu = document.createElement('div');
	map_menu.classList.add('mapMenu');
	map_menu.id = 'map_menu';
	worldMapConteiner.appendChild(map_menu);

	for(let i=0;i<mapMenu_buttons.length;i++)
	{
		let newbutton = document.createElement('div');
		newbutton.classList.add('mapMenuButton');
		newbutton.id = ('mapMenuButton_' + mapMenu_buttons[i].english).replace(' ','_');
		newbutton.innerHTML = mapMenu_buttons[i][language];
		newbutton.onclick = function(){clickMenuButton(this);}
		map_menu.appendChild(newbutton);
	}

	let worldmapContent = document.createElement('div');
	worldmapContent.id = 'worldmapContent';
	worldMapConteiner.appendChild(worldmapContent);

	const BUTTON_PLACES = [[1,0],[0,1],[1,2],[2,1]];

	let tableButton = document.createElement('table');
	tableButton.classList='tableButton';
	tableButton.id = 'tableButton';
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

function colorText(_text,_colour)
{
	return '<font color=\'' + _colour + '\'>' + _text + '</font>';
}