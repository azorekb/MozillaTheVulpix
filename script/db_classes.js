class Pokemon_list
{
    name; no; types; abilities; EVYeld; catchRate; baseExp; growthExp; femaleRate; eggGroup; eggCycles; baseStats; preevolution; height; weight;

    constructor(name,no,types,abilities,EVYeld,catchRate,baseExp,growthExp,femaleRate, eggGroup, eggCycles, baseHP, baseAttack, baseDefence, baseSpAttack, baseSpDefence, baseSpeed, preevolutionSpecie, preevolutionMethod, preevolutionMethodValue, height, weight)
    {
        this.name = name;
        this.no = no;
        console.log(name,types);
        let text = typeof(types) == "string" ? types.split(','): types;
        this.types = [text[0]*1, text[1]*1];
        text = typeof(abilities) == "string" ? abilities.split(','): abilities;
        this.abilities = [text[0]*1, text[1]*1, text[2]*1];
        text = typeof(EVYeld) == "string" ? EVYeld.split(','): EVYeld;
        this.EVYeld = [text[0]*1, text[1]*1, text[2]*1];
        this.catchRate = catchRate;
        this.baseExp = baseExp;
        this.growthExp = growthExp;
        this.femaleRate = femaleRate;
        this.eggGroup = eggGroup;
        this.eggCycles = eggCycles;
        this.baseStats = 
        {
            hp: baseHP,
            attack: baseAttack,
            defence: baseDefence,
            spAttack: baseSpAttack,
            spDefence: baseSpDefence,
            speed: baseSpeed
        };
        this.preevolution = 
        {
            specie: preevolutionSpecie,
            method: preevolutionMethod,
            value: preevolutionMethodValue
        };
        this.height = height;
        this.weight = weight;
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

class Pokemon extends Pokemon_list
{

    constructor(specie,level,gender,friednship,expirience,nature,moves,nickname = '',IV = [0,0,0,0,0,0],EV = [0,0,0,0,0,0],OT = 'Trener')
    {
        const E = pokemonList[specie];
        super(E.name,E.no,E.types,E.abilities,E.EVYeld,E.catchRate,E.baseExp,E.growthExp,E.femaleRate,E.eggGroup,
        E.eggCycles,E.baseStats.hp,E.baseStats.attack,E.baseStats.defence,E.baseStats.spAttack,
        E.baseStats.spDefence,E.baseStats.speed,E.preevolution.specie,E.preevolution.method,E.preevolution.value,
        E.height,E.weight);
            
        this.OT = OT;
        this.nick = nickname;
        this.level = level;
        this.gender = gender;
        this.expirience = expirience;
        this.friednship = friednship;
        this.IV = IV;
        this.EV = EV
        this.nature = nature;
        this.moves = 
        [
            moveList[moves[0]],
            moveList[moves[1]],
            moveList[moves[2]],
            moveList[moves[3]]
        ];
        
    }
}