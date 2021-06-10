const ADMIN_WARNINGS =
[
    {polski: 'używaj tylko języka <u>angielskiego</u> oraz małych liter', english: 'use only <u>english</u> language and small letters'},
    {polski: 'kliknij w pole mapy aby zmienić je na wybrany wyżej element<br>użyj CTRL by móc zmienić pole najechaniem myszy<br>CTRL+Z nie działa', english: 'click on field to change element to selectet upper<br>use CTRL to change it with mouse over<br>CTRL+Z does not work'},
    {polski: 'zdecydowanie łatwiej jest używać panelu administratora na komputerze', english: 'it is so much better to use admin panel on the computer'},
];

const ADMIN_LIST_OF_TASKS =
[
    {polski: 'pokemony', english: 'pokemon', disabled: false},
    {polski: 'mapy', english: 'maps', disabled: true}, 
    {polski: 'ruchy', english: 'moves', disabled: false},
];

const ADMIN_DATABASE_COLS = 
{
    moves:
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
    ],

    pokemon:
    [
        {description: {polski: 'nr', english: 'no'}, dbname: 'id'},
        {description: {polski: 'nr dex', english: 'dex no'}, dbname: 'no', input: 'number', min: 0, max: 500},
        {description: {polski: 'nazwa', english: 'name'}, dbname: 'name', input: 'text'},
        {description: {polski: 'typy', english: 'types'}, dbname: 'types', input: 'selects', numOfInput: 2, table: POKEMON_TYPES},
        {description: {polski: 'umiejętności', english: 'abilities'}, dbname: 'abilities', input: 'selects', numOfInput: 3, table: POKEMON_ABILITIES},
        {description: {polski: 'EVYeld', english: 'EVYeld'}, dbname: 'EVYeld', input: 'selects', numOfInput: 3, table: POKEMON_STATS},
        {description: {polski: 'szanse złapania', english: 'catch rate'}, dbname: 'catchRate', input: 'number', min: 1, max: 255},
        {description: {polski: 'bazowe doświadczenie', english: 'base expirience'}, dbname: 'baseExp', input: 'number', min: 1, max: 300},
        {description: {polski: 'wzrost doświadczenia', english: 'expirience growth'}, dbname: 'growthExp', input: 'select', table: POKEMON_EXP_GROWTH},
        {description: {polski: 'szanse na samiczkę', english: 'female rate'}, dbname: 'femaleRate', input: 'number', min: 0, max: 100},
        {description: {polski: 'grupa jajek', english: 'egg group'}, dbname: 'eggGroup', input: 'select', table: POKEMON_EGG_GROUP},
        {description: {polski: 'cykle do wyklucia', english: 'egg cycles'}, dbname: 'eggCycles', input: 'number', min: 1, max: 100},
        {description: {polski: 'bazowe życie', english: 'base HP'}, dbname: 'baseStats_hp', input: 'number', min: 1, max: 500},
        {description: {polski: 'bazowy atak', english: 'base attack'}, dbname: 'baseStats_attack', input: 'number', min: 1, max: 500},
        {description: {polski: 'bazowa obrona', english: 'base defence'}, dbname: 'baseStats_defence', input: 'number', min: 1, max: 500},
        {description: {polski: 'bazowy sp. atak', english: 'base sp. attack'}, dbname: 'baseStats_spAttack', input: 'number', min: 1, max: 500},
        {description: {polski: 'bazowa sp. obrona', english: 'base sp. deffence'}, dbname: 'baseStats_spDefence', input: 'number', min: 1, max: 500},
        {description: {polski: 'bazowa szybkość', english: 'base speed'}, dbname: 'baseStats_speed', input: 'number', min: 1, max: 500},
        {description: {polski: 'gatunek preewolucji', english: 'preevolution specie'}, dbname: 'preevolution_specie', input: 'text', notImportant: true},
        {description: {polski: 'metoda ewolucji', english: 'preevolution method'}, dbname: 'preevolution_method', input: 'text', notImportant: true}, //'select', table: []},
        {description: {polski: 'wartość metody ewolucji', english: 'preevolution value '}, dbname: 'preevolution_value', input: 'text', notImportant: true}, //'select', table: []},
        {description: {polski: 'wysokość', english: 'height'}, dbname: 'height', input: 'number', min: 0.1, max: 500},
        {description: {polski: 'waga', english: 'weight'}, dbname: 'weight', input: 'number', min: 0.1, max: 500},
    ],
};

const ADMIN_EFFECTS_COLS =
[
    {polski: 'jaki', english: 'what'},
    {polski: 'wartość', english: 'value'},
    {polski: 'szanse', english: 'chance'},
    {polski: 'komu', english: 'whom'}
];

const ADMIN_EDIT_TEXTS = 
{
    save: {polski: 'zapisz', english: 'save'},
    cancel: {polski: 'anuluj', english: 'cancel'},
    
};

const ADMIN_POKEMON_DETAILS = 
{
    name: new AdminPokemonDetails(true,false,false,false,false,{polski: 'nie używaj spacji, nie może się powtarzać', english: 'do not use space, it can not repeat'},{polski: 'nazwa pokemona', english: 'name of pokemon'},'alolan_ninetales'),
    types: new AdminPokemonDetails(true,true,false,false,false,{polski: 'w przypadku dwu wypisz po przecinku bez spacji', english: 'in the case of two write out after "," without space'},{polski: 'typy', english: 'types'},'ice,fairy'),
    abilities: new AdminPokemonDetails(true,true,false,false,false,{polski: 'w przypadku dwu lub trzech (trzecia to zawsze ukryta) wypisz po przecinku bez spacji, jeśli ma być jedna umiejętność + ukryta wypisz drugą jako pustą', english: 'in the case of two or three (third is always hidden) write out after "," without space, in the case if there is only one ability plus hidden write second as empty'},{polski: 'umiejętności', english: 'abilities'},'snow cloak,,snow warning'),
    EVYeld: new AdminPokemonDetails(true,true,false,false,false,{polski: '1 atak = attack, 2 atak = attack,attack (hp,attack,defence,spAttack,spDeffence,speed)', english: '1 attack = attack, 2 attack = attack,attack (hp,attack,defence,spAttack,spDeffence,speed)'},{polski: 'EV Yeld', english: 'EV Yeld'},'speed,speed'),
    catchRate: new AdminPokemonDetails(true,false,true,1,255,{polski: '1-255, 255-pewne złapanie', english: '1-255, 255-sure catch'},{polski: 'szanse złapania', english: 'catch rate'},75),
    baseExp: new AdminPokemonDetails(true,false,true,1,false,{polski: '',  english: ''},{polski: 'bazowe doświadczenie', english: 'base expirience'},177),
    growthExp: new AdminPokemonDetails(true,false,false,false,false,{polski: 'erratic,fast,medium fast,medium slow,slow,fluctuating', english: 'erratic,fast,medium fast,medium slow,slow,fluctuating'},{polski: 'wzrost doświadczenia', english: 'growth of expirience'},'medium fast'),
    femaleRate: new AdminPokemonDetails(true,false,true,0,100,{polski: 'sama liczba 0-100, zamiast przecinka użyj kropki', english: 'only number 0-100, use dot insted of comma'},{polski: 'szanse na samiczkę', english: 'female rate'},75),
    eggGroup: new AdminPokemonDetails(false,false,false,false,false,{polski: '', english: ''},{polski: 'grupa jajek', english: 'egg group'},'field'),
    eggCycles: new AdminPokemonDetails(false,false,true,false,false,{polski: '', english: ''},{polski: 'cykle do wyklucia', english: 'egg cycles'},20),
    baseStats_hp: new AdminPokemonDetails(true,false,true,1,false,{polski: '', english: ''},{polski: 'bazowe życie', english: 'base hit points'},75),
    baseStats_attack: new AdminPokemonDetails(true,false,true,1,false,{polski: '', english: ''},{polski: 'bazowy atak', english: 'base attack'},80),
    baseStats_defence: new AdminPokemonDetails(true,false,true,1,false,{polski: '', english: ''},{polski: 'bazowa obrona', english: 'base defence'},85),
    baseStats_spAttack: new AdminPokemonDetails(true,false,true,1,false,{polski: '', english: ''},{polski: 'bazowy specjalny atak', english: 'base special attack'},90),
    baseStats_spDefence: new AdminPokemonDetails(true,false,true,1,false,{polski: '', english: ''},{polski: 'bazowa specjalna obrona', english: 'base special defence'},95),
    baseStats_speed: new AdminPokemonDetails(true,false,true,1,false,{polski: '', english: ''},{polski: 'bazowa szybkość', english: 'base speed'},100),
    preevolution_specie: new AdminPokemonDetails(false,false,false,false,false,{polski: '',  english: ''},{polski: 'gatunek preewolucji', english: 'preevolution specie'},'alolan_vulpix'),
    preevolution_method: new AdminPokemonDetails(false,false,false,false,false,{polski: 'przykłady: stone, mega stone, level, friendship, place, love, move, trade...', english: 'examples: stone, mega stone, level, friendship, place, love, move, trade...'},{polski: 'metoda ewolucji preewolucji', english: 'evolution method of preevolution'},'stone'),
    preevolution_value: new AdminPokemonDetails(false,false,false,false,false,{polski: 'przykłady: fire stone, lucarionite, 52, night, icy rock, fairy move, metal coath..', english: 'examples: fire stone, lucarionite, 52, night, icy rock, fairy move, metal coath...'},{polski: 'podtyp lub wartość metody', english: 'subtype or value od method'},'ice stone'),
    height:  new AdminPokemonDetails(true,false,true,0.1,false,{polski: 'zamiast przecinka użyj kropki', english: 'use dot insted of comma'},{polski: 'wysokość', english: 'height'},1.1),
    weight:  new AdminPokemonDetails(true,false,true,0.1,false,{polski: 'zamiast przecinka użyj kropki', english: 'use dot insted of comma'},{polski: 'waga', english: 'weight'},19.9),
};

const ADMIN_POKEMON_TEXTS = 
{
    createButton: {polski: 'twórz kod', english: 'create code'},
    choosePKMN: {polski: 'wybierz pokemona', english: 'choose pokemon'},
    error: {polski: 'BŁĘDY:', english: 'ERRORS:'},
    errors: 
    [
        {polski: ' nic nie zawiera', english: ' is empty'}, // 0
        {polski: ' nie jest liczbą', english: ' is not a number'}, // 1
        {polski: ' ma zbyt małą wartość', english: ' is too low'}, // 2
        {polski: ' ma zbyt dużą wartość', english: ' is too high'}, // 3
        {polski: ' już istnieje', english: ' is already exists'}, // 4
        {polski: ' zawiera błędną wartość', english: ' includes wrong value'}, //5
        {polski: '. efekt został pominięty, gdyż warość szansy jest pusta', english: '. effect was skipped, because chance value is empty'}, // 6
        {polski: '. efekt został pominięty, gdyż warość szansy jest zbyt mała', english: '. effect was skipped, because chance value is too low'}, // 7
        {polski: '. efekt został pominięty, gdyż warość szansy jest zbyt duża', english: '. effect was skipped, because chance value is too high'}, // 8
        {polski: '. efekt został pominięty, gdyż warość szansy nie jest liczbą', english: '. effect was skipped, because chance value is not a number'}, // 9
    ],
    success: {polski: 'sukces', english: 'success'},
    code: {polski: 'kod', english: 'code'},

};

const ADMIN_MAPS_DESCRIPTIONS =
{
    no: {polski: 'mapa nr', english: 'map no.'},
    imgTitle: {polski: 'obiekt nr: ', english: 'object no: '},
};