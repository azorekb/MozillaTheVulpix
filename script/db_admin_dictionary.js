const ADMIN_WARNINGS =
[
    {polski: 'używaj tylko języka <u>angielskiego</u> oraz małych liter', english: 'use only <u>english</u> language and small letters'},
    {polski: 'kliknij w pole mapy aby zmienić je na wybrany wyżej element<br>użyj CTRL by móc zmienić pole najechaniem myszy<br>CTRL+Z nie działa', english: 'click on field to change element to selectet upper<br>use CTRL to change it with mouse over<br>CTRL+Z does not work'},
    {polski: 'zdecydowanie łatwiej jest używać panelu administratora na komputerze', english: 'it is so much better to use admin panel on the computer'},
];

const ADMIN_LIST_OF_TASKS =
[
    {polski: 'pokemony', english: 'pokemon', disabled: false},
    {polski: 'mapy', english: 'maps', disabled: false}, 
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
        {description: {english: 'EVYeld'}, dbname: 'EVYeld', input: 'selects', numOfInput: 3, table: POKEMON_STATS},
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

    maps:
    [
        {description: {polski: 'nr', english: 'no'}, dbname: 'id'},
        {description: {polski: 'nazwa polska', english: 'polish name'}, dbname: 'name_pl', input: 'text'},
        {description: {polski: 'nazwa angielska', english: 'english name'}, dbname: 'name_eng', input: 'text'},
        {description: {polski: 'kod mapy', english: 'map code'}, dbname: 'cells', input: 'disabled', hidden: true}
    ]
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
    object: {polski: 'obiekty', english: 'objects'},
    bg: {polski: 'tła', english: 'backgrounds'},
    edit: {polski: 'wybierz co edytować:', english: 'choose what to edit:'},
    both: {polski: 'tła i obiekty', english: 'backgrounds and objects'}
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
    bgTitle: {polski: 'tło nr: ', english: 'background no: '}
};