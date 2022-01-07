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
        if(this.nick == '')
            return pokemonName(this.name);
        return this.nick;
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

    sumEV()
    {
        let sum = 0;
        for(let i=0;i<6;i++)
        {
            sum += this.EVYeld[i];
        }
    }

    heal(_value)
    {
        if(_value > this.damage){_value = this.damage}
        this.damage -= Math.ceil(_value);
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
        if(status == 0){status = 'ok'}
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

        if(moves == -1)
        {
            moves = [];
            let avaliableMoves = [];
            for(let i=0;i<movesForPokemon.length;i++)
            {
                if(movesForPokemon[i].pokemon == this.name)
                {
                    for(let j=1;j<=this.level;j++)
                    {
                        if(movesForPokemon[i].method == (j + ' level'))
                        {
                            avaliableMoves.push(getMoveNumberByName(movesForPokemon[i].move));
                        }
                    }
                }
            }

            for(let i=0;i<POKEMON_MOVE_COUNT;i++)
            {
                const L = avaliableMoves.length;
                if(L > 0){moves[i] = avaliableMoves.splice(randomInt(L - 1),1)[0];}
                else{moves[i] = 0;}
            }
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
        let changes = 1;
        if((_stat == 2 || _stat == 4) && hasItType(this,'ice') && battle.weather == 'hail'){changes *= 1.5;}
        if(_stat == 5)
        {
            if(this.status == 'paralysis'){changes *= 0.4;}
            if(hasItType(this,'flying') && battle.weather == 'wind'){changes *= 1.5}
        }

        return Math.round(this.sumStat(_stat) * (1 + this.statchanges[_stat] / 100) * changes);
    }

    resistance(_type)
    {
        const TYPE = typeof(_type) == 'number'? _type: getTypeNumberByName(_type);
        let res = POKEMON_TYPES[this.types[0]].resistance[TYPE];
        res *= POKEMON_TYPES[this.types[1]].resistance[TYPE];
        return res;
    }

    hit(_damage)
    {
        if(_damage > this.actualHP('number') || _damage == 0){_damage = this.actualHP('number');}
        this.damage += Math.ceil(_damage);
        return _damage;
    }

    changeStat(_which,_value)
    {
        switch(_which)
        {
            case 1: case 'attack': _which = 1; break;
            case 2: case 'defence': _which = 2; break;
            case 3: case 'spAttack': _which = 3; break;
            case 4: case 'spDefence': _which = 4; break;
            case 5: case 'speed': _which = 5; break;
        }
        this.statchanges[_which] += _value;
        if(this.statchanges[_which] > 300){this.statchanges[_which] = 300; return 'max';}
        if(this.statchanges[_which] < -75){this.statchanges[_which] = -75; return 'min'}
        if(_value == 0){this.statchanges[_which] = 0; return 'zero';}
        return 'ok';
    }

    isFlying()
    {
        if(hasItType(this, 'flying')){return true;}
        if(this.ability == 'levitate'){return true;}

        return false;
    }

    temporaryStatus = 
    {
        flinch: false,
        protect: false,
        hide: {where: '', nextMove: ''},
        waiting: {why: '', nextMove: ''},
        traps :
        {
            bind: 0,
            flame: 0,
            leech: 0,
            unable_to_use_status: 0,
        }
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
        this.mega = false;
    }
}

class BattleField
{
    weather = 'none';
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
    finishRound = false;
    whoNow = null;
    traps = 
    {
        ally: {stealth_rock: 0, spikes: 0, poison_spikes: 0, sticky_web: 0},
        opponent: {stealth_rock: 0, spikes: 0, poison_spikes: 0, sticky_web: 0}
    }
    shields = 
    {
        ally: {physical: 0, special: 0},
        opponent: {physical: 0, special: 0}
    }

    changeStatus(_status)
    {
        switch(_status)
        {
            case 'doSth':
            {
                this.finishRound = false;
                if(battleTeam.ally[this.activeFighter.ally.pokemon].temporaryStatus.hide.where == '')
                {
                    this.info.innerHTML = showLanguage(BATTLE_TEXTS.doSth);
                    this.runButton.classList.remove('none');
                    this.movePlace.classList.remove('none');
                    this.itemsPlace.classList.remove('none');
                    for(let i=0;i<6;i++)
                    {
                        if(battleTeam.ally[i] == null){continue;}
                        if(battleTeam.ally[i].actualHP('number') <= 0){continue;}
                        if(battle.activeFighter.ally.pokemon == i){continue;}
                        document.getElementById('pokemonTeam_' + i).classList.add('activeButton');
                    }
                }
                else
                {
                    setTimeout(() => battle_decide('useMove x'), 0);
                }
            } break;
            case 'opponent move':
            {
                this.info.innerHTML = showLanguage(BATTLE_TEXTS.oppmove);
                this.runButton.classList.add('none');
                this.movePlace.classList.add('none');
                this.itemsPlace.classList.add('none');
                for(let i=0;i<6;i++)
                {
                    document.getElementById('pokemonTeam_' + i).classList.remove('activeButton');
                }

                if(this.status == 'doSth'){battle_tactic();}
                if(this.status == 'choose ally')
                {
                    this.order = ['ally'];
                    battle_action(0);
                }
                if(this.status == 'return')
                {
                    battle_action(this.whoNow);
                }
            } break;
            case 'who first':
            {
                const A = this.decision.ally.split(' ');
                const O = this.decision.opponent.split(' ');
                if(A[0] == 'run' || A[0] == 'changeAlly' || A[0] == 'useItem'){this.order = ['ally','opponent'];}
                else if(O[0] = 'useMove')
                {
                    const activeA = battleTeam.ally[this.activeFighter.ally.pokemon];
                    const activeO = battleTeam.opponent[this.activeFighter.opponent.pokemon];
                    let moveA,moveO;
                    if(A[1] == 'x')
                    {
                        if(activeA.temporaryStatus.waiting.why != ''){moveA = activeA.temporaryStatus.waiting.nextMove;}
                        else if(activeA.temporaryStatus.hide.where != ''){moveA = activeA.temporaryStatus.hide.nextMove;}
                        else{moveA = moveList[0]}
                    }
                    else
                    {
                        moveA = A[1] == -1 ? moveList[0]: activeA.moves[A[1]];
                    }
                    if(O[1] == 'x')
                    {
                        if(activeO.temporaryStatus.waiting.why != ''){moveO = activeO.temporaryStatus.waiting.nextMove;}
                        else if(activeO.temporaryStatus.hide.where != ''){moveO = activeO.temporaryStatus.hide.nextMove;}
                        else{moveO = moveList[0]}
                    }
                    else
                    {
                        moveO = O[1] == -1 ? moveList[0]: activeO.moves[O[1]];
                    }

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
                const P = battleTeam.ally[battle.activeFighter.ally.pokemon];
                P.level += 1;
                this.info.innerHTML = P.name + showLanguage(BATTLE_TEXTS.promote) + P.level;
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
            case 'next ally':
            {
                if(isAllyAvailable())
                {
                    this.runButton.classList.remove('none');
                    setTimeout(function(){battle.changeStatus('choose ally')},1);
                }
                else
                {
                    this.info.innerHTML = showLanguage(BATTLE_TEXTS.lose);
                    setTimeout(function(){battle_lose();},1000);
                }
            } break;
            case 'choose ally': this.info.innerHTML = showLanguage(BATTLE_TEXTS.doSth); break;
            case 'return':
            {
                this.info.innerHTML = showLanguage(BATTLE_TEXTS.chooseAlly);
            }
            break;
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

        if(effects == ''){effects = [];}
        else
        {
            effects = effects.split(',');
            for(let i=0;i<effects.length;i++)
            {
                effects[i] = new Effect(effects[i].split('|'));
    
            }
        }
        this.effects = effects;
    }
}

class Effect
{
    constructor(_array)
    {
        const name =  POKEMON_MOVE_EFFECTS[_array[0] *1];
        let value = _array[1] *1;
        const chance = _array[2] *1;
        const whom = _array[3] *1;

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