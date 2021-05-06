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
    if(activeWindow != 'unactive')
    {
        switch(_element.id)
        {
            case 'mapMenuButton_Adventure': openMap(); break;
            case 'mapMenuButton_Pokedex': openPokedex(); break;

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

    dex_containter = document.createElement('div');
    dex_containter.classList.add('dexContainer');
    worldmapContent.appendChild(dex_containter);

    dex_dataPlace = document.createElement('div');
    dex_dataPlace.classList.add('dexPlace');
    dex_containter.appendChild(dex_dataPlace);

    dex_baseStats = document.createElement('div');
    dex_baseStats.classList.add('dexBaseStats');
    dex_dataPlace.appendChild(dex_baseStats);

	dex_pokemonList = document.createElement('div');
	dex_pokemonList.classList.add('dexPokemonList');
	dex_containter.appendChild(dex_pokemonList);

	let list = Object.keys(POKEMON_LIST);
	for(let i=0;i<list.length;i++)
	{
		const pokemon = POKEMON_LIST[list[i]];
		if(pokemon.no == 0){continue;}
		let newPokemon = document.createElement('div');
		newPokemon.classList.add('pokedexPokemon');
		newPokemon.innerHTML = pokemon.no;
		newPokemon.onclick=function(){pokedex_show(list[i]);}
		dex_pokemonList.appendChild(newPokemon);
	}

	let table = document.createElement('table');
	let rows = ['no','types','ability','baseStats','hp','attack','defence','spAttack','spDefence','speed'];
	for(let i=0;i<rows.length;i++)
	{
		table.insertRow(i).insertCell(0).innerHTML = POKEDEX_TEXTS[rows[i]][language];
		if(i == 2 || i == 3){table.rows[i].cells[0].colSpan = 2;}
		else{table.rows[i].insertCell(1).style.textAlign = 'right';}
	}

	table.insertRow(3).insertCell(0).colSpan = 2;
	table.id = 'pokedex_tableOfStats';
	table.classList.add('pokedexTableOfStats');
	dex_baseStats.appendChild(table);
	
	activeWindow = 'pokedex';

    pokedex_show('eevee');
}

function pokedex_show(_pokemon)
{
    let type_text = POKEMON_LIST[_pokemon].types.first;
    if(POKEMON_LIST[_pokemon].types.second != ''){type_text += '/' + POKEMON_LIST[_pokemon].types.second;}
	
	pokedex_tableOfStats.rows[0].cells[0].innerHTML = POKEDEX_TEXTS.no[language] + ' ' + POKEMON_LIST[_pokemon].no;
	pokedex_tableOfStats.rows[0].cells[1].innerHTML = _pokemon;
	pokedex_tableOfStats.rows[1].cells[1].innerHTML = type_text;
	pokedex_tableOfStats.rows[3].cells[0].innerHTML = POKEMON_LIST[_pokemon].abilities.first + '<br>' + POKEMON_LIST[_pokemon].abilities.second + '<br><i>' + POKEMON_LIST[_pokemon].abilities.hidden + '</i>';
	pokedex_tableOfStats.rows[5].cells[1].innerHTML = POKEMON_LIST[_pokemon].baseStats.hp;
	pokedex_tableOfStats.rows[6].cells[1].innerHTML = POKEMON_LIST[_pokemon].baseStats.attack;
	pokedex_tableOfStats.rows[7].cells[1].innerHTML = POKEMON_LIST[_pokemon].baseStats.defence;
	pokedex_tableOfStats.rows[8].cells[1].innerHTML = POKEMON_LIST[_pokemon].baseStats.spAttack;
	pokedex_tableOfStats.rows[9].cells[1].innerHTML = POKEMON_LIST[_pokemon].baseStats.spDefence;
	pokedex_tableOfStats.rows[10].cells[1].innerHTML = POKEMON_LIST[_pokemon].baseStats.speed;
}

function openMap()
{
    worldmapContent.innerHTML = '';
	worldMapWindow = document.createElement('div');
	worldMapWindow.classList.add('worldMapWindow');
	
	worldMapTable = document.createElement('table');
	worldMapTable.classList.add('worldmap');
	worldMapWindow.appendChild(worldMapTable);
	
	mainCharacter = document.createElement('img');
	mainCharacter.style.position='absolute';
	mainCharacter.src = '../img/joy.png';
	resize_worldMap();
	worldMapWindow.appendChild(mainCharacter);
	worldmapContent.appendChild(worldMapWindow);

	let helpdiv = document.createElement('div');
	helpdiv.classList.add('helpDiv');
	helpdiv.style.height = worldMapTable.rows.length * SIZE_OF_TD;
	helpdiv.style.width = worldMapTable.rows[0].cells.length * SIZE_OF_TD;
	helpdiv.style.top = -1 * SIZE_OF_TD;
	helpdiv.style.left = -1 * SIZE_OF_TD;
	helpdiv.style.borderWidth = SIZE_OF_TD;
	//helpdiv.onclick=function(){worldMap_clickMove()};
	helpdiv.id='worldmap_helpdiv';
	worldMapWindow.appendChild(helpdiv);

	activeWindow = 'worldmap';
	
}

function resize_worldMap()
{
	let x_count = 20;//Math.floor((window.innerWidth-800)/20);
	let y_count = 20;//Math.floor((window.innerHeight-400)/20);
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
			worldMapTable.rows[i].insertCell(j).innerHTML='<img src=../img/' + actualMap[i + firstCell.y][j + firstCell.x] + '.png>';
		}
	}
	
	mainCharacter.style.left = SIZE_OF_TD * newPosition.x;
	mainCharacter.style.top = SIZE_OF_TD * newPosition.y;
	
}