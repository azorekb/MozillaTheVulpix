window.addEventListener('keyup', function(event){event.preventDefault();}, false);
window.addEventListener('keydown', function(event)
{
	let active=false;
	//console.log('keyCode:', event.keyCode, 'key', event.key);

	switch(event.key)
	{
		case 'ArrowUp': globalButtons('direct','up'); active=true; break;
		case 'ArrowDown': globalButtons('direct','down'); active=true; break;
		case 'ArrowRight': globalButtons('direct','right'); active=true; break;
		case 'ArrowLeft': globalButtons('direct','left'); active=true; break;
	}
	if(active){event.preventDefault();}
	
}, false);

function globalButtons(_action,_parametr)
{
	if(_action == 'direct')
	{
		if(activeWindow == 'worldmap')
		{
			map_actionOfCharacter(_parametr);
		}
	}
}