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

    whenNextLevel()
    {
        let lv = this.level;
        let lv2 = Math.pow(lv,2);
        let lv3 = Math.pow(lv,3);
        switch(this.growthExp)
        {
            case 'erratic':
            {
                if(lv < 50) return lv3 * (100 - lv) / 50;
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
                return lv3 * (Math.floor(lv / 2) + 32) / 50;
            }
            
        }
    }

    showName()
    {
        if(this.nick == '') return this.name;
        else return this.nick;
    }

    actualPP(_which, _type)
    {
        let max,used;
        if(this.moves[_which] == 0)
        {
            max = 1;
            used = 1;
        }
        else
        {
            max = this.moves[_which].maxPP;
            used = this.ppUsed[_which];
        }

        switch(_type)
        {
            case 'number': return max - used;
            case 'percent': return Math.ceil((1 - used / max) * 100);
            case 'percent %': return Math.ceil((1 - used / max) * 100) + '%';
            case 'fraction': return (max - used) + ' / ' + max;
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

        if(typeof(moves) == 'string')
        {
            moves = moves.split(',')
        }

        for(let i=0;i<moves.length;i++)
        {
            if(typeof(moves[i]) == 'number')
            {
                if(moves[i] > 0){moves[i] = moveList[moves[i]]};
            }
        }
        
        this.moves = moves;

        if(ppUsed == 0){ppUsed = [0,0,0,0];}
        if(typeof(ppUsed) == 'string')
        {
            ppUsed = ppUsed.split(',')
        }
        this.ppUsed = ppUsed;
        
    }
}

class BattlePokemon extends Pokemon
{
    battle_sumStat(_stat)
    {
        switch(_stat)
        {
            case 0: case 'hp': _stat = 0; break;
            case 1: case 'attack': _stat = 1; break;
            case 2: case 'defence': _stat = 2; break;
            case 3: case 'spAttack': _stat = 3; break;
            case 4: case 'spDefence': _stat = 4; break;
            case 5: case 'speed': _stat = 5; break;

            default: return false;
        }
        return Math.round(this.sumStat(_stat) * (1 + this.statchanges[_stat] / 100));
    }

    objects =
    {
        lifeBar: null,
        moveBars: [null,null,null,null],
    }

    constructor(pokemon)
    {
        let monNum = getPokemonNumberByName(pokemon.name);
        super(monNum,pokemon.level,pokemon.gender,pokemon.ability,pokemon.friednship,pokemon.expirience,pokemon.nature,pokemon.moves,
        pokemon.nick,pokemon.IV,pokemon.EV,pokemon.OT,pokemon.damage,pokemon.ppUsed,pokemon.status,pokemon.item);
        
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
    canMega = [true, true];
    status = 'begining';
    activeFighter = 
    {
        ally: {pokemon: -1, lifeBar: null, level: null, name: null, gender: null, status: null, image: null},
        opponent: {pokemon: -1, lifeBar: null, level: null, name: null, gender: null, status: null, image: null}
    }
    neutralSpace = null;
    movePlace = null;
    movesButtons = [null,null,null,null];
    runButton = null;
    itemsPlace = null;
    info = null;
    infoBackup = '';
    decision = {ally: '', opponent: ''}
    order = [];

    changeStatus(_status)
    {
        switch(_status)
        {
            case 'doSth':
            {
                this.info.innerHTML = BATTLE_TEXTS.doSth.language();
                this.runButton.classList.remove('none');
                this.movePlace.classList.remove('none');
                this.itemsPlace.classList.remove('none');
                for(let i=0;i<6;i++)
                {
                    if(battle_allyTeam[i] == null){continue;}
                    if(battle_allyTeam[i].actualHP('number') <= 0){continue;}
                    if(battle.activeFighter.ally.pokemon == i){continue;}
                    document.getElementById('pokemonTeam_' + i).classList.add('activeButton');
                }
            } break;
            case 'opponent move':
            {
                this.info.innerHTML = BATTLE_TEXTS.oppmove.language();
                this.runButton.classList.add('none');
                this.movePlace.classList.add('none');
                this.itemsPlace.classList.add('none');
                for(let i=0;i<6;i++)
                {
                    document.getElementById('pokemonTeam_' + i).classList.remove('activeButton');
                }

                battle_tactic();
            } break;
            case 'who first':
            {
                const A = this.decision.ally.split(' ');
                const O = this.decision.opponent.split(' ');
                if(A[0] == 'run' || A[0] == 'changeAlly' || A[0] == 'useItem'){this.order = ['ally','opponent'];}
                else if(O[0] = 'useMove')
                {
                    const activeA = battle_allyTeam[this.activeFighter.ally.pokemon];
                    const activeO = battle_opponentTeam[this.activeFighter.opponent.pokemon];
                    const moveA = A[1] == -1 ? moveList[0]: activeA.moves[A[1]];
                    const moveO = O[1] == -1 ? moveList[0]: activeA.moves[O[1]];

                    if(moveA.priority > moveO.priority){this.order = ['ally','opponent'];}
                    else if(moveA.priority < moveO.priority){this.order = ['opponent','ally'];}
                    else
                    {
                        if(activeA.battle_sumStat('speed') > activeO.battle_sumStat('speed')){this.order = ['ally','opponent'];}
                        else if(activeA.battle_sumStat('speed') < activeO.battle_sumStat('speed')){this.order = ['opponent','ally'];}
                        else
                        {
                            const R = randomInt();
                            if(R){this.order = ['opponent','ally'];}
                            else{this.order = ['ally','opponent'];}
                        }
                    }
                }
                else{this.order = ['opponent','ally'];}

                battle_action(0);
            } break;
            case 'level up':
            {
                const P = battle_allyTeam[battle.activeFighter.ally.pokemon];
                P.level += 1;
                this.info.innerHTML = P.name + BATTLE_TEXTS.promote.language() + P.level;
                setTimeout(function()
                {
                    if(P.expirience >=  P.whenNextLevel())
                    {
                        battle.changeStatus('level up');
                    }
                    else
                    {
                        battle_end();
                    }
                },1000);
            } break;
        }

        this.status = _status;
    }
}

class PokemonMove
{
    constructor(name,power,accuracy,type,maxPP,target,priority,contact,effects)
    {
        this.name = name;
        this.accuracy = accuracy;
        this.maxPP = maxPP;
        this.target = target;
        this.priority = priority;
        
        this.type = getTypeNumberByName(type);

        if(contact === 1){contact = true;}else{contact = false;}
        this.contact = contact;

        if(power == 0){this.category = 'status';}
        else if(power < 0){this.category = 'special', power *= -1;}
        else{this.category = 'physical'}
        this.power = power;

        effects = effects.split(',');
        for(let i=0;i<effects.length;i++)
        {
            effects[i] = new Effect(effects[i].split('|'));

        }
        this.effects = effects;
    }
}

class Effect
{
    constructor(_array)
    {
        let name =  POKEMON_MOVE_EFFECTS[_array[0] *1];
        let value = _array[1] *1;
        let chance = _array[2] *1;
        let whom = _array[3] *1;

        this.name = name;
        this.chance = chance;
        if(name.types != undefined)
        {
            value = this.name.types[value];
        }
        this.value = value;
        this.whom = MOVE_EFFECT_WHOM[whom];
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