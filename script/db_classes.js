// POKEMON
class Pokemon_list
{
    name; no; types; abilities; EVYeld; catchRate; baseExp; growthExp; femaleRate; eggGroup; eggCycles; baseStats; preevolution; height; weight;

    constructor(name,no,types,abilities,EVYeld,catchRate,baseExp,growthExp,femaleRate, eggGroup, eggCycles, baseHP, baseAttack, baseDefence, baseSpAttack, baseSpDefence, baseSpeed, preevolutionSpecie, preevolutionMethod, preevolutionMethodValue, height, weight)
    {
        this.name = name;
        this.no = no;
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

class Pokemon extends Pokemon_list
{
    sumStat(_stat)
    {
        const base = this.baseStats[POKEMON_STATS[_stat +1].english]*1; //base value
        if(base == 1){return 1;}
        const iv = this.IV[_stat]; //IV
        const ev = Math.floor(this.EV[_stat] / 4); //EV
        const lv = this.level; //level
        const NATURE = POKEMON_NATURE[this.nature];
        let n = 0;
        if(NATURE.statUp != NATURE.statDown) //nature changes
        {
            if(NATURE.statUp == _stat){n = NATURE_CHANGE}
            if(NATURE.statDown == _stat){n = -1 * NATURE_CHANGE}
        }
        const nature = 1 + n;
        
        if(POKEMON_STATS[_stat + 1].english == 'hp')
            return Math.floor((2 * base + iv + ev) * lv / 100) + lv + 10;
        return Math.floor((Math.floor((2 * base + iv + ev) * lv / 100) + 5) * nature);
    }

    constructor(specie,level,gender,friednship,expirience,nature,moves,nick,IV,EV,OT,damage,ppUsed,status = 0,item = 0)
    {
        const E = pokemonList[specie];
        super(E.name,E.no,E.types,E.abilities,E.EVYeld,E.catchRate,E.baseExp,E.growthExp,E.femaleRate,E.eggGroup,
        E.eggCycles,E.baseStats.hp,E.baseStats.attack,E.baseStats.defence,E.baseStats.spAttack,
        E.baseStats.spDefence,E.baseStats.speed,E.preevolution.specie,E.preevolution.method,E.preevolution.value,
        E.height,E.weight);
        
        this.OT = OT;
        this.nick = nick;
        this.level = level;
        this.expirience = expirience;
        this.friednship = friednship;
        this.status = status
        this.item = item;
        this.damage = damage;

        if(gender == -1)
        {
            if(this.femaleRate == -1){this.gender = 'genderless';}
            else
            {
                const draw = randomInt(100);
                if(draw < this.femaleRate){this.gender = 'female';}
                else{this.gender = 'male';}
            }
        }
        else{this.gender = gender;}

        if(IV == -1)
        {
            IV = [];
            for(let i=1;i<POKEMON_STATS.length;i++)
            {
                IV.push(randomInt(31));
            }
        }
        this.IV = IV;
        
        if(EV == -1)
        {
            EV = [];
            for(let i=1;i<POKEMON_STATS.length;i++)
            {
                EV.push(0);
            }
        }
        this.EV = EV;
        if(nature == -1){nature = randomInt(POKEMON_NATURE.length - 1)}
        this.nature = nature;
        this.moves = 
        [
            moveList[moves[0]],
            moveList[moves[1]],
            moveList[moves[2]],
            moveList[moves[3]]
        ];
        if(ppUsed == 0){ppUsed = [0,0,0,0];}
        this.ppUsed = ppUsed;
        
    }
}

class BattlePokemon extends Pokemon
{
    battle_sumStat(_stat)
    {
        return Math.round(this.sumStat(_stat) * (1 + this.statchanges[_stat] / 100));
    }

    constructor(pokemon)
    {
        let monNum;
        for(let i=0;i<pokemonList.length;i++){if(pokemon.name == pokemonList[i].name){monNum = i;}}
        super(monNum,pokemon.level,pokemon.gender,pokemon.friednship,pokemon.expirience,pokemon.nature,pokemon.moves,
        pokemon.nick,pokemon.IV,pokemon.EV,pokemon.OT,pokemon.hpLeft,pokemon.ppLeft,pokemon.status,pokemon.item);
        
        this.statchanges = [];
        for(let i=1;i<POKEMON_STATS.length;i++){this.statchanges.push(0);}
        this.temporaryStatus = [];
        this.mega = false;
    }
}

class BattleField
{
    weather = null;
    weatherTime = 0;
    field = null;
    fieldTime = 0;
    megaUsed = [false, false];

}

class PokemonMove
{
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