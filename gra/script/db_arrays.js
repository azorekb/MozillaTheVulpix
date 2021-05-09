const POKEMON_TYPES = ['normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'];
const POKEMON_STATS = ['hp','attack','defence','spAttack','spDeffence','speed'];
const POKEMON_EXP_GROWTH = ['erratic','fast','medium fast','medium slow','slow','fluctuating'];
const ADMIN_WARNINGS =
[
    ['używaj tylko języka <u>angielskiego</u> oraz małych liter', 'use only <u>english</u> language and small letters'],
    ['kliknij w pole mapy aby zmienić je na wybrany wyżej element<br>użyj CTRL by móc zmienić pole najechaniem myszy<br>CTRL+Z nie działa', 'click on field to change element to selectet upper<br>use CTRL to change it with mouse over<br>CTRL+Z does not work'],
    ['zdecydowanie łatwiej jest używać panelu administratora na komputerze', 'it is so much better to use admin panel on the computer']
];

const MAP_ITEMS = 
[
    {name: 'grass', src: IMG_WAY+'trawa.png'},
    {name: 'wayNW', src: IMG_WAY+'drogaNW.png'},
    {name: 'wayN', src: IMG_WAY+'drogaN.png'},
    {name: 'wayNE', src: IMG_WAY+'drogaNE.png'},
    {name: 'wayW', src: IMG_WAY+'drogaW.png'},
    {name: 'wayC', src: IMG_WAY+'drogaC.png'},
    {name: 'wayE', src: IMG_WAY+'drogaE.png'},
    {name: 'waySW', src: IMG_WAY+'drogaSW.png'},
    {name: 'wayS', src: IMG_WAY+'drogaS.png'},
    {name: 'waySE', src: IMG_WAY+'drogaSE.png'},
    {name: 'tallgrass', src: IMG_WAY+'wysokatrawa.png'},
    {name: 'water', src: IMG_WAY+'woda.gif'},
    
];

const ADMIN_LIST_OF_TASKS =
[
    {name:['dodaj pokemona','add pokemon'], function: 'adm_formPokemon'},
    {name:['edytor map','map editor'], function: 'adm_mapEditor'},
];