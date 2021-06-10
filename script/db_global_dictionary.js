const POKEMON_TYPES =
[
    {english: '-', polski: '-'},
    {english: 'normal', polski: 'normalny'},
    {english: 'fire', polski: 'ognisty'},
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
    {english: '-', polski: '-'},
    {english: 'hp', polski: 'życie'},
    {english: 'attack', polski: 'atak'},
    {english: 'defence', polski: 'obrona'},
    {english: 'spAttack', polski: 'sp. atak'},
    {english: 'spDefence', polski: 'sp. obrona'},
    {english: 'speed', polski: 'szybkość'},
];

const POKEMON_ABILITIES = 
[
    {english: '-', polski: '-'},
    {english: 'run away', polski: 'ucieczka'},
    {english: 'adaptability', polski: ''},
    {english: 'anticipation', polski: ''},
    {english: 'flash fire', polski: ''},
    {english: 'guts', polski: ''},
    {english: 'volt absorb', polski: ''},
    {english: 'quick feet', polski: ''},
    {english: 'water absorb', polski: ''},
    {english: 'hydration', polski: ''},
    {english: 'leaf guard', polski: ''},
    {english: 'chlorophyll', polski: ''},
    {english: 'snow cloak', polski: ''},
    {english: 'ice body', polski: ''},
    {english: 'synchronize', polski: ''},
    {english: 'magic bounce', polski: ''},
    {english: 'inner focus', polski: ''},
    {english: 'cute charm', polski: ''},
    {english: 'pixilate', polski: ''},
    {english: 'simple', polski: ''},
    {english: 'unaware', polski: ''},
    {english: 'moody', polski: ''},
    {english: 'keen eye', polski: ''},
    {english: 'sheer force', polski: ''},
    {english: 'hustle', polski: ''},
    {english: 'defiant', polski: ''},
    {english: 'drought', polski: ''},
    {english: 'swift swim', polski: ''},
    {english: 'water veil', polski: ''},
    {english: 'dry skin', polski: ''},
    {english: 'sand veil', polski: ''},
    {english: 'solar power', polski: ''},
    {english: 'big pecks', polski: ''},
    {english: 'gale wings', polski: ''},
    {english: 'flame body', polski: ''},
    {english: 'rivalry', polski: ''},
    {english: 'intimidate', polski: ''},
    {english: 'hyper cutter', polski: ''},
    {english: 'mold breaker', polski: ''},
    {english: 'moxie', polski: ''},
    {english: 'steadfast', polski: ''},
    {english: 'prankster', polski: ''},
    {english: 'justtified', polski: ''},
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
    {english: 'field', polski: ''},
    {english: 'flying', polski: ''},
    {english: 'dragon', polski: ''},
    {english: 'monster', polski: ''},
    {english: 'undiscovered', polski: ''},
]

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

const RESISTANCE =
{
    normal: new Resistance(1,1,1,1,1,1,2,1,1,1,1,1,1,0,1,1,1,1),
    fire: new Resistance(1,0.5,2,1,0.5,0.5,1,1,2,1,1,0.5,2,1,1,1,0.5,0.5),
    water: new Resistance(1,0.5,0.5,2,2,0.5,1,1,1,1,1,1,1,1,1,1,0.5,1),
    electric: new Resistance(1,1,1,0.5,1,1,1,1,2,0.5,1,1,1,1,1,1,0.5,1),
    grass: new Resistance(1,2,0.5,0.5,0.5,2,1,2,0.5,2,1,2,1,1,1,1,1,1),
    ice: new Resistance(1,2,1,1,1,0.5,2,1,1,1,1,1,2,1,1,1,2,1),
    fighting: new Resistance(1,1,1,1,1,1,1,1,1,2,2,0.5,0.5,1,1,0.5,1,2),
    poison: new Resistance(1,1,1,1,0.5,1,0.5,0.5,2,1,2,0.5,1,1,1,1,1,0.5),
    ground: new Resistance(1,1,2,0,2,2,1,0.5,1,1,1,1,0.5,1,1,1,1,1),
    flying: new Resistance(1,1,1,2,0.5,2,0.5,1,0,1,1,0.5,2,1,1,1,1,1),
    psychic: new Resistance(1,1,1,1,1,1,0.5,1,1,1,0.5,2,1,2,1,2,1,1),
    bug: new Resistance(1,2,1,1,0.5,1,0.5,1,0.5,2,1,1,2,1,1,1,1,1),
    rock: new Resistance(0.5,0.5,2,1,2,1,2,0.5,2,0.5,1,1,1,1,1,1,2,1),
    ghost: new Resistance(0,1,1,1,1,1,0,0.5,1,1,1,0.5,1,2,1,2,1,1),
    dragon: new Resistance(1,0.5,0.5,0.5,0.5,2,1,1,1,1,1,1,1,1,2,1,1,2),
    dark: new Resistance(1,1,1,1,1,1,2,1,1,1,0,2,1,0.5,1,0.5,1,2),
    steel: new Resistance(0.5,2,1,1,0.5,0.5,2,0,2,0.5,0.5,0.5,0.5,1,0.5,1,0.5,0.5),
    fairy: new Resistance(1,1,1,1,1,1,0.5,2,1,1,1,0.5,1,1,0,0.5,2,1)
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
{
    lv: new NumberArray(2,100),
    stone: ['water', 'fire', 'thunder', 'sun', 'moon', 'leaf', 'ice', 'dusk', 'dawn', 'shiny'],
    place: ['mossy rock', 'icy rock', 'electric field'],
    friendship: ['', 'dayime', 'nighttime'],
    love: ['fairy move'],
    trade: [''],
};

const POKEMON_MOVES = 
{
    struggle: new PokemonMove(40,100,'','physical',[new Effect('dmgBack',100,40)]),
    surf: new PokemonMove(90,100,'water','special',[new Effect('hit_dive',100,2)],15,'everyone'),
    energy_ball: new PokemonMove(90,100,'grass','special',[new Effect('low_target_spDefence',10,1)],10),
    flamethrower: new PokemonMove(90,100,'fire','special',[new Effect('burn_target',10)],15),
    tackle: new PokemonMove(40,100,'normal','physical',[],35),
    ember: new PokemonMove(40,100,'fire','special',[new Effect('burn_target',10)],25),
};

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