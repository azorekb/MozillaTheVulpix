const POLSKI=0;
const ENGLISH=1;
let language=POLSKI;
if(sessionStorage.lang!=undefined){language=sessionStorage.lang;}

function loadScripts()
{
	let listOfScripts=[];
	listOfScripts.push('start');
	listOfScripts.push('maps');
	listOfScripts.push('moves');
	listOfScripts.push('keyboard');
	listOfScripts.push('menu');
	listOfScripts.push('database');
	for(let i=0;i<listOfScripts.length;i++)
	{
		let script  = document.createElement('script'); 
		script.src  = 'script/'+listOfScripts[i]+'.js'; 
		script.type = 'text/javascript'; 
		script.defer = true; 
		document.getElementsByTagName('body').item(0).appendChild(script); 
	}
}