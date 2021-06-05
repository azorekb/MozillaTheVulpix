const POKEMON_TYPES =
[
    {english: '-', polski: '-'},
    {english: 'normal', polski: 'normalny'},
    {english: 'fire', polski: 'ogognisty'},
    {english: 'water', polski: 'wodny'},
    {english: 'electric', polski: 'elekrtyczny'},
    {english: 'grass', polski: 'trawiasty'},
    {english: 'ice', polski: 'lowody'},
    {english: 'fighting', polski: 'walczący'},
    {english: 'poison', polski: 'trujący'},
    {english: 'ground', polski: 'ziemny'},
    {english: 'flying', polski: 'latający'},
    {english: 'psychic', polski: 'psychiczny'},
    {english: 'bug', polski: 'robaczy'},
    {english: 'rock', polski: 'kamienny'},
    {english: 'ghost', polski: 'duchowy'},
    {english: 'dragon', polski: 'smoczy'},
    {english: 'dark', polski: 'mroczny'},
    {english: 'steel', polski: 'stalowy'},
    {english: 'fairy', polski: 'wróżkowy'}
];

const POKEMON_STATS = 
[
    'hp',
    'attack',
    'defence',
    'spAttack',
    'spDefence',
    'speed'
];
const POKEMON_MOVE_TARGET = 
[
    {english: 'one opponent',   polski: 'jeden przeciwnik'},
    {english: 'all opponents', polski: 'każdy przeciwnik'},
    {english: 'everyone', polski: 'wyszyscy'},
    {english: 'self', polski: 'na siebie'},
    {english: 'one ally', polski: 'jeden sprzymierzeniec'},
    {english: 'all allies', polski: 'każdy sprzymierzeniec'}
];
const POKEMON_EXP_GROWTH = ['erratic','fast','medium fast','medium slow','slow','fluctuating'];

const POKEMON_MOVE_EFFECTS = 
[
    {polski: 'pusty', english: 'empty', disable: true},
    {
        polski: 'zmiana statusu',
        english: 'change status',
        types: 
        [
            {polski: 'zdrowy', english: 'ok'},
            {polski: 'poparzenia', english: 'burn'},
            {polski: 'zamrożenie', english: 'freeze'},
            {polski: 'paraliż', english: 'paralysis'},
            {polski: 'zatrucie', english: 'poison'},
            {polski: 'sen', english: 'sleep'},
            {english: 'flinch', polski: 'stchórzenie'},
            {english: 'confuse',polski: 'zmieszanie'},
            {english: 'inlove', polski: 'zauroczenie'},
        ]
    },
    {english: 'recoil damage', polski: 'obrażenia zwrotne'},
    {english: 'recover HP', polski: 'leczenie HP'},
    {english: 'drain HP', polski: 'kradzież HP'},
    {english: 'change attack', polski: 'zmiana ataku'},
    {english: 'change defence', polski: 'zmiana obrony'},
    {english: 'change lower sp attack', polski: 'zmiana sp ataku'},
    {english: 'change sp defence', polski: 'zmiana sp obrony'},
    {english: 'change speed', polski: 'zmiana szybkości'},
    {english: 'change random stat', polski: 'zmiena losowej cechy'},
    {english: 'change every stat', polski: 'zmiena każdej cechy'},
    {
        english: 'special event',
        polski: 'secjalne zdarzenie',
        types:
        [
            {english: 'switch place', polski: 'zmiana miesjca'},
            {english: 'unable to flee', polski: 'uniemożliwienie ucieczki'},
            {english: 'hit dwo times', polski: 'uderzenie dwukrotne'},
            {english: 'hit 2-5 times', polski: 'uderzenie 2-5 krotne'},
            {english: 'ignores attack and deffence', polski: 'ignorowanie ataku i obrony'},
            {english: 'return', polski: 'powrót'},
            {english: 'boost power', polski: 'bonus do mocy'},
        ]
    },
    {
        polski: 'zmiana pogody',
        english: 'change weather',
        types:
        [
            {english: 'none', polski: 'brak'},
            {english: 'rain', polski: 'deszcz'},
            {english: 'hail', polski: 'grad'},
            {english: 'sunny', polski: 'słonecznie'},
            {english: 'storm', polski: 'burza'},
            {english: 'strong wind', polski: 'silny wiatr'},
            {english: 'fog', polski: 'mgła'}
        ]
    },
    {
        polski: 'dwie tury', 
        english: 'two round',
        types:
        [
            {english: 'dig in hole', polski: 'pod ziemią'},
            {english: 'fly high', polski: 'lod w górę'},
            {english: 'under water', polski: 'pod wodą'},
            {english: 'rest', polski: 'odpoczynek'},
            {english: 'sun light', polski: 'światło słońca'},
            {english: 'waiting', polski: 'czekanie'},
        ]
    },
    {english: 'change cristal hit ratio', polski: 'zmiana szansy na obrażenia krytyczne'},
    {
        polski: 'pułapka',
        english: 'trap',
        types:
        [
            {english: 'bind', polski: 'związanie'},
            {english: 'flame weels', polski: 'krąg ognia'},
            {english: 'leech', polski: 'pijawka'},
            {english: 'stealth rock', polski: 'niewidzialna skała'},
            {english: 'spikes', polski: 'kolce'},
            {english: 'poison spikes', polski: 'trujące kolce'},
            {english: 'sticky web', polski: 'lepka sieć'},
            {english: 'unable tu use status', polski: 'uniemożliwienie użycia ruchu statusowego'},
        ]
    },
    {
        english: 'shield',
        polski: 'tarcza',
        types: 
        [
            {english: 'physical', polski: 'fizyczna'},
            {english: 'destruct physical', polski: 'zniszczenie fizycznej'},
            {english: 'special', polski: 'specjalna'},
            {english: 'destruct special', polski: 'zniszczenie specjalnej'},
            {english: 'completely', polski: 'całkowita'},
        ]
    },
    {
        english: 'cxhange battlefield',
        polski: 'zmiana pola walki',
        types:
        [
            {english: 'trick room', polski: 'pokój sztuczek'},
            {english: 'psychic terrain', polski: 'pole psychiczne'},
            {english: 'grassy terrain ', polski: 'trawiaste pole'},
            {english: 'electric terrain ', polski: 'elektryczne pole'},
            {english: 'misty terrain ', polski: 'mgliste pole'},
        ]
    },
    {
        english: 'it will be another move',
        polski: 'to będzie inny ruch',
        types:
        [
            {english: 'random', polski: 'losowy'},
            {english: 'replay targer', polski: 'powrórzenie za celem'},
            {english: 'copy for battle', polski: 'kopiowanie na czas walki'},
            {english: 'copy permanent', polski: 'trwałe skopiowanie ruchu'}
        ]
    }

    
    // usuwanie itemku rywala, 
    
    // {english: 'recover by turs', polski: 'leczenie co turę'},
    // {english: 'gives protity', polski: 'daje priorytet'},
    // {english: 'change physical damage', polski: 'zmienia obrażenia fizyczne'},
    // {english: 'change damage when first', polski: 'zmienia obrażenia gdy pierwszy'},
    // {english: 'change damage when last', polski: 'zmienia obrażenia gdy ostatni'},
    // {english: 'switch item', polski: 'zamiania przedmiony'},
    // gdy nie ma itemku jest mocniejszy
    
]

const MOVE_EFFECT_WHOM =
[
    {polski: 'cel', english: 'target'},
    {polski: 'używający', english: 'user'},
    {polski: 'przeciwnicy', english: 'opponents'},
    {polski: 'sprzymierzeńcy', english: 'allies'},
    {polski: 'wszyscy', english: 'everyone'}
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

//============================ ADMIN =============================================

const ADMIN_WARNINGS =
[
    {polski: 'używaj tylko języka <u>angielskiego</u> oraz małych liter', english: 'use only <u>english</u> language and small letters'},
    {polski: 'kliknij w pole mapy aby zmienić je na wybrany wyżej element<br>użyj CTRL by móc zmienić pole najechaniem myszy<br>CTRL+Z nie działa', english: 'click on field to change element to selectet upper<br>use CTRL to change it with mouse over<br>CTRL+Z does not work'},
    {polski: 'zdecydowanie łatwiej jest używać panelu administratora na komputerze', english: 'it is so much better to use admin panel on the computer'},
];

const ADMIN_LIST_OF_TASKS =
[
    {polski: 'pokemony', english: 'pokemon'},
    {polski: 'mapy', english: 'maps'}, 
    {polski: 'ruchy', english: 'moves'},
];

const ADMIN_MOVES_PROPERTIES = 
[
    {description: {polski: 'nr', english: 'no'}, dbname: 'id'},
    {description: {polski: 'nazwa angielska', english: 'english name'}, dbname: 'name_eng', input: 'text'},
    {description: {polski: 'nazwa polska', english: 'polish name'}, dbname: 'name_pl', input: 'text'},
    {description: {polski: 'moc', english: 'power'}, dbname: 'power', input: 'number', min: -300, max: 300},
    {description: {polski: 'celność', english: 'accuracy'}, dbname: 'accuracy', input: 'number', min: 0, max: 100},
    {description: {polski: 'typ', english: 'type'}, dbname: 'type', input: 'select', table: POKEMON_TYPES},
    {description: {polski: 'PP', english: 'PP'}, dbname: 'PP', input: 'number', min: 1, max: 40},
    {description: {polski: 'cel', english: 'target'}, dbname: 'target', input: 'select', table: POKEMON_MOVE_TARGET},
    {description: {polski: 'priorytet', english: 'priorytet'}, dbname: 'priority', input: 'number', min: -10, max: 10},
    {description: {polski: 'kontakt', english: 'contact'}, dbname: 'contact', input: 'checkbox'},
    {description: {polski: 'efekty', english: 'effects'}, dbname: 'effects', input: 'disabled'},
];

const ADMIN_EFFECTS_COLS =
[
    {polski: 'jaki', english: 'what'},
    {polski: 'wartość', english: 'value'},
    {polski: 'szanse', english: 'chance'},
    {polski: 'komu', english: 'whom'}
]