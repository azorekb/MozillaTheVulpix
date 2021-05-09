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
    no: ['nr','no.'],
    types: ['typy','types'],
    ability: ['umiejętności','abilities'],
    baseStats: ['bazowe statystyki','base stats'],
    hp: ['życie','hit points'],
    attack: ['atak','attack'],
    defence: ['obrona','defence'],
    spAttack: ['sp. atak','sp. attack'],
    spDefence: ['sp. obrona','sp. defence'],
    speed: ['szybkość','speed'],
}
    
const ADMIN_POKEMON_DETAILS = 
{
    name: new AdminPokemonDetails(true,false,false,false,false,['nie używaj spacji','do not use space'],['nazwa pokemona','name of pokemon'],'alolan_ninetales'),
    types: new AdminPokemonDetails(true,true,false,false,false,['w przypadku dwu wypisz po przecinku bez spacji','in the case of two write out after "," without space'],['typy','types'],'ice,fairy'),
    abilities: new AdminPokemonDetails(true,true,false,false,false,['w przypadku dwu lub trzech (trzecia to zawsze ukryta) wypisz po przecinku bez spacji, jeśli ma być jedna umiejętność + ukryta wypisz drugą jako pustą','in the case of two or three (third is always hidden) write out after "," without space, in the case if there is only one ability plus hidden write second as empty'],['umiejętności','abilities'],'snow cloak,,snow warning'),
    EVYeld: new AdminPokemonDetails(true,true,false,false,false,['1 atak = attack, 2 atak = attack,attack (hp,attack,defence,spAttack,spDeffence,speed)','1 attack = attack, 2 attack = attack,attack (hp,attack,defence,spAttack,spDeffence,speed)'],['EV Yeld','EV Yeld'],'speed,speed'),
    catchRate: new AdminPokemonDetails(true,false,true,1,255,['1-255, 255-pewne złapanie','1-255, 255-sure catch'],['szanse złapania','catch rate'],75),
    baseExp: new AdminPokemonDetails(true,false,true,1,false,['',''],['bazowe doświadczenie','base expirience'],177),
    growthExp: new AdminPokemonDetails(true,false,false,false,false,['erratic,fast,medium fast,medium slow,slow,fluctuating','erratic,fast,medium fast,medium slow,slow,fluctuating'],['wzrost doświadczenia','growth of expirience'],'medium fast'),
    femaleRate: new AdminPokemonDetails(true,false,true,0,100,['sama liczba 0-100, zamiast przecinka użyj kropki','only number 0-100, use dot insted of comma'],['szanse na samiczkę','female rate'],75),
    eggGroup: new AdminPokemonDetails(false,false,false,false,false,['',''],['grupa jajek','egg group'],'field'),
    eggCycles: new AdminPokemonDetails(false,false,true,false,false,['',''],['cykle do wyklucia','egg cycles'],20),
    baseHP: new AdminPokemonDetails(true,false,true,1,false,['',''],['bazowe życie','base hit points'],75),
    baseAttack: new AdminPokemonDetails(true,false,true,1,false,['',''],['bazowy atak','base attack'],80),
    baseDefence: new AdminPokemonDetails(true,false,true,1,false,['',''],['bazowa obrona','base defence'],85),
    baseSpAttack: new AdminPokemonDetails(true,false,true,1,false,['',''],['bazowy specjalny atak','base special attack'],90),
    baseSpDefence: new AdminPokemonDetails(true,false,true,1,false,['',''],['bazowa specjalna obrona','base special defence'],95),
    baseSpeed: new AdminPokemonDetails(true,false,true,1,false,['',''],['bazowa szybkość','base speed'],100),
    preevolutionSpecie: new AdminPokemonDetails(false,false,false,false,false,['',''],['gatunek preewolucji','preevolution specie'],'alolan_vulpix'),
    preevolutionMethod: new AdminPokemonDetails(false,false,false,false,false,['przykłady: stone, mega stone, level, friendship, place, love, move, trade...','examples: stone, mega stone, level, friendship, place, love, move, trade...'],['metoda ewolucji preewolucji','evolution method of preevolution'],'stone'),
    preevolutionMethodValue: new AdminPokemonDetails(false,false,false,false,false,['przykłady: fire stone, lucarionite, 52, night, icy rock, fairy move, metal coath..','examples: fire stone, lucarionite, 52, night, icy rock, fairy move, metal coath...'],['podtyp lub wartość metody','subtype or value od method'],'ice stone'),
    height:  new AdminPokemonDetails(true,false,true,0.1,false,['zamiast przecinka użyj kropki','use dot insted of comma'],['wysokość','height'],1.1),
    weight:  new AdminPokemonDetails(true,false,true,0.1,false,['zamiast przecinka użyj kropki','use dot insted of comma'],['waga','weight'],19.9),
}

const ADMIN_MAPS_DESCRIPTIONS =
{
    no: ['mapa nr','map no.'],
    imgTitle: ['obiekt nr: ', 'object no: '],
}