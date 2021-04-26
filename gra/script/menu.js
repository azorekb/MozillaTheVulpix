const WINDOW_UNACTIVE=-1;
const WINDOW_WORLDMAP=0;
const WINDOW_OPTIONS=1;
const POKEDEX_TEXTS={
    name:['gatunek','specie'],
    
}

let poktable;

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
    if(_element.id == 'mapMenuButton_Pokedex' && activeWindow == WINDOW_WORLDMAP)
    {
        let oknoText='<div class="pokedex_okno"><div class="pokedex_buttons">';
        const poki=Object.keys(POKEMON_LIST);
        for(let p=0;p<poki.length;p++)
        {
            oknoText+='<button onclick=pokedex_show("'+poki[p]+'")>'+poki[p]+'</button>';
        }
        oknoText+='</div><div id=pokedex_text class="pokedex_buttons"></div></div>';
        okno.innerHTML=oknoText;
        poktable=document.createElement('table');
        poktable.insertRow(0).insertCell(0).innerHTML=POKEDEX_TEXTS.name[language];
        poktable.rows[0].insertCell(1);

        pokedex_text.appendChild(poktable);
    }
    if(_element.id == 'mapMenuButton_Options' && activeWindow == WINDOW_WORLDMAP)
    {
        activeWindow=WINDOW_OPTIONS;
        okno.innerHTML="<button onclick=openMap()>X</button>"
    }
}

function pokedex_show(_pokemon)
{
    poktable.rows[0].cells[1].innerHTML=POKEMON_LIST[_pokemon].specie;


}