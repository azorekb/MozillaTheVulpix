class Resistance
{
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

class Pokemon_list
{
    no; types; abilities; EVYeld; catchRate; baseExp; growthExp; femaleRate; eggGroup; eggCycles; baseStats; preevolution; height; weight;

    constructor(no,type1,type2,ability1,ability2,hiddenAbility,EVYeld,catchRate,baseExp,growthExp,femaleRate, eggGroup, eggCycles, baseHP, baseAttack, baseDefence, baseSpAttack, baseSpDefence, baseSpeed, preevolutionSpecie, preevolutionMethod, preevolutionMethodValue, height, weight)
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
            specie: preevolutionSpecie,
            method: preevolutionMethod,
            value: preevolutionMethodValue
        };
        this.height=height;
        this.weight=weight;
    }
}

class AdminPokemonDetails
{
    isImportant; isMulti; isNumber; min; max; description; text; example;
    constructor(isImportant, isMulti, isNumber, min, max, description, text, example)
    {
        this.isImportant = isImportant; 
        this.isMulti = isMulti;
        this.isNumber = isNumber; 
        this.min = min; 
        this.max = max; 
        this.description = description;
        this.text = text;
        this.example = example;
        
    }
}

class NumberArray
{
    constructor(min, max)
    {
        for(let i=0;i<=max-min;i++)
        {
            this[i] = min + i;
        }
    }
}