let actualPosition = {x:0, y:0};
let activeWindow=-1;
const DIRECT_UP=1;
const DIRECT_DOWN=3;
const DIRECT_LEFT=0;
const DIRECT_RIGHT=2;

let actualMap=testmap;

function map_actionOfCharacter(_direct)
{
	let newX=actualPosition.x;
	let newY=actualPosition.y;
	if(_direct==DIRECT_UP){newY--;}
	if(_direct==DIRECT_DOWN){newY++;}
	if(_direct==DIRECT_LEFT){newX--;}
	if(_direct==DIRECT_RIGHT){newX++;}
	if(newY==-1||newX==-1||newY==actualMap.length||newX==actualMap[0].length){return false;}
	

	//przeszkoda=aktualnaMapa[newX+1][newY][0];
	//teren=aktualnaMapa[newX+1][newY][1];
	map_characterMove(_direct,mainCharacter,[newX,newY]);
}

function map_characterMove(_direct,_character,_position)
{
	let speed=10;
	let j=0;
	let typeOfMove=0;
	let positionX=_position[0];
	let positionY=_position[1];
	
	if(actualMap[0].length>worldMapTable.rows[0].cells.length)
	{
		if(_position[0]>mapCenter.toX-mapCenter.isX-1&&_position[0]<actualMap[0].length-mapCenter.toX-1&&_direct==DIRECT_LEFT)
		{
			positionX=mapCenter.toX-1;
			typeOfMove=1;
		}
		if(_position[0]>mapCenter.toX-mapCenter.isX&&_position[0]<actualMap[0].length-mapCenter.toX&&_direct!=DIRECT_LEFT)
		{
			positionX=mapCenter.toX-1;
			if(_direct==DIRECT_RIGHT){typeOfMove=1;}
		}
		if(_position[0]>=actualMap[0].length-mapCenter.toX-1&&_direct==DIRECT_LEFT)
		{
			positionX=_position[0]-(actualMap[0].length-worldMapTable.rows[0].cells.length);
		}
		if(_position[0]>=actualMap[0].length-mapCenter.toX&&_direct!=DIRECT_LEFT)
		{
			positionX=_position[0]-(actualMap[0].length-worldMapTable.rows[0].cells.length);
		}
		
	}
	if(actualMap[1].length>worldMapTable.rows.length)
	{
		if(_position[1]>mapCenter.toY-mapCenter.isY-1&&_position[1]<actualMap.length-mapCenter.toY-1&&_direct==DIRECT_UP)
		{
			positionY=mapCenter.toY-1;
			typeOfMove=1;
		}
		if(_position[1]>mapCenter.toY-mapCenter.isY&&_position[1]<actualMap.length-mapCenter.toY&&_direct!=DIRECT_UP)
		{
			positionY=mapCenter.toY-1;
			if(_direct==DIRECT_DOWN){typeOfMove=1;}
		}
		if(_position[1]>=actualMap.length-mapCenter.toY-1&&_direct==DIRECT_UP)
		{
			positionY=_position[1]-(actualMap.length-worldMapTable.rows.length);
		}
		if(_position[1]>=actualMap.length-mapCenter.toY&&_direct!=DIRECT_UP)
		{
			positionY=_position[1]-(actualMap.length-worldMapTable.rows.length);
		}
		
	}
	
	activeWindow=WINDOW_UNACTIVE;
	if(typeOfMove==1 && (_direct==DIRECT_LEFT || _direct==DIRECT_RIGHT))
	{
		map_menu.style.marginLeft=0;
	}
	
	if(typeOfMove==0)
	{
		for(let i=1;i<21;i++)
		{
			if(_direct==DIRECT_UP){setTimeout(function(){_character.style.top=(positionY*20+20-j); j++;},i*speed);}
			if(_direct==DIRECT_DOWN){setTimeout(function(){_character.style.top=(positionY*20-20+j); j++;},i*speed);}
			if(_direct==DIRECT_LEFT){setTimeout(function(){_character.style.left=(positionX*20+20-j); j++;},i*speed);}
			if(_direct==DIRECT_RIGHT){setTimeout(function(){_character.style.left=(positionX*20-20+j); j++;},i*speed);}
			
		}
		setTimeout(function()
		{
			_character.style.top=positionY*20;
			_character.style.left=positionX*20;
			endOfWalk(_position,typeOfMove);
		},21*speed);
	}
	
	
	if(typeOfMove==1)
	{
		if(_direct==DIRECT_LEFT)
		{
			let lastCell=worldMapTable.rows[0].cells.length;
			let newElement=_position[0]-mapCenter.toX-mapCenter.isX+2;
			console.log(newElement);
			
			for(let i=0;i<worldMapTable.rows.length;i++)
			{
				worldMapTable.rows[i].insertCell(0).innerHTML='<img src=../img/'+actualMap[_position[1]-positionY+i][newElement]+'.png>';
			}
			worldMapTable.style.left=-20;
			
			for(let i=1;i<21;i++)
			{
				setTimeout(function()
				{
					worldMapTable.style.left=j-20;
					j++;
				},i*speed);
			}
			
			setTimeout(function()
			{
				for(let i=0;i<worldMapTable.rows.length;i++)
				{
					worldMapTable.rows[i].deleteCell(lastCell);
				}
				endOfWalk(_position,typeOfMove);
				
			},21*speed);
		}
		
		if(_direct==DIRECT_RIGHT)
		{
			let lastCell=worldMapTable.rows[0].cells.length;
			let newElement=_position[0]+mapCenter.toX+mapCenter.isX-1;
			
			for(let i=0;i<worldMapTable.rows.length;i++)
			{
				worldMapTable.rows[i].insertCell(lastCell).innerHTML='<img src=../img/'+actualMap[_position[1]-positionY+i][newElement]+'.png>';
			}
			
			for(let i=1;i<21;i++)
			{
				setTimeout(function()
				{
					worldMapTable.style.left=-j;
					j++;
				},i*speed);
			}
			
			setTimeout(function()
			{
				for(let i=0;i<worldMapTable.rows.length;i++)
				{
					worldMapTable.rows[i].deleteCell(0);
				}
				endOfWalk(_position,typeOfMove);
				
			},21*speed);
		}
		
		if(_direct==DIRECT_UP)
		{
			let lastRow=worldMapTable.rows.length;
			worldMapTable.insertRow(0);
			worldMapTable.style.top=-20;
			
			let newElement=_position[1]-mapCenter.toY-mapCenter.isY+2;
			
			for(let i=0;i<worldMapTable.rows[1].cells.length;i++)
			{
				worldMapTable.rows[0].insertCell(i).innerHTML='<img src=../img/'+actualMap[newElement][_position[0]-positionX+i]+'.png>';
			}
			
			for(let i=1;i<21;i++)
			{
				setTimeout(function()
				{
					worldMapTable.style.top=j-20;
					j++;
				},i*speed);
			}
			
			setTimeout(function()
			{
				worldMapTable.deleteRow(lastRow);
				endOfWalk(_position,typeOfMove);
				
			},21*speed);
		}
		
		if(_direct==DIRECT_DOWN)
		{
			let lastRow=worldMapTable.rows.length;
			worldMapTable.insertRow(lastRow);
			let newElement=_position[1]+mapCenter.toY+mapCenter.isY-1;
			
			for(let i=0;i<worldMapTable.rows[0].cells.length;i++)
			{
				worldMapTable.rows[lastRow].insertCell(i).innerHTML='<img src=../img/'+actualMap[newElement][_position[0]-positionX+i]+'.png>';
			}
			
			for(let i=1;i<21;i++)
			{
				setTimeout(function()
				{
					worldMapTable.style.top=-j;
					j++;
				},i*speed);
			}
			
			setTimeout(function()
			{
				worldMapTable.deleteRow(0);
				endOfWalk(_position,typeOfMove);
				
			},21*speed);
		}
	}
	
}

function endOfWalk(_position,_type)
{
	if(_type==1)
	{
		worldMapTable.style.left=0;
		worldMapTable.style.top=0;
	}
	actualPosition.x=_position[0];
	actualPosition.y=_position[1];
	activeWindow=WINDOW_WORLDMAP;
	pozaza.innerHTML=actualPosition.x+'/'+actualPosition.y;
	map_menu.style.marginLeft=20;
}