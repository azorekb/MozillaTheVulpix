class Resistance{
    normal; fire; water; electric; grass; ice; fighting; poison; ground; flying; psychic; bug; rock; ghost; dragon; dark; steel; fairy;
 
    constructor(normal, fire, water, electric, grass, ice, fighting, poison, ground, flying, psychic, bug, rock, ghost, dragon, dark, steel, fairy)
    {
        this.normal=normal;
        this.fire=fire;
        this.water=water;
        this.electric=electric;
        this.grass=grass;
        this.ice=ice;
        this.fighting=fighting;
        this.poison=poison
        this.ground=ground;
        this.flying=flying;
        this.psychic=psychic;
        this.bug=bug;
        this.rock=rock;
        this.ghost=ghost;
        this.dragon=dragon;
        this.dark=dark;
        this.steel=steel;
        this.fairy=fairy;
    }
}

const RESISTANCE={
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

class Pokemon_list{
    no; types; abilities; EVYeld; catchRate; baseExp; growthExp; femaleRate; eggGroup; eggCycles; baseStats; preevolution; height; weight; moves;

    constructor(no,type1,type2,ability1,ability2,hiddenAbility,EVYeld,catchRate,baseExp,growthExp,femaleRate, eggGroup, eggCycles, baseHP, baseAttack, baseDefence, baseSpAttack, baseSpDefence, baseSpeed, preevolutionSpecie, preevolutionMethod, preevolutionMethodValue, height, weight, moves)
    {
        this.no=no;
        this.types={first:type1, second:type2};
        this.abilities={first:ability1, second:ability2, hidden:hiddenAbility};
        this.EVYeld=EVYeld;
        this.catchRate=catchRate;
        this.baseExp=baseExp;
        this.growthExp=growthExp;
        this.femaleRate=femaleRate;
        this.eggGroup=eggGroup;
        this.eggCycles=eggCycles;
        this.baseStats={
            hp:baseHP,
            attack:baseAttack,
            defence:baseDefence,
            spAttack:baseSpAttack,
            spDefence:baseSpDefence,
            speed:baseSpeed
        };
        this.preevolution={
            specie:preevolutionSpecie,
            method:preevolutionMethod,
            value:preevolutionMethodValue
        };
        this.height=height;
        this.weight=weight;
        this.moves=moves;
    }
}

const POKEMON_LIST={
    eevee:new Pokemon_list(1,'normal','','run away','adaptability','anticipation',['spDefence'],45,65,'medium fast',0.125,'field',35,55,55,50,45,65,55,'','','',0.3,6.5,[]),
    vaporeon:new Pokemon_list(2,'water','','water absorb','','hydration',['hp','hp'],45,184,'medium fast',0.125,'field',35,130,65,60,110,95,65,'eevee','stone','water stone',1,29,[]),
    jolteon:new Pokemon_list(3,'electric','','volt absorb','','quick feet',['speed','speed'],45,184,'medium fast',0.125,'field',35,65,65,60,110,95,130,'eevee','stone','thunder stone',0.8,24.5,[]),
    flareon:new Pokemon_list(4,'fire','','flash fire','','guts',['attack','attack'],45,184,'medium fast',0.125,'field',35,65,130,60,95,110,65,'eevee','stone','fire stone',0.9,25,[]),
    espeon:new Pokemon_list(5,'psychic','','synchronize','','magic bounce',['spAttack','spAttack'],45,184,'medium fast',0.125,'field',35,65,65,60,130,95,110,'eevee','friendship','daytime',0.9,26.5,[]),
    umbreon: new Pokemon_list(6,'dark','','synchronize','','inner focus',['spDef','spDef'],45,184,'medium fast',0.125,'field',35,95,65,110,60,130,65,'eevee','friendship','nighttime',1,27,[]),
    leafeon:new Pokemon_list(7,'grass','','leaf guard','','chlorophyll',['defence','defence'],45,184,'medium fast',0.125,'field',35,65,110,130,60,65,95,'eevee','place','mossy rock',1,25.5,[]),
    glaceon: new Pokemon_list(8,'ice','','','','',['spAttack','spAttack'],45,184,'medium fast',0.125,'field',35,65,60,110,130,95,65,'eevee','place','icy rock',0.8,25.9,[]),
    sylveon:new Pokemon_list(9,'fairy','','cute charm','','pixilate',['spDefence','spDefence'],45,184,'medium fast',0.125,'field',35,95,65,65,110,130,60,'eevee','love','fairy move',1,23.5,[]),
    bidoof:new Pokemon_list(10,'normal','','simple','unware','moody',['hp'],255,50,'medium fast',0.5,'field',15,59,45,40,35,40,31,'','','',0.5,20,[]),
    bibarel:new Pokemon_list(11,'normal','water','simple','unaware','moody',['attack','attack'],127,144,'medium fast',0.5,'field',15,79,85,60,55,60,71,'bidoof','lv',15,1,31.5,[]),
    rufflet:new Pokemon_list(12,'norlam','flying','keen eye','sheer force','hustle',['attack'],190,70,'slow',0,'flying',20,70,83,50,37,50,60,'','','',0.5,10.5,[]),
    braviary:new Pokemon_list(13,'','flying','keen eye','sheer force','defiant',['attack','attack'],60,179,'slow',0,'flying',20,100,123,75,57,75,80,'rufflet','lv',54,1.5,41,[]),
    vulpix:new Pokemon_list(14,'fire','','flash fire','','drought',['speed'],190,60,'medium fast',0.75,'field',20,38,41,40,50,65,65,'','','',0.6,9.9,[]),
    ninetales:new Pokemon_list(15,'fire','','flash fire','','drought',['spDefence','speed'],75,177,'medium fast',0.75,'field',20,73,76,75,81,100,100,'vulpix','stone','fire stone',1.1,19.9,[]),
    buizel:new Pokemon_list(16,'water','','swift swim','','water veil',['speed'],190,66,'medium fast',0.5,'field',20,55,65,35,60,30,85,'','','',0.7,29.5,[]),
    floatzel:new Pokemon_list(17,'water','','swift swim','','water veil',['speed','speed'],75,173,'medium fast',0.5,'field',20,85,105,55,85,50,115,'buizel','lv',26,1.1,33.5,[]),
    helioptile:new Pokemon_list(18,'electric','normal','dry skin','sand veil','solar power',['speed'],190,58,'medium fast',0.5,'dragon',20,44,38,33,61,43,70,'','','',0.5,6,[]),
    heliolisk:new Pokemon_list(19,'electric','normal','dry skin','sand veil','solar power',['spAttack','speed'],75,168,'medium fast',0.5,'dragon',20,62,55,52,109,94,109,'helioptile','stone','sun stone',1,21,[]),
    fletchling:new Pokemon_list(20,'normal','flying','big pecks','','gale wings',['speed'],255,56,'medium slow',0.5,'flying',15,45,50,43,40,38,62,'','','',0.3,1.7,[]),
    fletchinder:new Pokemon_list(21,'fire','flying','flame body','','glare wings',['speed','speed'],120,134,'medium slow',0.5,'flying',15,62,73,55,56,52,84,'fletchling','lv',17,0.7,16,[]),
    talonflame:new Pokemon_list(22,'fire','flying','flame body','','gale wings',['speed','speed','speed'],45,175,'medium slow',0.5,'flying',15,78,81,71,74,69,126,'fletchinder','lv',35,1.2,54,[]),
    shinx:new Pokemon_list(23,'electric','','rivalry','intimidate','guts',['attack'],235,53,'medium slow',0.5,'field',20,45,65,34,40,34,45,'','','',0.5,9.5,[]),
    luxio:new Pokemon_list(24,'electric','','rivarly','intimidate','guts',['attack','attack'],120,127,'medium slow',0.5,'field',20,60,85,49,60,49,60,'shinx','lv',15,0.9,30.5,[]),
    luxray:new Pokemon_list(25,'electric','dark','rivarly','intimidate','guts',['attack','attack','attack'],45,235,'medium slow',0.5,'field',20,80,120,79,95,79,70,'luxio','lv',30,1.4,42,[]),
    pinsir:new Pokemon_list(26,'bug','fighting','hyper cutter','mold breaker','moxie',['attack','attack'],45,175,'slow',0.5,'bug',25,65,125,100,55,70,85,'','','',1.5,55,[]),
    pinsir_mega:new Pokemon_list(0,'bug','flying','aerilate','','',['attack','attack'],45,175,'slow',0.5,'bug',25,65,155,120,65,90,105,'pinsir','mega stone','pinsirite',1.7,59,[]),
    riolu:new Pokemon_list(27,'fighting','','steadfast','inner focus','prankster',['attack'],75,57,'medium slow',0.125,'undiscovered',25,40,70,40,35,40,60,'','','',0.7,20.2,[]),
    lucario:new Pokemon_list(28,'fighting','steel','steadfast','inner focus','justtified',['attack','spAttack'],45,184,'medium slow',0.125,'field',25,70,110,70,115,70,90,'riolu','friendship','daytime',1.2,54,[]),
    lucario_mega:new Pokemon_list(0,'fighting','steel','adaptability','','',['attack','spAttack'],45,184,'medium slow',0.125,'field',25,70,145,88,140,70,112,'lucario','mega stone','lucarionite',1.3,57.5,[]),
    // mienfoo,
    // mienshao,
    // rockruff, 
    // skrelp,
    // dragalge,
    // pichu,
    // pikachu,
    // raichu, (electric fairy)
    // venonat,
    // venomoth,
    // bagon,
    // shelgon,
    // salamence,
    // houndour,
    // houndoom,
    // mudbray,
    // mudsdale, (ground fighting)
    // tauros, (normal ground)
    // miltank, (normal fairy)
    // arceus, 
}