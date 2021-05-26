const POKEMON_TYPES = ['','normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'];
const POKEMON_STATS = ['hp','attack','defence','spAttack','spDefence','speed'];
const POKEMON_EXP_GROWTH = ['erratic','fast','medium fast','medium slow','slow','fluctuating'];
const ADMIN_WARNINGS =
[
    ['używaj tylko języka <u>angielskiego</u> oraz małych liter', 'use only <u>english</u> language and small letters'],
    ['kliknij w pole mapy aby zmienić je na wybrany wyżej element<br>użyj CTRL by móc zmienić pole najechaniem myszy<br>CTRL+Z nie działa', 'click on field to change element to selectet upper<br>use CTRL to change it with mouse over<br>CTRL+Z does not work'],
    ['zdecydowanie łatwiej jest używać panelu administratora na komputerze', 'it is so much better to use admin panel on the computer']
];

const MAP_ITEMS = 
[
    {name: 'grass', src: 'trawa.png'},
    {name: 'wayNW', src: 'drogaNW.png'},
    {name: 'wayN', src: 'drogaN.png'},
    {name: 'wayNE', src: 'drogaNE.png'},
    {name: 'wayW', src: 'drogaW.png'},
    {name: 'wayC', src: 'drogaC.png'},
    {name: 'wayE', src: 'drogaE.png'},
    {name: 'waySW', src: 'drogaSW.png'},
    {name: 'wayS', src: 'drogaS.png'},
    {name: 'waySE', src: 'drogaSE.png'},
    {name: 'tallgrass', src: 'wysokatrawa.png'},
    {name: 'water', src: 'woda.gif'},
    
];

const ADMIN_LIST_OF_TASKS =
[
    {name:['dodaj pokemona','add pokemon'], function: 'adm_formPokemon'},
    {name:['edytor map','map editor'], function: 'adm_mapEditor'},
    {name:['edytor ruchów','move editor'], function: 'adm_moveEditor_run'}
];

const ADMIN_MOVES_PROPERTIES = 
[
    {description: ['nr','no'], dbname: 'id'},
    {description: ['nazwa angielska','english name'], dbname: 'name_eng'},
    {description: ['nazwa polska','polish name'], dbname: 'name_pl'},
    {description: ['moc','power'], dbname: 'power'},
    {description: ['celność','accuracy'], dbname: 'accuracy'},
    {description: ['typ','type'], dbname: 'type'},
    {description: ['categoria','category'], dbname: 'category'},
    {description: ['PP','PP'], dbname: 'PP'},
    {description: ['cel','target'], dbname: 'target'},
    {description: ['efeckty','effects'], dbname: 'effects'}
];