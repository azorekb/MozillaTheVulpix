const POKEMON_TYPES =
[
    {english: '-', resistance: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]},
    {english: 'normal', polski: 'normalny', resistance: [1,1,1,1,1,1,1,2,1,1,1,1,1,1,0,1,1,1,1]},
    {english: 'fire', polski: 'ognisty', resistance: [1,1,0.5,2,1,0.5,0.5,1,1,2,1,1,0.5,2,1,1,1,0.5,0.5]},
    {english: 'water', polski: 'wodny', resistance: [1,1,0.5,0.5,2,2,0.5,1,1,1,1,1,1,1,1,1,1,0.5,1]},
    {english: 'electric', polski: 'elekrtyczny', resistance: [1,1,1,1,0.5,1,1,1,1,2,0.5,1,1,1,1,1,1,0.5,1]},
    {english: 'grass', polski: 'trawiasty', resistance: [1,1,2,0.5,0.5,0.5,2,1,2,0.5,2,1,2,1,1,1,1,1,1]},
    {english: 'ice', polski: 'lodowy', resistance: [1,1,2,1,1,1,0.5,2,1,1,1,1,1,2,1,1,1,2,1]},
    {english: 'fighting', polski: 'walczący', resistance: [1,1,1,1,1,1,1,1,1,1,2,2,0.5,0.5,1,1,0.5,1,2]},
    {english: 'poison', polski: 'trujący', resistance: [1,1,1,1,1,0.5,1,0.5,0.5,2,1,2,0.5,1,1,1,1,1,0.5]},
    {english: 'ground', polski: 'ziemny', resistance: [1,1,1,2,0,2,2,1,0.5,1,1,1,1,0.5,1,1,1,1,1]},
    {english: 'flying', polski: 'latający', resistance: [1,1,1,1,2,0.5,2,0.5,1,0,1,1,0.5,2,1,1,1,1,1]},
    {english: 'psychic', polski: 'psychiczny', resistance: [1,1,1,1,1,1,1,0.5,1,1,1,0.5,2,1,2,1,2,1,1]},
    {english: 'bug', polski: 'robaczy', resistance: [1,1,2,1,1,0.5,1,0.5,1,0.5,2,1,1,2,1,1,1,1,1]},
    {english: 'rock', polski: 'kamienny', resistance: [1,0.5,0.5,2,1,2,1,2,0.5,2,0.5,1,1,1,1,1,1,2,1]},
    {english: 'ghost', polski: 'duchowy', resistance: [1,0,1,1,1,1,1,0,0.5,1,1,1,0.5,1,2,1,2,1,1]},
    {english: 'dragon', polski: 'smoczy', resistance: [1,1,0.5,0.5,0.5,0.5,2,1,1,1,1,1,1,1,1,2,1,1,2]},
    {english: 'dark', polski: 'mroczny', resistance: [1,1,1,1,1,1,1,2,1,1,1,0,2,1,0.5,1,0.5,1,2]},
    {english: 'steel', polski: 'stalowy', resistance: [1,0.5,2,1,1,0.5,0.5,2,0,2,0.5,0.5,0.5,0.5,1,0.5,1,0.5,0.5]},
    {english: 'fairy', polski: 'wróżkowy', resistance: [1,1,1,1,1,1,1,0.5,2,1,1,1,0.5,1,1,0,0.5,2,1]},
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
    {english: 'adaptability', polski: 'adaptacja', done: true},
    {english: 'pickup'},
    {english: 'flash fire'},
    {english: 'guts'},
    {english: 'volt absorb'},
    {english: 'quick feet'},
    {english: 'water absorb'},
    {english: 'hydration'},
    {english: 'Royal Feather'},
    {english: 'chlorophyll'},
    {english: 'snow cloak'},
    {english: 'Slush Rush'},
    {english: 'synchronize'},
    {english: 'magic bounce'},
    {english: 'inner focus'},
    {english: 'cute charm'},
    {english: 'pixilate'},
    {english: 'simple'},
    {english: 'unaware'},
    {english: 'Technician'},
    {english: 'keen eye'},
    {english: 'sheer force'},
    {english: 'hustle'},
    {english: 'defiant'},
    {english: 'drought'},
    {english: 'swift swim'},
    {english: 'Snow Warning'},
    {english: 'dry skin'},
    {english: 'new 1', new: true},
    {english: 'solar power'},
    {english: 'big pecks'},
    {english: 'gale wings'},
    {english: 'flame body'},
    {english: 'new 2', new: true},
    {english: 'intimidate'},
    {english: 'new 3', new: true},
    {english: 'mold breaker'},
    {english: 'moxie'},
    {english: 'new 4', new: true},
    {english: 'prankster'},
    {english: 'new 5', new: true},
    {english: 'regenerator'},
    {english: 'reckless'},
    {english: 'new 6', new: true},
    {english: 'poison point'},
    {english: 'poison touch'},
    {english: 'static'},
    {english: 'lightning rod'},
    {english: 'new 7', new: true},
    {english: 'tinted lens'},
    {english: 'shield dust'},
    {english: 'new 8', new: true},
    {english: 'rock head'},
    {english: 'new 9', new: true},
    {english: 'aerilate'},
    {english: 'new 10', new: true},
    {english: 'new 11', new: true},
    {english: 'own tempo'},
    {english: 'stamina'},
    {english: 'new 12', new: true},
    {english: 'thick fat'},
    {english: 'scrappy'},
    {english: 'new 13', new: true},
    {english: 'new 14', new: true},
    {english: 'storm drain'},
    {english: 'magic drain'},
    {english: 'refigerate'},
    {english: 'zephyr boost'},
    {english: 'huge power'},
    {english: 'new 15', new: true},
    {english: 'new 16', new: true},
    {english: 'new 17', new: true},
    {english: 'new 18', new: true},
    {english: 'new 19', new: true},
    {english: 'new 20', new: true},
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
            {polski: 'zdrowy', english: 'ok', done: true},
            {polski: 'poparzenia', english: 'burn', done: true},
            {polski: 'zamrożenie', english: 'freeze', done: true},
            {polski: 'paraliż', english: 'paralysis', done: true},
            {polski: 'zatrucie', english: 'poison', done: true},
            {polski: 'sen', english: 'sleep', done: true},
            {english: 'flinch', polski: 'stchórzenie', done: true},
            {english: 'confuse',polski: 'zmieszanie'},
            {english: 'inlove', polski: 'zauroczenie'},
        ],
        done: true
    },
    {english: 'recoil damage', polski: 'obrażenia zwrotne', done: true},
    {english: 'recover HP', polski: 'leczenie HP', done: true},
    {english: 'drain HP', polski: 'kradzież HP', done: true},
    {english: 'change attack', polski: 'zmiana ataku', done: true},
    {english: 'change defence', polski: 'zmiana obrony', done: true},
    {english: 'change spAttack', polski: 'zmiana sp ataku', done: true},
    {english: 'change spDefence', polski: 'zmiana sp obrony', done: true},
    {english: 'change speed', polski: 'zmiana szybkości', done: true},
    {english: 'change random stat', polski: 'zmiena losowej cechy', done: true},
    {english: 'change every stat', polski: 'zmiena każdej cechy', done: true},
    {
        english: 'special event',
        polski: 'secjalne zdarzenie',
        types:
        [
            {english: 'switch place', polski: 'zmiana miesjca'},
            {english: 'unable to flee', polski: 'uniemożliwienie ucieczki'},
            {english: 'hit two times', polski: 'uderzenie dwukrotne', done: true},
            {english: 'hit 2-5 times', polski: 'uderzenie 2-5 krotne'},
            {english: 'ignores attack and deffence', polski: 'ignorowanie ataku i obrony', done: true},
            {english: 'return', polski: 'powrót', done: true},
            {english: 'boost power', polski: 'bonus do mocy'},
        ],
        done: true
    },
    {
        polski: 'zmiana pogody',
        english: 'change weather',
        types:
        [
            {english: 'none', polski: 'brak', done: true},
            {english: 'rain', polski: 'deszcz', done: true},
            {english: 'hail', polski: 'grad', done: true},
            {english: 'sunny', polski: 'słonecznie', done: true},
            {english: 'storm', polski: 'burza', done: true},
            {english: 'strong wind', polski: 'silny wiatr', done: true},
            {english: 'fog', polski: 'mgła', done: true},
            {english: 'sandstorm', polski: 'burza piaskowa', done: true}
        ],
        done: true
    },
    {
        polski: 'dwie tury', 
        english: 'two round',
        types:
        [
            {english: 'dig in hole', polski: 'pod ziemią', done: true},
            {english: 'fly high', polski: 'lot w górę', done: true},
            {english: 'under water', polski: 'pod wodą', done: true},
            {english: 'rest', polski: 'odpoczynek'},
            {english: 'sun light', polski: 'światło słońca'},
            {english: 'waiting', polski: 'czekanie'},
        ],
        done: true
    },
    {english: 'change cristal hit ratio', polski: 'zmiana szansy na obrażenia krytyczne', done: true},
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
            {english: 'unable to use status', polski: 'uniemożliwienie użycia ruchu statusowego'},
            {english: 'destruct all', polski: 'zniszczenie wszystkich'},
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
            {english: 'completely', polski: 'całkowita', done: true},
            {english: 'spiky', polski: 'kolczasta'},
            {english: 'destruct all', polski: 'zniszczenie wszystkich'},
        ],
        done: true
    },
    {
        english: 'change battlefield',
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
    },
    {
        english: 'supereffective against',
        types: POKEMON_TYPES.slice(1)
    },
    {
        english: 'sure hit when',
        polski: 'pewne trafienie gdy',
        types:
        [
            {english: 'rain', polski: 'deszcz'},
            {english: 'hail', polski: 'grad'},
            {english: 'sunny', polski: 'słonecznie'},
            {english: 'storm', polski: 'burza'},
            {english: 'strong wind', polski: 'silny wiatr'},
            {english: 'fog', polski: 'mgła'}
        ]
    },
    {
        english: 'use different stat to attack',
        polski: 'użyj innej statystyki do ataku',
        types:
        [
            {english: 'hp', polski: 'życie'},
            {english: 'attack', polski: 'atak'},
            {english: 'defence', polski: 'obrona'},
            {english: 'spAttack', polski: 'sp. atak'},
            {english: 'spDefence', polski: 'sp. obrona'},
            {english: 'speed', polski: 'szybkość'},
            {english: 'target\'s hp', polski: 'życie celu'},
            {english: 'target\'s attack', polski: 'atak celu'},
            {english: 'target\'s defence', polski: 'obrona celu'},
            {english: 'target\'s spAttack', polski: 'sp. atak celu'},
            {english: 'target\'s spDefence', polski: 'sp. obrona celu'},
            {english: 'target\'s speed', polski: 'szybkość celu'},
        ]
    },
    {english: 'doubles power when repeat up to', polski: 'podwaja moc gdy powtarza się aż do'},
    {
        english: 'can hit when',
        polski: 'może trafić, gdy',
        types:
        [
            {english: 'is digging in hole', polski: 'jest pod ziemią'},
            {english: 'is flying high', polski: 'leci w górę'},
            {english: 'is under water', polski: 'jest pod wodą'},
        ]
    },
    {
        english: 'halves power when',
        polski: 'połowa mocy gdy',
        types:
        [
            {english: 'rain', polski: 'deszcz'},
            {english: 'hail', polski: 'grad'},
            {english: 'sunny', polski: 'słonecznie'},
            {english: 'storm', polski: 'burza'},
            {english: 'strong wind', polski: 'silny wiatr'},
            {english: 'fog', polski: 'mgła'}
        ]
    },

    
    // {english: 'recover by turs', polski: 'leczenie co turę'},
    // {english: 'gives protity', polski: 'daje priorytet'},
    // {english: 'change physical damage', polski: 'zmienia obrażenia fizyczne'},
    // {english: 'change damage when first', polski: 'zmienia obrażenia gdy pierwszy'},
    // {english: 'change damage when last', polski: 'zmienia obrażenia gdy ostatni'},
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
        {name: 'floor 1', src: 'floor1.png', area: 'land'},
        {name: 'wayN-W', src: 'drogaN-W.png', area: 'land'},
        {name: 'wayN-E', src: 'drogaN-E.png', area: 'land'},
        {name: 'wayS-W', src: 'drogaS-W.png', area: 'land'},
        {name: 'wayS-E', src: 'drogaS-E.png', area: 'land'},
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
        {name: 'dach', src: 'dach1_upLeft.gif'},
        {name: 'dach', src: 'dach1_upCenter.gif'},
        {name: 'dach', src: 'dach1_upRight.gif'},
        {name: 'dach', src: 'dach1_downLeft.gif'},
        {name: 'dach', src: 'dach1_downCenter.png'},
        {name: 'dach', src: 'dach1_downRight.gif'},
        {name: 'dom', src: 'dom_1.gif'},
        {name: 'dom', src: 'dom_2.png'},
        {name: 'drzwi', src: 'drzwi1up.png'},
        {name: 'dom', src: 'dom_3.png'},
        {name: 'dom', src: 'dom_4.gif'},
        {name: 'dom', src: 'dom_5.gif'},
        {name: 'drzwi', src: 'drzwi1down.gif'},
        {name: 'dom', src: 'dom_6.gif'},
        {name: 'dom', src: 'dom_7.gif'},
        {name: 'dom', src: 'dom_8.gif'},
        {name: 'dom', src: 'dom_9.gif'},
        {name: 'tree', src: 'tree1.gif'},
        {name: 'tree', src: 'tree2.gif'},
        {name: 'tree', src: 'tree3.gif'},
        {name: 'tree', src: 'tree4.gif'},
        {name: 'tree', src: 'tree5.gif'},
        {name: 'tree', src: 'tree6.gif'},
        {name: 'tree', src: 'tree7.gif'},
        {name: 'tree', src: 'tree8.gif'},
        {name: 'tree', src: 'tree9.gif'},
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
    moves: {english: ', moves: ', polski: ', ruchy: '},
    runSuccess: {english: 'you got away safety', polski: 'udało sie bezpiecznie uciec'},
    comeBack: {english: ', come back!', polski: ', wracaj!'},
    go: {english: ', i choose you!', polski: ', wybieram cię!'},
    used: {english: ' used ', polski: ' używa ruchu o nazwie '},
    supereffect: {english: 'It\'s supereffective!', polski: 'To superefektywne!'},
    weakeffect: {english: 'It\'s not very effective...', polski: 'To niezbyt efektywne...'},
    noeffect: {english: 'It has no effect.', polski: 'To nie dało żadnego efektu.'},
    fainted: {english: ' fainted', polski: ' zemdlał(a)'},
    promote: {english: ' promoted to level ', polski: ' awansuje na poziom '},
    lose: {english: 'there is no pokemon left, you lost the battle', polski: 'żaden z pokemonów nie jest zdolny do walki, przegrwasz'},
    missed: {english: 'but it missed...', polski: 'lecz nie trafia...'},
    healed: {english: ' was cured from status problem', polski: ' leczy się z negatywnego statusu'},
    isHealthy: {english: ' is already healthy', polski: ' jest już zdrowy(a)'},
    burned: {english: ' was burned', polski: ' zostaje poparzony(a)'},
    freezed: {english: ' was freezed', polski: ' zostaje zamrożony(a)'},
    paralyzed: {english: ' was paralyzed', polski: ' zostaje sparaliżowany(a)'},
    poisoned: {english: ' was poisoned', polski: ' zostaje otruty(a)'},
    sleepy: {english: ' falles asleep', polski: ' zasypia'},
    burnCouses: {english: ' looses some HP because of burning', polski: ' traci trochę HP z powodu poparzeń'},
    poisonCouses: {english: ' looses some HP because of poison', polski: ' traci trochę HP z powodu zatrucia'},
    fail: {english: 'but it failed', polski: 'ale nie wyszło'},
    nothing: {english: 'nothing happend', polski: 'nic się nie wydarzyło'},
    bothFainted: {english: 'both pokemon fainted', polski: 'oba pokemony zemdlały'},
    fullyPar: {english: ' is fully paralysed', polski: ' nie może się ruszyć z powodu paraliżu'},
    flinch: {english: ' flinched', polski: ' nie może się ruszyć z powodu stchórzenia'},
    increse: {english: ' increase', polski: ' zwiększa się'},
    decrese: {english: ' decrease', polski: ' zmniejsza się'},
    reset: {english: ' changes has been reset', polski: ': reset zmian'},
    evertStat: {english: 'every stat', polski: 'każda statystyka'},
    freezeSolid: {english: ' i freezed solid', polski: ' nie może się ruszyć z powodu zamrożenia'},
    recovered: {english: ' recovers ', polski: ' leczy '},
    isSleeping: {english: ' is sleeping', polski: ' śpi'},
    wakingUp: {english: ' woke up', polski: ' budzi się'},
    chooseAlly: {english: 'choose pokemon', polski: 'wybierz pokemona'},
    protects: {english: ' is hidding behind shield', polski: ' chowa się za tarczą'},
    blocked: {english: ' blocked the move with shield', polski: ' blokuje ruch tarczą'},
    criticalHit: {english: ' critical hit!', polski: ' cios krytyczny!'},
    hide_dig_in_hole: {english: ' hides in the hole', polski: ' chowa się w wykopanej diurze'},
    hide_fly_high: {english: ' flies up', polski: ' leci w górę'},
    hide_under_water: {english: ' dive into water', polski: ' nurkuje w wodzie'},
    hailHit: {english: ' got damage from hail', polski: ' otrzymuje obrażenia od gradu'},
    sandstormHit: {english: ' got damage from sandstorm', polski: ' otrzymuje obrażenia od burzy biaskowej'},
    bindhit: {english: ' got damage from bind', polski: ' otrzymuje obrażenia zpowodowane uciskiem'},
    flamehit: {english: ' got damage from flame', polski: ' otrzymuje obrażenia zpowodowane płomieniami'},
    drained: {english: ' drained HP from ', polski: ' zabiera HP '},
    shieldUp_physical: {english: 'physical shield active', polski: 'fizyczna tarcza aktywna'},
    shieldUp_special: {english: 'special shield active', polski: 'specialna tarcza aktywna'},
    shieldBreak_physical: {english: 'physical shield destroyed', polski: 'fizyczna tarcza zniszczona'},
    shieldBreak_special: {english: 'special shield destroyed', polski: 'specialna tarcza zniszczona'},
}

const BATTLE_COPY_PROPERTIES = 
[
    {what: 'level', array: false},
    {what: 'expirience', array: false},
    {what: 'moves', array: true},
    {what: 'EV', array: true},
    {what: 'damage', array: false},
    {what: 'ppUsed', array: true},
    {what: 'status', array: false},
    {what: 'item', array: false}
];

const IMG_WAY = 
{
    start: 'img/',
    background: 'img/background/',
    objects: 'img/objects/',
    sprite: 'img/sprite/',
    info: 'img/info/'
}

let mapMenu_buttons =
[
    {polski: 'Przygoda', english: 'Adventure'},
	{polski: 'Pokedex', english: 'Pokedex'},
	{polski: 'Pokemony', english: 'Pokemon'},
	{polski: 'Przedmioty', english: 'Items'},
	{polski: 'Opcje', english: 'Options'},
    {english: 'Test'}
];