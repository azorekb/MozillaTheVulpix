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

class PokemonMove
{
    power = 0;
    accuracy = 100;
    type = '';
    category = '';
    effects = [];
    PP = 1;
    target = 'one_opponent';
    
    constructor(power,accuracy,type,category,effects,PP,target)
    {
        this.accuracy = accuracy;
        this.effects = effects;
        this.power = power;
        this.category = category;
        this.type = type;
        this.PP = PP;
        this.target = target;
    }
}

class Effect
{
    name = '';
    chance = 100;
    value = 0;
    
    constructor(name,chance,value)
    {
        this.name = name;
        this.chance = chance;
        this.value = value;
    }
}