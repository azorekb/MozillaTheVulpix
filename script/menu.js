function clickMenuButton(_element)
{
    if(activeWindow != 'unactive')
    {
		tableButton.classList.add('none');
        switch(_element.id)
        {
            case 'mapMenuButton_Adventure': openMap(); break;
            case 'mapMenuButton_Pokedex': openPokedex(); break;
			case 'mapMenuButton_Admin_Panel': admin_start(); break;

            default: return false;
        }

        if(activeButton != null){activeButton.classList.remove('active');}
        activeButton = _element;
        _element.classList.add('active');
    }

}

function openPokedex()
{
    worldmapContent.innerHTML = '';

    let dex_containter = newElement('div',worldmapContent,'dexContainer','dex_containter');
    let dex_dataPlace = newElement('div',dex_containter,'dexPlace','dex_dataPlace');
    let dex_baseStats = newElement('div',dex_dataPlace,'dexBaseStats','dex_baseStats');
	let dex_pokemonList = newElement('div',dex_containter,'dexPokemonList','dex_pokemonList');

	for(let i=0;i<pokemonList.length;i++)
	{
		const pokemon = pokemonList[i];
		if(pokemon.no == 0){continue;}

		let newPokemon = newElement('div',dex_pokemonList,'pokedexPokemon');
		newPokemon.innerHTML = pokemon.no;
		newPokemon.onclick=function(){pokedex_show(i);}
	}

	let table = newElement('table',dex_baseStats,'pokedexTableOfStats','pokedex_tableOfStats');
	let rows = ['no','types','ability','baseStats','hp','attack','defence','spAttack','spDefence','speed'];
	for(let i=0;i<rows.length;i++)
	{
		table.insertRow(i).insertCell(0).innerHTML = POKEDEX_TEXTS[rows[i]].language();
		if(i == 2 || i == 3){table.rows[i].cells[0].colSpan = 2;}
		else{table.rows[i].insertCell(1).style.textAlign = 'right';}
	}
	table.insertRow(3).insertCell(0).colSpan = 2;
	
	activeWindow = 'pokedex';

    pokedex_show(0);
	// tableButton.classList.remove('none');
}

function pokedex_show(_pokemon)
{
	const pokemon = pokemonList[_pokemon];
    let type_text = POKEMON_TYPES[pokemon.types[0]].language();
    if(pokemon.types[1] != 0){type_text += '/' + POKEMON_TYPES[pokemon.types[1]].language();}
	
	pokedex_tableOfStats.rows[0].cells[0].innerHTML = POKEDEX_TEXTS.no.language() + ' ' + _pokemon.no;
	pokedex_tableOfStats.rows[0].cells[1].innerHTML = pokemon.name;
	pokedex_tableOfStats.rows[1].cells[1].innerHTML = type_text;
	pokedex_tableOfStats.rows[3].cells[0].innerHTML = POKEMON_ABILITIES[pokemon.abilities[0]].language(); + '<br>' + POKEMON_ABILITIES[pokemon.abilities[1]].language(); + '<br><i>' + POKEMON_ABILITIES[pokemon.abilities[2]].language(); + '</i>';
	pokedex_tableOfStats.rows[5].cells[1].innerHTML = pokemon.baseStats.hp;
	pokedex_tableOfStats.rows[6].cells[1].innerHTML = pokemon.baseStats.attack;
	pokedex_tableOfStats.rows[7].cells[1].innerHTML = pokemon.baseStats.defence;
	pokedex_tableOfStats.rows[8].cells[1].innerHTML = pokemon.baseStats.spAttack;
	pokedex_tableOfStats.rows[9].cells[1].innerHTML = pokemon.baseStats.spDefence;
	pokedex_tableOfStats.rows[10].cells[1].innerHTML = pokemon.baseStats.speed;
}

function openMap()
{
	worldmapContent.innerHTML = '';

	let worldMapWindow = newElement('div',worldmapContent,'worldMapWindow','worldMapWindow');	
	let worldMapTable = newElement('table',worldMapWindow,'worldmap','worldMapTable');
	
	mainCharacter = newElement('img',worldMapWindow);
	mainCharacter.style.position='absolute';
	mainCharacter.src = MAIN_CHARACTER_IMAGE;
	
	resize_worldMap();
	let helpdiv = newElement('div',worldMapWindow,'helpDiv','worldmap_helpdiv');
	helpdiv.style.height = worldMapTable.rows.length * SIZE_OF_TD;
	helpdiv.style.width = worldMapTable.rows[0].cells.length * SIZE_OF_TD;
	helpdiv.style.top = -1 * SIZE_OF_TD;
	helpdiv.style.left = -1 * SIZE_OF_TD;
	helpdiv.style.borderWidth = SIZE_OF_TD;
	//helpdiv.onclick=function(){worldMap_clickMove()};
	
	activeWindow = 'worldmap';
	tableButton.classList.remove('none');
	
}

function resize_worldMap()
{
	let x_count = Math.min(20,actualMap[0].length);//Math.floor((window.innerWidth-800)/20);
	let y_count = Math.min(20,actualMap[0].length);//Math.floor((window.innerHeight-400)/20);
	mapCenter.toY = Math.ceil(y_count / 2);
	mapCenter.isY = 1-y_count % 2;
	mapCenter.toX = Math.ceil(x_count / 2);
	mapCenter.isX = 1-x_count % 2;
	
	let firstCell = {x:0, y:0};
	let newPosition = {x:actualPosition.x, y:actualPosition.y};
	
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
			const imgNo = actualMap[i + firstCell.y][j + firstCell.x];
			mapImg(worldMapTable.rows[i].insertCell(j),imgNo,'both');
		}
	}
	
	mainCharacter.style.left = SIZE_OF_TD * newPosition.x;
	mainCharacter.style.top = SIZE_OF_TD * newPosition.y;
	
}