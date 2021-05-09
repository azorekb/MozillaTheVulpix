const POLSKI = 0;
const ENGLISH = 1;
let language = POLSKI;

if(sessionStorage.lang != undefined){language = sessionStorage.lang;}

function loadScripts()
{
	let listOfScripts = [];
	listOfScripts.push('db_classes');
	listOfScripts.push('db_constans');
	listOfScripts.push('db_globalvar');
	listOfScripts.push('db_arrays');
	listOfScripts.push('db_objects');
	listOfScripts.push('db_pokemon');
	listOfScripts.push('db_maps');

	listOfScripts.push('start');
	listOfScripts.push('moves');
	listOfScripts.push('keyboard');
	listOfScripts.push('menu');
	listOfScripts.push('adminpanel');
	
	for(let i=0;i<listOfScripts.length;i++)
	{
		let script  = document.createElement('script'); 
		script.src  = 'script/' + listOfScripts[i] + '.js'; 
		script.type = 'text/javascript'; 
		script.defer = true; 
		document.getElementsByTagName('body').item(0).appendChild(script); 
	}
}