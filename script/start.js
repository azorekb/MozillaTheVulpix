function skipLogin(_admin)
{
	activeUser.admin = _admin;
	activeUser.name = 'skipLogin';
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
		{object: actualMapData.title, onlyOne: true},
		{object: POKEMON_EVOLUTION_METHODS},
		{object: POKEMON_MOVES_METHODS}
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
			if(OBJ.onlyOne == undefined)
			{
				parametr = '[j]';
				end = OBJ.object.length;
			}
			else
			{
				parametr = '';
				end = 1;
			}
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

	let worldMapConteiner = newElement('div',okno,'widnow_map','worldMapConteiner');
	let map_menu = newElement('div',worldMapConteiner,'mapMenu','map_menu');

	for(let i=0;i<mapMenu_buttons.length;i++)
	{
		let newbutton = newElement('div',map_menu,'mapMenuButton', ('mapMenuButton_' + mapMenu_buttons[i].english).replace(' ','_'));
		newbutton.innerHTML = mapMenu_buttons[i][language];
		newbutton.onclick = function(){clickMenuButton(this);}
	}

	newElement('div',worldMapConteiner,'','worldmapContent');

	const BUTTON_PLACES = [[1,0],[0,1],[1,2],[2,1]];

	let tableButton = newElement('table',worldMapConteiner,'tableButton','tableButton');
	for(let i=0;i<3;i++)
	{
		tableButton.insertRow(i);
		for(let j=0;j<3;j++)
		{
			tableButton.rows[i].insertCell(j);
		}
	}
	
	for(let i=0;i<4;i++)
	{
		const BUTTONS=['left','up','right','down'];
		let buttondiv = newElement('div',tableButton.rows[BUTTON_PLACES[i][0]].cells[BUTTON_PLACES[i][1]],'directButton button' + i);
		buttondiv.onmousedown = function(event){wayActive(event, this, BUTTONS[i]);}
		buttondiv.onmouseup = function(){wayUnactive(this);}
		buttondiv.onmouseout = function(){wayUnactive(this);}
		buttondiv.ontouchstart = function(event){wayActive(event, this, BUTTONS[i]);}
		buttondiv.ontouchend = function(){wayUnactive(this);}
	}
	
	activeWindow = 'unactive';
	
	activeUser.team =
	[
		new Pokemon(randomInt(pokemonList.length -1),2,-1,-1,0,0,-1,[3,2,1,0],'Test 1',-1,-1,'Szibi Snowpix',0,0),
		new Pokemon(randomInt(pokemonList.length -1),2,-1,-1,0,0,-1,[7,6,5,4],'Test 2',-1,-1,'Szibi Snowpix',0,0),
		null,null,null,null
	]

	activeWindow = true;
	clickMenuButton(document.getElementById('mapMenuButton_Adventure'));
}

function downloadDataBases(_RES,_number)
{
	switch(_number)
	{
		case 'maps':
		{
			let data = new FormData();
    		data.append('which', 1);
			sendRequest(downloadDataBases,'php/database.php?base=maps',data,'maps-pokemon');
		} 
		break;

		case 'maps-pokemon':
		{
			const RES = _RES[0];
			actualMapData.title.english = RES.name_eng;
			actualMapData.title.polski = RES.name_pl;
			actualMapData.no = RES.id;

			actualMap = RES.cells.split('/');
			for(let i=0;i<actualMap.length;i++)
			{
				actualMap[i] = actualMap[i].split('|');
				for(let j=0;j<actualMap[i].length;j++)
				{
					actualMap[i][j] = actualMap[i][j].split(',');
					for(let k=0;k<actualMap[i][j].length;k++)
					{
						actualMap[i][j][k] *= 1;
					}
				}
			}
			okno.innerHTML = '<img src=\'' + waitingImageUrl + '\'><br><br><b>downloading pokemon...</b>';
			sendRequest(downloadDataBases,'php/database.php?base=pokemon',null,'pokemon-moves');
		}
		break;

		case 'pokemon-moves':
		{
			Object.keys(_RES).forEach(element => 
			{
				const E = _RES[element];
				pokemonList[element*1] = new Pokemon_list(E.name,E.no,E.types,E.abilities,E.EVYeld,E.catchRate,
					E.baseExp,E.growthExp,E.femaleRate,E.eggGroup,E.eggCycles,E.baseStats_hp,E.baseStats_attack,
					E.baseStats_defence,E.baseStats_spAttack,E.baseStats_spDefence,E.baseStats_speed,E.preevolution_specie,
					E.preevolution_method,E.preevolution_value,E.height,E.weight);
			})
			okno.innerHTML = '<img src=\'' + waitingImageUrl + '\'><br><br><b>downloading moves...</b>';

			sendRequest(downloadDataBases,'php/database.php?base=moves',null,'moves-start');
		}
		break;

		case 'moves-start':
		{
			Object.keys(_RES).forEach(element => 
			{
				let el = _RES[element];

				moveList[element*1] = new PokemonMove({english: el.name_eng, polski: el.name_pl}, el.power, 
				el.accurancy, el.type, el.PP, el.target, el.priority, el.contact, el.effects);
			})

			start();
		}
		break;
	}
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

function sendRequest(_onReadyFunction,_url,_sendingData,_functionData)
{
	php_request.abort();

	php_request.onreadystatechange = function() 
	{
        if(this.readyState == 4 && this.status == 200)
		{
			clearInterval(requestInterval);

            console.log(this.responseText);
	        const RES = JSON.parse(this.responseText);
			console.log(RES);
            
	        if(_functionData == 'giveMeResText'){_functionData = this.responseText;}
			_onReadyFunction(RES,_functionData);
	    }
	};
    
	php_request.open("POST", _url, true);
	php_request.send(_sendingData);

	numberOfTries = 0;

	requestInterval = window.setInterval(function()
	{
		console.log('próba numer ' + ++numberOfTries + ' - niepowodzenie');

		php_request.abort();

		if(numberOfTries < 3)
		{
			php_request.open("POST", _url, true);
			php_request.send(_sendingData);
		}
		else
		{
			console.log('dupa z tego będzie, reset');
			clearInterval(requestInterval);
		}

	},3000)
	//abort()
}

function randomInt(_arg1 = 1, _arg2 = 0)
{
	let min,max;
	if(_arg1 == _arg2){return _arg1;}
	if(_arg1 > _arg2){min = _arg2; max = _arg1;}
	else{min = _arg1; max = _arg2;}
	return min + Math.floor(Math.random() * (max - min + 1))
}

function pokemonImage(_pokemon)
{
	let object = document.createElement('div');
	object.innerHTML = 'X';
	object.classList.add('image');
	return object;
}

function getPokemonNumberByName(_name)
{
	for(let i=0;i<pokemonList.length;i++)
	{
		if(_name == pokemonList[i].name)
		{
			return i;
		}
	}
}

function getTypeNumberByName(_name)
{
	for(let i=0;i<pokemonList.length;i++)
	{
		if(_name == POKEMON_TYPES[i].english)
		{
			return i;
		}
	}
}

function newElement(_what,_where, _class = '', _id = '')
{
	let div = document.createElement(_what);
	if(_class != '')
	{
		_class = _class.split(' ');
		for(let i=0;i<_class.length;i++)
		{
			div.classList.add(_class[i]);
		}
	}
	if(_id != ''){div.id = _id;}
	_where.appendChild(div);
	return div;
}
