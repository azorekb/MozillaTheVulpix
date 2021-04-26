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
		document.getElementsByTagName('head').item(0).appendChild(script); 
	}
}