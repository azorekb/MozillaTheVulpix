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
}
    
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
}
    
const ADMIN_POKEMON_DETAILS = 
{
    name: new AdminPokemonDetails(true,false,false,false,false,{polski: 'nie używaj spacji, nie może się powtarzać', english: 'do not use space, it can not repeat'},{polski: 'nazwa pokemona', english: 'name of pokemon'},'alolan_ninetales'),
    no: new AdminPokemonDetails(false,false,true,0,false,{polski: '0 - nie wyświetla się w pokedexie, nie może się powtarzać', english: '0 - does not show up in pokedex, it can not repeat'},{polski: 'ID', english: 'ID'},0),
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
}

const ADMIN_POKEMON_TEXTS = 
{
    createButton: {polski: 'twórz kod', english: 'create code'},
    choosePKMN: {polski: 'wybierz pokemona', english: 'choose pokemon'},
    error: {polski: 'BŁĘDY:', english: 'ERRORS:'},
    errors: 
    [
        {polski: ' nic nie zawiera', english: ' is empty'},
        {polski: ' nie jest liczbą', english: ' is not a number'},
        {polski: ' ma zbyt małą wartość', english: ' is too low'},
        {polski: ' ma zbyt dużą wartość', english: ' is too high'},
        {polski: ' już istnieje', english: ' is already exists'},
        {polski: ' zawiera błędną wartość', english: ' includes wrong value'},
    ],
    success: {polski: 'sukces', english: 'success'},
    code: {polski: 'kod', english: 'code'},

}

const ADMIN_MAPS_DESCRIPTIONS =
{
    no: {polski: 'mapa nr', english: 'map no.'},
    imgTitle: {polski: 'obiekt nr: ', english: 'object no: '},
}

const POKEMON_EVOLUTION_METHODS =
{
    lv: new NumberArray(2,100),
    stone: ['water', 'fire', 'thunder', 'sun', 'moon', 'leaf', 'ice', 'dusk', 'dawn', 'shiny'],
    place: ['mossy rock', 'icy rock', 'electric field'],
    friendship: ['', 'dayime', 'nighttime'],
    love: ['fairy move'],
    trade: [''],
}

const POKEMON_MOVES = 
{
    struggle: new PokemonMove(40,100,'','physical',[new Effect('dmgBack',100,40)]),
    surf: new PokemonMove(90,100,'water','special',[new Effect('hit_dive',100,2)],15,'everyone'),
    energy_ball: new PokemonMove(90,100,'grass','special',[new Effect('low_target_spDefence',10,1)],10),
    flamethrower: new PokemonMove(90,100,'fire','special',[new Effect('burn_target',10)],15),
    tackle: new PokemonMove(40,100,'normal','physical',[],35),
    ember: new PokemonMove(40,100,'fire','special',[new Effect('burn_target',10)],25),
}

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
}

const MAIN_ERRORS = 
{
    noUserName: {polski: 'nazwa użytkownika jest pusta', english: 'user name is empty'},
    shortUserName: {polski: 'nazwa użytkownika jest zbyt krótka (min 4 liter)', english: 'user name is too short (min 4 letters)'},
    wrongUserName: {polski: 'podana nazwa użytkownika nie istnieje', english: 'given user name doesn\'t exist'},
    noPassword: {polski: 'hasło jest puste', english: 'password is empty'},
    shortPassword: {polski: 'hasło jest zbyt krótkie (min 4 liter)', english: 'hasło is too short (min 4 letters)'},
    wrongPassword: {polski: 'podane hasło jest nieprawidłowe', english: 'given password is incorrect'},
}

const ADMIN_MOVE_TEXTS = 
{
    save: {polski: 'zapisz', english: 'save'},
    cancel: {polski: 'anuluj', english: 'cancel'},

}