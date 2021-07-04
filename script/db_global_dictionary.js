const POKEMON_TYPES =
[
    {english: '-', resistance: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},
    {english: 'normal', polski: 'normalny', resistance: [1,1,1,1,1,1,2,1,1,1,1,1,1,0,1,1,1,1]},
    {english: 'fire', polski: 'ognisty', resistance: [1,0.5,2,1,0.5,0.5,1,1,2,1,1,0.5,2,1,1,1,0.5,0.5]},
    {english: 'water', polski: 'wodny', resistance: [1,0.5,0.5,2,2,0.5,1,1,1,1,1,1,1,1,1,1,0.5,1]},
    {english: 'electric', polski: 'elekrtyczny', resistance: [1,1,1,0.5,1,1,1,1,2,0.5,1,1,1,1,1,1,0.5,1]},
    {english: 'grass', polski: 'trawiasty', resistance: [1,2,0.5,0.5,0.5,2,1,2,0.5,2,1,2,1,1,1,1,1,1]},
    {english: 'ice', polski: 'lowody', resistance: [1,2,1,1,1,0.5,2,1,1,1,1,1,2,1,1,1,2,1]},
    {english: 'fighting', polski: 'walczący', resistance: [1,1,1,1,1,1,1,1,1,2,2,0.5,0.5,1,1,0.5,1,2]},
    {english: 'poison', polski: 'trujący', resistance: [1,1,1,1,0.5,1,0.5,0.5,2,1,2,0.5,1,1,1,1,1,0.5]},
    {english: 'ground', polski: 'ziemny', resistance: [1,1,2,0,2,2,1,0.5,1,1,1,1,0.5,1,1,1,1,1]},
    {english: 'flying', polski: 'latający', resistance: [1,1,1,2,0.5,2,0.5,1,0,1,1,0.5,2,1,1,1,1,1]},
    {english: 'psychic', polski: 'psychiczny', resistance: [1,1,1,1,1,1,0.5,1,1,1,0.5,2,1,2,1,2,1,1]},
    {english: 'bug', polski: 'robaczy', resistance: [1,2,1,1,0.5,1,0.5,1,0.5,2,1,1,2,1,1,1,1,1]},
    {english: 'rock', polski: 'kamienny', resistance: [0.5,0.5,2,1,2,1,2,0.5,2,0.5,1,1,1,1,1,1,2,1]},
    {english: 'ghost', polski: 'duchowy', resistance: [0,1,1,1,1,1,0,0.5,1,1,1,0.5,1,2,1,2,1,1]},
    {english: 'dragon', polski: 'smoczy', resistance: [1,0.5,0.5,0.5,0.5,2,1,1,1,1,1,1,1,1,2,1,1,2]},
    {english: 'dark', polski: 'mroczny', resistance: [1,1,1,1,1,1,2,1,1,1,0,2,1,0.5,1,0.5,1,2]},
    {english: 'steel', polski: 'stalowy', resistance: [0.5,2,1,1,0.5,0.5,2,0,2,0.5,0.5,0.5,0.5,1,0.5,1,0.5,0.5]},
    {english: 'fairy', polski: 'wróżkowy', resistance: [1,1,1,1,1,1,0.5,2,1,1,1,0.5,1,1,0,0.5,2,1]},
];

const POKEMON_STATS = 
[
    {english: '-',},
    {english: 'hp', polski: 'życie'},
    {english: 'attack', polski: 'atak'},
    {english: 'defence', polski: 'obrona'},
    {english: 'spAttack', polski: 'sp. atak'},
    {english: 'spDefence', polski: 'sp. obrona'},
    {english: 'speed', polski: 'szybkość'},
];

const POKEMON_ABILITIES = 
[
    {english: '-', done: true},
    {english: 'run away', polski: 'ucieczka'},
    {english: 'adaptability'},
    {english: 'anticipation'},
    {english: 'flash fire'},
    {english: 'guts'},
    {english: 'volt absorb'},
    {english: 'quick feet'},
    {english: 'water absorb'},
    {english: 'hydration'},
    {english: 'leaf guard'},
    {english: 'chlorophyll'},
    {english: 'snow cloak'},
    {english: 'ice body'},
    {english: 'synchronize'},
    {english: 'magic bounce'},
    {english: 'inner focus'},
    {english: 'cute charm'},
    {english: 'pixilate'},
    {english: 'simple'},
    {english: 'unaware'},
    {english: 'moody'},
    {english: 'keen eye'},
    {english: 'sheer force'},
    {english: 'hustle'},
    {english: 'defiant'},
    {english: 'drought'},
    {english: 'swift swim'},
    {english: 'water veil'},
    {english: 'dry skin'},
    {english: 'sand veil'},
    {english: 'solar power'},
    {english: 'big pecks'},
    {english: 'gale wings'},
    {english: 'flame body'},
    {english: 'rivalry'},
    {english: 'intimidate'},
    {english: 'hyper cutter'},
    {english: 'mold breaker'},
    {english: 'moxie'},
    {english: 'steadfast'},
    {english: 'prankster'},
    {english: 'justtified'},
    {english: 'regenerator'},
    {english: 'reckless'},
    {english: 'vital spirit'},
    {english: 'poison point'},
    {english: 'poison touch'},
    {english: 'static'},
    {english: 'lightning rod'},
    {english: 'compound eyes'},
    {english: 'tinted lens'},
    {english: 'shield dust'},
    {english: 'wonder skin'},
    {english: 'rock head'},
    {english: 'overcoat'},
    {english: 'aerilate'},
    {english: 'early bird'},
    {english: 'unnerve'},
    {english: 'own tempo'},
    {english: 's9tamina'},
    {english: 'anger point'},
    {english: 'thick fat'},
    {english: 'scrappy'},
    {english: 'sap sipper'},
    {english: 'multitype'},
    {english: 'storm drain'},
    {english: 'magic drain'},
    {english: 'refigerate'},
    {english: 'zephyr boost'},
    {english: 'huge power'},

    {english: 'new 1'},
    {english: 'new 2'},
    {english: 'new 3'},
    {english: 'new 4'},
    {english: 'new 5'},
    {english: 'new 6'},
    {english: 'new 7'},
    {english: 'new 8'},
    {english: 'new 9'},
    {english: 'new 10'},
    {english: 'new 11'},
    {english: 'new 12'},
    {english: 'new 13'},
    {english: 'new 14'},
    {english: 'new 15'},
    {english: 'new 16'},
    {english: 'new 17'},
    {english: 'new 18'},
    {english: 'new 19'},
    {english: 'new 20'},
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

const POKEMON_EXP_GROWTH = 
[
    {english: 'erratic', polski: 'niekonsekwentnie'},
    {english: 'fast', polski: 'szybko'},
    {english: 'medium fast', polski: 'średnio szybko'},
    {english: 'medium slow', polski: 'średnio wolno'},
    {english: 'slow', polski: 'wolno'},
    {english: 'fluctuating', polski: 'wachająco'},
];

const POKEMON_EGG_GROUP = 
[
    {english: 'amprphus'},
    {english: 'bug'},
    {english: 'dragon'},
    {english: 'fairy'},
    {english: 'field'},
    {english: 'flying'},
    {english: 'gress'},
    {english: 'human-like'},
    {english: 'mineral'},
    {english: 'monster'},
    {english: 'water'},
    {english: 'ditto'},
    {english: 'undiscovered'},

]

const POKEMON_MOVE_EFFECTS = 
[
    {english: '-', disable: true, done: true},
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
    },
    {
        english: 'items',
        types:
        [
            {english: 'steal'},
            {english: 'swap'},
            {english: 'deactive'},
            {english: 'reactive'},
            {english: 'give'},
            {english: 'use (user\'s)'},
            {english: 'use (target\'s)'},
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
    
];

const MOVE_EFFECT_WHOM =
[
    {polski: 'cel', english: 'target'},
    {polski: 'używający', english: 'user'},
    {polski: 'przeciwnicy', english: 'opponents'},
    {polski: 'sprzymierzeńcy', english: 'allies'},
    {polski: 'wszyscy', english: 'everyone'}
];

const MAP_ITEMS = 
{
    background:
    [
        {name: 'grass', src: 'trawa.png', area: 'land'},
        {name: 'wayNW', src: 'drogaNW.png', area: 'land'},
        {name: 'wayN', src: 'drogaN.png', area: 'land'},
        {name: 'wayNE', src: 'drogaNE.png', area: 'land'},
        {name: 'wayW', src: 'drogaW.png', area: 'land'},
        {name: 'wayC', src: 'drogaC.png', area: 'land'},
        {name: 'wayE', src: 'drogaE.png', area: 'land'},
        {name: 'waySW', src: 'drogaSW.png', area: 'land'},
        {name: 'wayS', src: 'drogaS.png', area: 'land'},
        {name: 'waySE', src: 'drogaSE.png', area: 'land'},
        {name: 'water', src: 'woda.gif', area: 'water'},
    ],
    
    object:
    [
        {name: 'none', src: 'nic.gif'},
        {name: 'sis Joy', src: 'joy.png'},
        {name: 'tallgrass', src: 'wysokatrawa.png'},
        {name: 'statue', src: 'statua.png'},
        {name: 'statue base', src: 'statua_podstawa.png'},
        {name: 'plate', src: 'tabliczka.png'},
        {name: 'bush', src: 'krzaczek.png'},
    ]
};
    
const POKEDEX_TEXTS = 
{
    no: {polski: 'nr', english: 'no.'},
    types: {polski: 'typy', english: 'types'},
    ability: {polski: 'umiejętności', english: 'abilities'},
    baseStats: {polski: 'bazowe statystyki', english: 'base stats'},
    hp: {polski: 'życie', english: 'hit points'},
    attack: {polski: 'atak', english: 'attack'},
    defence: {polski: 'obrona', english: 'defence'},
    spAttack: {polski: 'sp. atak', english: 'sp. attack'},
    spDefence: {polski: 'sp. obrona', english: 'sp. defence'},
    speed: {polski: 'szybkość', english: 'speed'},
};

const POKEMON_EVOLUTION_METHODS =
[
    {english: '', subtype: ['']},
    {english: 'level', subtype: new NumberArray(2,100)},
    {english: 'stone', subtype: ['water', 'fire', 'thunder', 'sun', 'moon', 'leaf', 'ice', 'dusk', 'dawn', 'shiny','mega']},
    {english: 'place', subtype: ['mossy rock', 'icy rock', 'electric field']},
    {english: 'friendship', subtype: ['', 'daytime', 'nighttime']},
    {english: 'love', subtype: ['fairy move']},
    {english: 'trade', subtype: ['']},
];

const MAIN_TEXTS =
{
    logIn: {texts: {polski: 'Logowanie', english: 'Log&nbsp;In'}, object: login_tab_logIn},
	register: {texts: {polski: 'Rejestracja', english: 'Register'}, object: login_tab_register},
	name_log: {texts: {polski: 'nazwa użytkownika', english: 'user name'}, object: login_name},
	// name_reg: {texts: {polski: 'nazwa użytkownika', english: 'user name'}, object: register_name},
	password_log: {texts: {polski: 'hasło', english: 'password'}, object: login_password},
	// password_reg: {texts: {polski: 'hasło', english: 'password'}, object: register_password},
	send_log: {texts: {polski: 'wyślij', english: 'send'}, object: login_button},
	// send_reg: {texts: {polski: 'wyślij', english: 'send'}, object: register_button},
};

const MAIN_ERRORS = 
{
    noUserName: {polski: 'nazwa użytkownika jest pusta', english: 'user name is empty'},
    shortUserName: {polski: 'nazwa użytkownika jest zbyt krótka (min 4 liter)', english: 'user name is too short (min 4 letters)'},
    wrongUserName: {polski: 'podana nazwa użytkownika nie istnieje', english: 'given user name doesn\'t exist'},
    noPassword: {polski: 'hasło jest puste', english: 'password is empty'},
    shortPassword: {polski: 'hasło jest zbyt krótkie (min 4 liter)', english: 'hasło is too short (min 4 letters)'},
    wrongPassword: {polski: 'podane hasło jest nieprawidłowe', english: 'given password is incorrect'},
};

let temporaryArray = [];
for(let i = 1; i <= 100; i++)
{
    temporaryArray[i-1] = {english: i + ' level', polski: i + ' poziom'};
}

const POKEMON_MOVES_METHODS =
[
    {english: 'egg moves'},
    {english: 'evolution'},
    {english: 'TM/TR/HM'},
    {english: 'tutor'},
    ...temporaryArray
]

const POKEMON_NATURE =
[
    {english: 'Hardy', statUp: 2, statDown: 2},
    {english: 'Lonely', statUp: 2, statDown: 3},
    {english: 'Adamant', statUp: 2, statDown: 4},
    {english: 'Naughty', statUp: 2, statDown: 5},
    {english: 'Brave', statUp: 2, statDown: 6},
    {english: 'Bold', statUp: 3, statDown: 2},
    {english: 'Docile', statUp: 3, statDown: 3},
    {english: 'Impish', statUp: 3, statDown: 4},
    {english: 'Lax', statUp: 3, statDown: 5},
    {english: 'Relaxed', statUp: 3, statDown: 6},
    {english: 'Modest', statUp: 4, statDown: 2},
    {english: 'Mild', statUp: 4, statDown: 3},
    {english: 'Bashful', statUp: 4, statDown: 4},
    {english: 'Rash', statUp: 4, statDown: 5},
    {english: 'Quiet', statUp: 4, statDown: 6},
    {english: 'Calm', statUp: 5, statDown: 2},
    {english: 'Gentle', statUp: 5, statDown: 3},
    {english: 'Careful', statUp: 5, statDown: 4},
    {english: 'Quirky', statUp: 5, statDown: 5},
    {english: 'Sassy', statUp: 5, statDown: 6},
    {english: 'Timid', statUp: 6, statDown: 2},
    {english: 'Hasty', statUp: 6, statDown: 3},
    {english: 'Jolly', statUp: 6, statDown: 4},
    {english: 'Naive', statUp: 6, statDown: 5},
    {english: 'Serious', statUp: 6, statDown: 6},
]

const BATTLE_TEXTS =
{
    doSth: {english: 'choose what to do...', polski: 'wybierz co zrobić...'},
    use: {english: 'use ', polski: 'użyj '},
    type: {english: ', type: ', polski: ', typ: '},
    power: {english: ', power: ', polski: ', moc: '},
    acc: {english: ', accuracy: ', polski: ', celność: '},
    run: {english: 'run from battle with wild pokemon', polski: 'ucieknij z walki z dzikim pokemonem'},
    oppmove: {english: 'waiting for opponent decision...', polski: 'czekanie na decyzję przeciwnika...'},
    inBattle: {english: 'this pokemon is in the battle', polski: 'ten pokemon jest w trakcie walki'},
    switch: {english: 'switch pokemon to ', polski: 'zmień pokemona na '},
    level: {english: ', level: ', polski: ', poziom: '},
    moves: {english: ', moves: ', polski: ', ruchy: ',},
}