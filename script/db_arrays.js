const POKEMON_TYPES = ['-','normal','fire','water','electric','grass','ice','fighting','poison','ground','flying','psychic','bug','rock','ghost','dragon','dark','steel','fairy'];
const POKEMON_STATS = ['hp','attack','defence','spAttack','spDefence','speed'];
const POKEMON_MOVE_TARGET = ['one opponent','all opponents','everyone','self','one allay','all allays'];
const POKEMON_EXP_GROWTH = ['erratic','fast','medium fast','medium slow','slow','fluctuating'];
const ADMIN_WARNINGS =
[
    ['używaj tylko języka <u>angielskiego</u> oraz małych liter', 'use only <u>english</u> language and small letters'],
    ['kliknij w pole mapy aby zmienić je na wybrany wyżej element<br>użyj CTRL by móc zmienić pole najechaniem myszy<br>CTRL+Z nie działa', 'click on field to change element to selectet upper<br>use CTRL to change it with mouse over<br>CTRL+Z does not work'],
    ['zdecydowanie łatwiej jest używać panelu administratora na komputerze', 'it is so much better to use admin panel on the computer']
];

const POKEMON_MOVE_EFFECTS = 
[
    ['recover once','leczenie jednorazowo'],
    ['recover by turs','leczenie co turę'],
    ['curse status problem','leczy zły status'],
    ['change attack','zmiana ataku'],
    ['change defence','zmiana obrony'],
    ['change lower sp attack','zmiana sp ataku'],
    ['change sp defence','zmiana sp obrony'],
    ['change speed','zmiana szybkości'],
    ['change random stat','zmiena losową cehcę'],
    ['change every stat','zmiena każdą cehcę'],
    ['change cristal hit ratio','zmienia szansę na obrażenia krytyczne'],
    ['switch place','zmiana miesjca'],
    ['unable to flee','uniemożliwienie ucieczki'],
    ['hit many times','uderzenie kilkakrotne'],
    ['hit constans value','udeża stałą wartością'],
    ['gives protity','daje priorytet'],
    ['change physical damage','zmienia obrażenia fizyczne'],
    ['change damage when first','zmienia obrażenia gdy pierwszy'],
    ['change damage when last','zmienia obrażenia gdy ostatni'],
    ['change pokemon','zmienia pokemona'],
    ['load move','ładuje ruch'],
    ['switch item','zamiania przedmiony'],
    ['trap','pułapka'],
    ['burn','poparzenia'],
    ['paralyze','paraliż'],
    ['poison','zatrucie'],
    ['freeze','zamarznięcie'],
    ['sleep','sen'],
    ['flinch','stchórzenie'],
    ['confuse','zmieszanie'],
    ['recoil damage','obrażenia zwrotne'],
    ['break barrier','niszczy bariery'],
    ['reset stats','resetuje cechy'],
    ['makes weather','powoduje pogodę'],
    ['mimick move','powtarza ruch'],
    ['copy move','kopjuje ruch'],
    ['copy move permanent','permanentnie kopjuje ruch'],
    
    // gdy nie ma itemku jest mocniejszy
]


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
    {description: ['nazwa angielska','english name'], dbname: 'name_eng', input: 'text'},
    {description: ['nazwa polska','polish name'], dbname: 'name_pl', input: 'text'},
    {description: ['moc','power'], dbname: 'power', input: 'number', min: 0, max: 300},
    {description: ['celność','accuracy'], dbname: 'accuracy', input: 'number', min: 0, max: 100},
    {description: ['typ','type'], dbname: 'type', input: 'select', table: POKEMON_TYPES},
    {description: ['categoria','category'], dbname: 'category',input: 'select', table: ['ph','sp','st']},
    {description: ['PP','PP'], dbname: 'PP', input: 'number', min: 1, max: 40},
    {description: ['cel','target'], dbname: 'target', input: 'select', table: POKEMON_MOVE_TARGET},
    {description: ['priorytet','priorytet'], dbname: 'priority', input: 'number', min: -10, max: 10},
    {description: ['kontakt','contact'], dbname: 'contact', input: 'checkbox'},
    {description: ['efeckty','effects'], dbname: 'effects', input: 'disabled'},
];