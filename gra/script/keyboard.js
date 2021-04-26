window.addEventListener('keyup', function(event){event.preventDefault();}, false);
window.addEventListener('keydown', function(event)
{
	event.preventDefault();
	//console.log(event.keyCode);
	if(activeWindow==0)
	{
		if(event.keyCode>=37&&event.keyCode<=40){map_actionOfCharacter(event.keyCode-37);}
	}
	
	
}, false);