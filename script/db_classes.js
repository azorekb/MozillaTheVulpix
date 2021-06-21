// POKEMON
class Pokemon_list
{
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

    actualHP(_type)
    {
        switch(_type)
        {
            case 'number': return this.sumStat(0) - this.damage;
            case 'percent': return Math.ceil((1 - this.damage / this.sumStat(0)) * 100);
            case 'percent %': return Math.ceil((1 - this.damage / this.sumStat(0)) * 100) + '%';
            case 'fraction': return (this.sumStat(0) - this.damage) + ' / ' + this.sumStat(0);
        }
    }

    showGender()
    {
        switch(this.gender)
        {
            case 'genderless': return '';
            case 'female': return '<font color=pink>&female;</font>';
            case 'male': return '<font color=blue>&male;</font>';
        }
    }

    whemNextLevel()
    {
        let lv = this.level;
        let lv2 = Math.pow(lv,2);
        let lv3 = Math.pow(lv,3);
        switch(this.growthExp)
        {
            case 'erratic':
            {
                if(lv < 50) return lv3 * (100 = lv) / 50;
                if(lv < 68) return lv3 * (150 - lv) / 100;
                if(lv < 98) return lv3 * Math.floor((1911 - 10 * lv) / 3) / 500;
                return lv3 * (160 - lv) / 100;
            }
            case 'fast': return 4 * lv3 / 5;
            case 'medium fast': return lv3;
            case 'medium slow': return 6/5 * lv3 - 15 * lv2 + 100 * lv - 140;
            case 'slow': return 5/4 * lv3;
            case 'fluctuating':
            {
                if(lv < 15) return lv3 * (Math.floor((lv + 1) / 3) + 24) / 50;
                if(lv < 36) return lv3 * (n + 14) / 50;
                return lv3 (Math.floor(lv / 2) + 32) / 50;
            }
            
        }
    }


    constructor(specie,level,gender,ability,friednship,expirience,nature,moves,nick,IV,EV,OT,damage,ppUsed,status = 0,item = 0)
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

        if(ability == -1)
        {
            ability = this.abilities[randomInt()];
            if(ability == 0){ability = this.abilities[0];}
        }
        this.ability = ability;

        if(gender == -1)
        {
            if(this.femaleRate == -1){gender = 'genderless';}
            else
            {
                const draw = randomInt(100);
                if(draw < this.femaleRate){gender = 'female';}
                else{gender = 'male';}
            }
        }
        this.gender = gender;

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
    battle_sumStat(_stat){return Math.round(this.sumStat(_stat) * (1 + this.statchanges[_stat] / 100));}

    objects =
    {
        lifeBar: null,
    }

    constructor(pokemon)
    {
        let monNum = getPokemonNumberByName(pokemon.name);
        super(monNum,pokemon.level,pokemon.gender,pokemon.ability,pokemon.friednship,pokemon.expirience,pokemon.nature,pokemon.moves,
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