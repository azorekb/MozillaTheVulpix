window.addEventListener('keyup', function(event){event.preventDefault();}, false);
window.addEventListener('keydown', function(event)
{
	let active=false;
	//console.log(event.keyCode);
	if(activeWindow==0)
	{
		if(event.keyCode>=37&&event.keyCode<=40){map_actionOfCharacter(event.keyCode-37); active=true;}
	}
	
	if(active){event.preventDefault();}
	
}, false);