window.addEventListener('keyup', function(event){event.preventDefault();}, false);
window.addEventListener('keydown', function(event)
{
	let active=false;
	//console.log('keyCode:', event.keyCode, 'key', event.key);

	switch(event.key)
	{
		case 'ArrowUp': prevent = globalButtons('direct','up'); active = true; break;
		case 'ArrowDown': prevent = globalButtons('direct','down'); active = true; break;
		case 'ArrowRight': prevent = globalButtons('direct','right'); active = true; break;
		case 'ArrowLeft': prevent = globalButtons('direct','left'); active = true; break;

		default: prevent = false;
	}
	if(active && prevent){event.preventDefault();}
	
}, false);

function globalButtons(_action,_parametr)
{
	let prevent = false;
	if(_action == 'direct')
	{
		if(activeWindow == 'worldmap')
		{
			map_actionOfCharacter(_parametr);
			prevent = true;
		}
	}

	return prevent;
}