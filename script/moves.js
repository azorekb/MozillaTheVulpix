function map_actionOfCharacter(_direct)
{
	let newX=actualPosition.x;
	let newY=actualPosition.y;
	if(_direct == 'up'){newY--;}
	if(_direct == 'down'){newY++;}
	if(_direct == 'left'){newX--;}
	if(_direct == 'right'){newX++;}
	if(newY == -1 || newX == -1 || newY == actualMap.length || newX == actualMap[0].length){return false;}

	const terrain = actualMap[newY][newX][0]*1;
	const object = actualMap[newY][newX][1]*1;
	const area = MAP_ITEMS.background[terrain].area;

	switch(object)
	{
		case 2: map_characterMove(_direct,mainCharacter,[newX,newY],'DrawAPokemonBattle'); break;
		case 1: console.log('zaczepianie sii joy'); break;
		case 0: switch(area)
		{
			case 'land': map_characterMove(_direct,mainCharacter,[newX,newY]);
		}
	}
}

function map_characterMove(_direct,_character,_position, inTheEnd = '')
{
	let j = 0;
	let typeOfMove = 0;
	let positionX = _position[0];
	let positionY = _position[1];
	
	if(actualMap[0].length>worldMapTable.rows[0].cells.length)
	{
		if(_position[0] > mapCenter.toX - mapCenter.isX - 1 && _position[0] < actualMap[0].length - mapCenter.toX - 1 && _direct == 'left')
		{
			positionX = mapCenter.toX - 1;
			typeOfMove = 1;
		}
		if(_position[0] > mapCenter.toX - mapCenter.isX && _position[0] < actualMap[0].length - mapCenter.toX && _direct != 'left')
		{
			positionX = mapCenter.toX - 1;
			if(_direct == 'right'){typeOfMove = 1;}
		}
		if(_position[0] >= actualMap[0].length - mapCenter.toX - 1 && _direct == 'left')
		{
			positionX=_position[0]-(actualMap[0].length-worldMapTable.rows[0].cells.length);
		}
		if(_position[0] >= actualMap[0].length - mapCenter.toX && _direct != 'left')
		{
			positionX = _position[0] - (actualMap[0].length - worldMapTable.rows[0].cells.length);
		}
		
	}
	if(actualMap[1].length > worldMapTable.rows.length)
	{
		if(_position[1] > mapCenter.toY - mapCenter.isY -1 && _position[1] < actualMap.length - mapCenter.toY -1 && _direct == 'up')
		{
			positionY = mapCenter.toY - 1;
			typeOfMove = 1;
		}
		if(_position[1] > mapCenter.toY - mapCenter.isY && _position[1] < actualMap.length - mapCenter.toY && _direct != 'up')
		{
			positionY = mapCenter.toY - 1;
			if(_direct == 'down'){typeOfMove = 1;}
		}
		if(_position[1] >= actualMap.length - mapCenter.toY - 1 && _direct == 'up')
		{
			positionY = _position[1] - (actualMap.length - worldMapTable.rows.length);
		}
		if(_position[1] >= actualMap.length - mapCenter.toY && _direct != 'up')
		{
			positionY = _position[1] - (actualMap.length - worldMapTable.rows.length);
		}
		
	}
	
	activeWindow = 'unactive';
	
	if(typeOfMove == 0)
	{
		for(let i=1;i<=SIZE_OF_TD;i++)
		{
			if(_direct == 'up'){setTimeout(function(){_character.style.top = ((positionY + 1) * SIZE_OF_TD - j); j++;}, i * speed);}
			if(_direct == 'down'){setTimeout(function(){_character.style.top = ((positionY - 1) * SIZE_OF_TD + j); j++;}, i * speed);}
			if(_direct == 'left'){setTimeout(function(){_character.style.left = ((positionX + 1) * SIZE_OF_TD - j); j++;}, i * speed);}
			if(_direct == 'right'){setTimeout(function(){_character.style.left = ((positionX - 1) * SIZE_OF_TD + j); j++;}, i * speed);}	
		}
		setTimeout(function()
		{
			_character.style.top = positionY * SIZE_OF_TD;
			_character.style.left = positionX * SIZE_OF_TD;
			endOfWalk(_position, typeOfMove, inTheEnd);
		},(SIZE_OF_TD + 1) * speed);
	}
	
	if(typeOfMove == 1)
	{
		if(window.innerWidth < MOBILE_WIDTH)
		{
			if(_direct == 'up' || _direct == 'down')
			{
				tableButton.classList.add('moving');
			}
		}
		else if(_direct == 'left' || _direct == 'right')
		{
			tableButton.classList.add('moving');
		}
		if(_direct == 'left')
		{
			let lastCell = worldMapTable.rows[0].cells.length;
			let newElement = _position[0] - mapCenter.toX - mapCenter.isX+2;
			
			for(let i=0;i<worldMapTable.rows.length;i++)
			{
				const imgNo = actualMap[_position[1] - positionY + i][newElement];
				mapImg(worldMapTable.rows[i].insertCell(0),imgNo,'both');
			}
			worldMapTable.style.left = -1 * SIZE_OF_TD;
			
			for(let i=1;i<=SIZE_OF_TD;i++)
			{
				setTimeout(function()
				{
					worldMapTable.style.left = j -1 * SIZE_OF_TD;
					j++;
				}, i * speed);
			}
			
			setTimeout(function()
			{
				for(let i=0;i<worldMapTable.rows.length;i++)
				{
					worldMapTable.rows[i].deleteCell(lastCell);
				}
				endOfWalk(_position, typeOfMove, inTheEnd);
				
			},(SIZE_OF_TD + 1) * speed);
		}
		
		if(_direct == 'right')
		{
			let lastCell = worldMapTable.rows[0].cells.length;
			let newElement = _position[0]+mapCenter.toX + mapCenter.isX - 1;
			
			for(let i=0;i<worldMapTable.rows.length;i++)
			{
				const imgNo = actualMap[_position[1] - positionY + i][newElement];
				mapImg(worldMapTable.rows[i].insertCell(lastCell),imgNo,'both');
			}
			
			for(let i=1;i<=SIZE_OF_TD;i++)
			{
				setTimeout(function()
				{
					worldMapTable.style.left = -j;
					j++;
				}, i * speed);
			}
			
			setTimeout(function()
			{
				for(let i=0;i<worldMapTable.rows.length;i++)
				{
					worldMapTable.rows[i].deleteCell(0);
				}
				endOfWalk(_position, typeOfMove, inTheEnd);
				
			},(SIZE_OF_TD + 1) * speed);
		}
		
		if(_direct == 'up')
		{
			let lastRow = worldMapTable.rows.length;
			worldMapTable.insertRow(0);
			worldMapTable.style.top = -1 * SIZE_OF_TD;
			
			let newElement = _position[1] - mapCenter.toY - mapCenter.isY + 2;
			
			for(let i=0;i<worldMapTable.rows[1].cells.length;i++)
			{
				const imgNo = actualMap[newElement][_position[0] - positionX + i];
				mapImg(worldMapTable.rows[0].insertCell(i),imgNo,'both');
			}
			
			for(let i=1;i<(SIZE_OF_TD+1);i++)
			{
				setTimeout(function()
				{
					worldMapTable.style.top = j -1 * SIZE_OF_TD;
					j++;
				}, i * speed);
			}
			
			setTimeout(function()
			{
				worldMapTable.deleteRow(lastRow);
				endOfWalk(_position, typeOfMove, inTheEnd);
				
			},(SIZE_OF_TD + 1) * speed);
		}
		
		if(_direct == 'down')
		{
			let lastRow = worldMapTable.rows.length;
			worldMapTable.insertRow(lastRow);
			let newElement = _position[1] + mapCenter.toY + mapCenter.isY - 1;
			
			for(let i=0;i<worldMapTable.rows[0].cells.length;i++)
			{
				const imgNo = actualMap[newElement][_position[0] - positionX + i];
				mapImg(worldMapTable.rows[lastRow].insertCell(i),imgNo,'both');
			}
			
			for(let i=1;i<=SIZE_OF_TD;i++)
			{
				setTimeout(function()
				{
					worldMapTable.style.top = -j;
					j++;
				}, i * speed);
			}
			
			setTimeout(function()
			{
				worldMapTable.deleteRow(0);
				endOfWalk(_position, typeOfMove, inTheEnd);
				
			},(SIZE_OF_TD + 1) * speed);
		}
	}
	
}

function endOfWalk(_position, _type, _end)
{
	if(_type == 1)
	{
		worldMapTable.style.left = 0;
		worldMapTable.style.top = 0;
		tableButton.classList.remove('moving');
	}
	actualPosition.x = _position[0];
	actualPosition.y = _position[1];

	activeWindow = 'worldmap';

	switch(_end)
	{
		case 'DrawAPokemonBattle':
		{
			if(ENCOUNTER_CHANCE > randomInt(100))
			{
				battle_start(null, 1);
			}
		}
		break;
	}

	if(way_comming != null)
	{
		map_actionOfCharacter(way_comming);
	}
	pozaza.innerHTML = actualPosition.x + '/' + actualPosition.y;
}

function mapImg(_object,_imgs,_choose)
{
	if(_choose == 'object' || _choose == 'both')
	{
		let img = document.createElement('img');
		img.src = _imgs[1] > 0 ? IMG_WAY + MAP_ITEMS.object[_imgs[1]].src : '';
		_object.innerHTML = '';
		_object.appendChild(img);
	}

	if(_choose == 'bg' || _choose == 'both')
	{
		let backGround = 'url(\''+ IMG_WAY + MAP_ITEMS.background[_imgs[0]].src +'\')';
		_object.style.backgroundImage = backGround;
	}
}