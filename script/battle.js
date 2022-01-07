function battle_start(_opponentTeam, _numberOfPokemon)
{
    battle = new BattleField();

    activeWindow = 'unactive';
    
    //(...) efekty przejścia i takie tam
    if(_opponentTeam == null)
    {
        _opponentTeam = [0,0,0,0,0,0];
        switch(_numberOfPokemon)
        {
            case 6: _opponentTeam[5] = new BattlePokemon(randomWildPokemon());
            case 5: _opponentTeam[4] = new BattlePokemon(randomWildPokemon());
            case 4: _opponentTeam[3] = new BattlePokemon(randomWildPokemon());
            case 3: _opponentTeam[2] = new BattlePokemon(randomWildPokemon());
            case 2: _opponentTeam[1] = new BattlePokemon(randomWildPokemon());
            case 1: _opponentTeam[0] = new BattlePokemon(randomWildPokemon());
        }
    }

    for(let i=0;i<TEAM_COUNT;i++){battleTeam.opponent[i] = _opponentTeam[i];}
    
    okno.innerHTML = '';
    
    let battleWindow_container = newElement('div',okno,'','battleWindow_container');
    let pokemonTeam = newElement('div',battleWindow_container,'pokemonTeam');
    
    let team = activeUser.team;
    for(let i=0;i<TEAM_COUNT;i++)
    {
        let pokemon = newElement('div',pokemonTeam, '', 'pokemonTeam_' + i);

        if(team[i] == null)
        {
            battleTeam.ally[i] = null;
        }
        else
        {
            battleTeam.ally[i] = new BattlePokemon(team[i]);
            
            let data = newElement('div',pokemon,'pokemonData');            
            data.appendChild(pokemonImage(team[i].name,20));
            
            let name = newElement('p',data);
            name.innerHTML = team[i].showName() + ' ' + team[i].showGender();
            
            let lifebar_container = newElement('div',pokemon, 'lifeBar')
            let lifebar = newElement('div',lifebar_container);
            lifebar.style.width = team[i].actualHP('percent %');
            // lifebar.innerHTML = team[i].actualHP('fraction');
            battleTeam.ally[i].objects.lifeBar = lifebar;
            
            let moveBars = newElement('div',pokemon,'moveBarsContainer');

            for(let j=0;j<4;j++)
            {
                let moveBar = newElement('div',moveBars,'moveBar');
                let moveBar_value = newElement('div',moveBar);
                moveBar_value.style.width = battleTeam.ally[i].actualPP(j,'percent %');
                battleTeam.ally[i].objects.moveBars[j] = moveBar_value;
            }
            
            pokemon.onmouseover = function(){if(battle.activeFighter.ally.pokemon != i){battle_info('team ' + i)}};
            pokemon.onmouseout = function(){if(battle.activeFighter.ally.pokemon != i){battle_info('')}};
            pokemon.onclick = function(){battle_decide('changeAlly ' + i)};
        }
    }
    
    let container = newElement('div',battleWindow_container,'battleFieldAction');
    let battleField = newElement('div',container,'battleField');
    let infoBar = newElement('div',battleField,'infoBar')
    let allyInfo = newElement('div',infoBar,'info');
    let dataRow = newElement('div',allyInfo, 'data');

    let ally_level = newElement('div',dataRow);
    battle.activeFighter.ally.level = ally_level;

    let ally_name = newElement('div',dataRow);
    battle.activeFighter.ally.name = ally_name;

    let ally_gender = newElement('div',dataRow);
    battle.activeFighter.ally.gender = ally_gender;

    let ally_status = newElement('div',dataRow);
    battle.activeFighter.ally.status = ally_status;

    let ally_lifebar = newElement('div',allyInfo,'lifebar');
    let ally_livebar_value = newElement('div',ally_lifebar);
    battle.activeFighter.ally.lifeBar = ally_livebar_value;

    let runSpace = newElement('div',infoBar, 'runSpace');
    let runButton = newElement('div',runSpace,'button medium runButton');
    runButton.onclick = function(){battle_decide('run');}
    runButton.onmouseover = function(){battle_info('run');}
    runButton.onmouseout = function(){battle_info('');}
    runButton.innerHTML = 'RUN forest RUN';
    battle.runButton = runButton;

    let opponentInfo = newElement('div',infoBar,'info');
    dataRow = newElement('div',opponentInfo, 'data');

    let opponent_level = newElement('div',dataRow);
    battle.activeFighter.opponent.level = opponent_level;

    let opponent_name = newElement('div',dataRow);
    battle.activeFighter.opponent.name = opponent_name;

    let opponent_gender = newElement('div',dataRow);
    battle.activeFighter.opponent.gender = opponent_gender;

    let opponent_status = newElement('div',dataRow);
    battle.activeFighter.opponent.status = opponent_status;

    let opponent_lifebar = newElement('div',opponentInfo,'lifebar');
    let opponent_livebar_value = newElement('div',opponent_lifebar);
    battle.activeFighter.opponent.lifeBar = opponent_livebar_value;

    let places = newElement('div', battleField, 'battlePlace');

    let ally_place = newElement('div', places, 'battleSidePlace');
    let ally_image = newElement('div', ally_place);
    battle.activeFighter.ally.image = ally_image;

    battle.neutralSpace = newElement('div',places,'battleSpace');

    let opponent_place = newElement('div', places, 'battleSidePlace');
    let opponent_image = newElement('div', opponent_place);
    battle.activeFighter.opponent.image = opponent_image;

    let statusInfo = newElement('div',container,'statusInfo');
    battle.info = statusInfo;

    let movesPlace = newElement('div', container, 'movesPlace');
    battle.movePlace = movesPlace;

    for(let i=0;i<4;i++)
    {
        let moveButton = newElement('div', movesPlace, 'button big');
        moveButton.onclick = function(){battle_decide('useMove ' + i);}
        moveButton.onmouseover = function(){battle_info('move ' + i);}
        moveButton.onmouseout = function(){battle_info('');}
        battle.movesButtons[i] = moveButton;
    }

    let items_containter = newElement('div', container);
    items_containter.innerHTML = 'Tu będą itemki ... ';
    battle.itemsPlace = items_containter;

    battle_changeFighter('ally');
    battle_changeFighter('opponent');

    battle.changeStatus('doSth');
}

function randomWildPokemon()
{
    let pokemonNumber = randomInt(pokemonList.length - 1);
    if(activeUser.meet != undefined)
    {
        pokemonNumber = activeUser.meet;
    }
    return new Pokemon(pokemonNumber, 1, -1, -1, 0, 0, -1, -1,'',-1,-1,'wild',0,0,0,0);
}

function battle_changeFighter(_side, _who)
{
    if(_who == undefined)
    {
        if(_side == 'opponent'){_who = 0;}
        else
        {
            for(let i=0;i<TEAM_COUNT;i++)
            {
                if(battleTeam.ally[i].actualHP('number') > 0){_who = i; break;}
            }
        } 
    }

    const F = battle.activeFighter[_side];
    F.pokemon = _who;
    const DATA = battleTeam[_side][_who];
    F.lifeBar.style.width = DATA.actualHP('percent %');
    F.level.innerHTML = DATA.level;
    F.name.innerHTML = DATA.showName();
    F.gender.innerHTML = DATA.showGender();
    F.status.innerHTML = '';
    F.status.appendChild(infoImage(DATA.status + 'ed', SIZE_OF_BATTLE_POKEMON_STATUS));
    F.image.innerHTML = '';
    if(_side == 'opponent'){F.image.appendChild(pokemonImage(DATA.name));}
    else{F.image.appendChild(pokemonImage(DATA.name,0,true));}

    if(_side == 'ally')
    {
        for(i=0;i<4;i++)
        {
            if(DATA.actualPP(i,'number') == 0)
            {
                battle.movesButtons[i].innerHTML = showLanguage(moveList[0].name);
            }
            else
            {
                battle.movesButtons[i].innerHTML = showLanguage(DATA.moves[i].name) + ' ' + DATA.actualPP(i,'fraction');
            }
        }
    }

    battle.info.innerHTML = F.name.innerHTML + showLanguage(BATTLE_TEXTS.go);

    const PKMN = _side == 'ally'? battleTeam.ally[_who]: battleTeam.opponent[_who];
    if(battle.traps[_side].stealth_rock > 0)
    {
        PKMN.hit(PKMN.battle_sumStat('hp') * PKMN.resistance('rock') / 8); 
    }
    if(battle.traps[_side].spikes > 0)
    {
        let damage = PKMN.battle_sumStat('hp');
        switch(battle.traps[_side].spikes)
        {
            case 1: damage /= 8; break;
            case 2: damage /= 6; break;
            default: damage /= 4; break;
        }

        if(PKMN.isFlying() == false)
        {
            PKMN.hit(damage);
        }
    }
    if(battle.traps[_side].poison_spikes > 0)
    {
        if(PKMN.hasItType('poison'))
        {
            battle.traps[_side].poison_spikes = 0;
        }
        else if(PKMN.isFlying() == false && PKMN.hasItType('steel') == false)
        {
            PKMN.status = 'poisoned';
        }
    }
    battle_updateHP();
}

function battle_info(_what)
{
    if(battle.status != 'doSth' && battle.status != 'choose ally' && battle.status != 'return'){return false;}
    const whats = _what.split(' ');
    const P = battleTeam.ally[battle.activeFighter.ally.pokemon];
    
    if(_what == '')
    {
        battle.info.innerHTML = battle.infoBackup;
        return true;
    }
    
    battle.infoBackup = battle.info.innerHTML;
    let info = battle.info;

    switch(whats[0])
    {
        case 'move':
        {
            let move = P.moves[whats[1]];
            if(P.actualPP(whats[1],'number') <= 0){move = moveList[0];}
            info.innerHTML = showLanguage(BATTLE_TEXTS.use) + showLanguage(move.name);
            info.appendChild(infoImage(POKEMON_TYPES[move.type].english, 20));
            info.appendChild(infoImage(move.category, 20));
            info.innerHTML += showLanguage(BATTLE_TEXTS.power) + move.power;
            info.innerHTML += showLanguage(BATTLE_TEXTS.acc) + move.accuracy;
        } break;
        case 'run': info = showLanguage(BATTLE_TEXTS.run); break;
        case 'team':
        {
            if(battle.activeFighter.ally.pokemon == whats[1]){info = showLanguage(BATTLE_TEXTS.inBattle)}
            else
            {
                const pokemon = battleTeam.ally[whats[1]];
                info.innerHTML = showLanguage(BATTLE_TEXTS.switch) + pokemon.name + showLanguage(BATTLE_TEXTS.level) + pokemon.level;
                info.innerHTML += showLanguage(BATTLE_TEXTS.type) + showLanguage(POKEMON_TYPES[pokemon.types[0]]);
                if(pokemon.types[1] > 0){info.innerHTML += '/' + showLanguage(POKEMON_TYPES[pokemon.types[1]]);}
                info.innerHTML += showLanguage(BATTLE_TEXTS.moves);
                for(let i=0;i<4;i++)
                {
                    if(pokemon.moves[i] != 0){info.innerHTML += showLanguage(pokemon.moves[i].name) + ', ';}
                }
            }
        }
    }
}

function battle_decide(_what)
{
    if(battle.status != 'doSth' && battle.status != 'choose ally' && battle.status != 'return'){return false;}
    
    const WHATS = _what.split(' ');
    const active = battle.activeFighter.ally.pokemon;
    switch(WHATS[0])
    {
        case 'run': battle.decision.ally = _what; break;
        case 'useMove':
        {
            const pokemon = battleTeam.ally[active];
            if(WHATS[1] == 'x'){battle.decision.ally = 'useMove x';}
            else if(pokemon.moves[WHATS[1]] == 0){battle.decision.ally = 'useMove -1';}
            else if(pokemon.actualPP(WHATS[1],'number') <= 0){battle.decision.ally = 'useMove -1';}
            else{battle.decision.ally = _what;}
        } break;
        case 'changeAlly':
        {
            const pokemon = battleTeam.ally[WHATS[1]];
            if(WHATS[1] == active){return false;}
            if(pokemon.actualHP('number') <= 0){return false;}
            battle.decision.ally = _what;
        } break;
    }

    battle.changeStatus('opponent move');
}

function battle_tactic()
{
    const PKMN = battleTeam.opponent[battle.activeFighter.opponent.pokemon];
    if(PKMN.temporaryStatus.hide.where == '' && PKMN.temporaryStatus.waiting.why == '')
    {
        let moves = [];
        for(let i=0;i<4;i++)
        {
            if(PKMN.moves[i] == 0){continue;}
            if(PKMN.actualPP(i,'number') <= 0){continue;}
            moves.push(i);
        }
    
        if(moves.length == 0){battle.decision.opponent = 'useMove -1';}
        if(moves.length == 1){battle.decision.opponent = 'useMove ' + moves[0];}
        if(moves.length > 1){battle.decision.opponent = 'useMove ' + randomInt(moves.length -1);}
    }
    else
    {
        battle.decision.opponent = 'useMove x';
    }
    

    battle.changeStatus('who first');
}

function battle_action(_whoNow)
{
    if(battle.order[_whoNow] == undefined){battle_finishRound(_whoNow); return false;}
    battle.whoNow = _whoNow;

    const who = battle.order[_whoNow];
    const user = battleTeam[who][battle.activeFighter[who].pokemon];
    const secondSide = who == 'ally' ? battleTeam.opponent[battle.activeFighter.opponent.pokemon] : battleTeam.ally[battle.activeFighter.ally.pokemon];
    const sideTwo = who == 'ally' ? 'opponent' : 'ally';
    const DECISIONS = battle.decision[who].split(' ');
    
    switch(DECISIONS[0])
    {
        case 'run':
            battle.info.innerHTML = showLanguage(BATTLE_TEXTS.runSuccess);
            setTimeout(function(){battle_end()},battleActionCooldown);
        break;
        case 'changeAlly':
                battle.info.innerHTML = user.name + showLanguage(BATTLE_TEXTS.comeBack);
                setTimeout(function(){battle_changeFighter(who,DECISIONS[1]);},battleActionCooldown);
                setTimeout(function(){battle_action(_whoNow + 1)},2000);
        break;
        case 'useMove':
            let unable = false;
            let time = 1;
            const CHANCE = randomInt(100); // chance of fully paralysis or woke up from sleep etc
            if(user.temporaryStatus.flinch)
            {
                battle.info.innerHTML = user.showName() + showLanguage(BATTLE_TEXTS.flinch);
                unable = true;
            }
            if(user.status == 'paralysis' && CHANCE < 25)
            {
                battle.info.innerHTML = user.showName() + showLanguage(BATTLE_TEXTS.fullyPar);
                unable = true;
            }
            if(user.status == 'freeze')
            {
                battle.info.innerHTML = user.showName() + showLanguage(BATTLE_TEXTS.freezeSolid);
                unable = true;
            }
            if(user.status == 'sleep')
            {
                if(user.sleepy >= 2 && CHANCE < 50)
                {
                    user.status = 'ok';
                    battle.info.innerHTML = user.showName() + showLanguage(BATTLE_TEXTS.wakingUp);
                    battle_updateHP();
                    time = 2;
                }
                else
                {
                    battle.info.innerHTML = user.showName() + showLanguage(BATTLE_TEXTS.isSleeping);
                    unable = true;
                }
            }
            if(unable){setTimeout(() => {battle_action(_whoNow + 1)}, battleActionCooldown);}
            else
            {
                setTimeout(function(){battle_move_settings(user,who,_whoNow,secondSide,sideTwo,DECISIONS);}, battleActionCooldown * (time - 1));
            }
        break;
    }
}

function battle_move_settings(user,who,_whoNow,secondSide,sideTwo,DECISIONS)
{
    const whitchMove = DECISIONS[1]*1;
    let move = whitchMove == -1 ? moveList[0] : user.moves[parseInt(DECISIONS[1])];
    if(user.temporaryStatus.hide.where == '' && user.temporaryStatus.waiting.why == '')
    {
        if(whitchMove >= 0)
        {
            user.ppUsed[whitchMove]++;
            if(who == 'ally')
            {
                user.objects.moveBars[whitchMove].style.width = user.actualPP(whitchMove,'percent %');
                battle.movesButtons[whitchMove].innerHTML = showLanguage(user.moves[whitchMove].name) + ' ' + user.actualPP(whitchMove,'fraction');
            }
        }
    }
    else
    {
        move = user.temporaryStatus.hide.nextMove;
    }
    battle.info.innerHTML = user.showName() + showLanguage(BATTLE_TEXTS.used) + showLanguage(move.name);
    let target, targetside;
    if(move.target == 'one opponent'){target = secondSide; targetside = sideTwo;}
    if(move.target == 'all opponents'){target = secondSide; targetside = sideTwo;}
    if(move.target == 'everyone'){target = secondSide; targetside = sideTwo;}
    if(move.target == 'self'){target = user; targetside = who;}
    if(move.target == 'one ally'){target = null; targetside = null;}
    if(move.target == 'all allies'){target = user; targetside = who;}
    
    setTimeout(function(){battle_useMove(move,user,target,who,targetside,_whoNow);}, battleActionCooldown);
}

function battle_end()
{
    for(let i=0;i<TEAM_COUNT;i++)
    {
        if(battleTeam.ally[i] != null)
        {
            for(let j=0;j<BATTLE_COPY_PROPERTIES.length;j++)
            {
                const p = BATTLE_COPY_PROPERTIES[j];
                if(p.array)
                {
                    for(let k=0;k<activeUser.team[i][p.what].length;k++)
                    {
                        activeUser.team[i][p.what][k] = battleTeam.ally[i][p.what][k];
                    }
                }
                else
                {
                    activeUser.team[i][p.what] = battleTeam.ally[i][p.what];
                }
            }
        }
    }

    battle = null;
    start();
}

function battle_useMove(_move,_user,_target,_userSide,_targetSide,_whoNow)
{
    let accuracy = _move.accuracy;
    let n; //for is there effect function
    let draw;
    if(accuracy == 0){accuracy = 1000;}
    if(_target == null){accuracy = 0;}
    if(_target.temporaryStatus.hide.where != '')
    {
        //... efekty trafienia mimo hide xD 
        accuracy = 0;
    }
    if(accuracy > Math.random() * 100)
    {
        let go = true;
        if(battle.activeFighter[_targetSide].protect)
        {
            battle.info.innerHTML = _target.name + showLanguage(BATTLE_TEXTS.blocked);
            setTimeout(() => {battle_action(_whoNow + 1)}, battleActionCooldown);
            go = false;
        }
        n = isThereEffect(_move,'two round');
        if(n >= 0 && _user.temporaryStatus.hide.where == '' && _move.effects[n].value.english != 'rest')
        {
            const THIS_EFFECT = _move.effects[n].value.english;
            let effectName = _move.effects[n].value.english;
            effectName = replaceAll(effectName, ' ', '_');
            switch(THIS_EFFECT)
            {
                case 'dig in hole': case 'fly high': case 'under water':
                    setTimeout(function(){battle.info.innerHTML = _user.showName() + showLanguage(BATTLE_TEXTS['hide_' + effectName]);}, battleActionCooldown);
                    _user.temporaryStatus.hide = {where: _move.effects[n].value.english, nextMove: _move};
                break;
                case 'sun light': 
                    if(battle.weather == 'sunny')
                    {
                        battle.order.splice(_whoNow, 0, _userSide);
                    }
                case 'waiting':
                    setTimeout(() => {battle.info.innerHTML = _user.snowName() + showLanguage(BATTLE_TEXTS['waiting_' + effectName]);}, battleActionCooldown);
                    _user.temporaryStatus.waiting = {why: _move.effects[n].value.english, nextMove: _move};
                break;
            }
            go = false;
            setTimeout(() => {battle_action(_whoNow + 1)}, battleActionCooldown * 2);
        }
        else
        {
            _user.temporaryStatus.waiting = {why: '', nextMove: ''};
            _user.temporaryStatus.hide = {where: '', nextMove: ''};
        }

        if(go)
        {
            let dmg = 0;
            let wasCriticalHit = false;
            if(_move.power > 0)
            {
                dmg = _move.power;
                n = isThereEffect(_move,'special event','ignores attack and deffence');
                draw = Math.random() * 100;
                if(n == -1 || _move.effects[n].chance <= draw)
                {
                    //dmg = (2/5 * _user.level + 2) * dmg/50
                    dmg /= 25;
                    if(_move.category == 'physical')
                    {
                        dmg *= _user.battle_sumStat('attack') / _target.battle_sumStat('defence');
                        if(_user.status == 'burn'){dmg *= 0.5;}
                        if(battle.shields[_targetSide].physical > 0){dmg *= 0.5;}
                    }
                    else
                    {
                        dmg *= _user.battle_sumStat('spAttack') / _target.battle_sumStat('spDefence');
                        if(battle.shields[_targetSide].special > 0){dmg *= 0.5;}
                    }
                    //targets...
                    if(hasItType(_user,'fire'))
                    {
                        if(battle.weather == 'rain'){dmg *= 0.5;}
                        if(battle.weather == 'sunny'){dmg *= 1.5;}
                    }
                    if(hasItType(_user,'water'))
                    {
                        if(battle.weather == 'rain'){dmg *= 1.5;}
                        if(battle.weather == 'sunny'){dmg *= 0.5;}
                    }
                    let chance = 6.25;
                    if(n = isThereEffect(_move, 'change cristal hit ratio') >= 0)
                    {
                        chance = _move.effects[n].value;
                    }
                    draw = Math.random() * 100;
                    if(draw < chance)
                    {
                        const LV = _user.level;
                        dmg *= (2 * LV + 5) / (LV + 5);
                        wasCriticalHit = true;
                    }
                    if(hasItType(_user,_move.type))
                    {
                        const STAB = _user.ability == 'adaptability'? 2: 1.5;
                        dmg *= STAB;
                    }
                }
            }
            //
            const e = _target.resistance(_move.type);
            dmg *= e;
            //
            if(e == 0){battle.info.innerHTML = showLanguage(BATTLE_TEXTS.noeffect);}
            //
            if(dmg > 0)
            {
                if(e < 1 && e > 0){battle.info.innerHTML = showLanguage(BATTLE_TEXTS.weakeffect);}
                if(e == 1){battle.info.innerHTML = "";}
                if(e > 1){battle.info.innerHTML = showLanguage(BATTLE_TEXTS.supereffect);}
                if(wasCriticalHit){battle.info.innerHTML += showLanguage(BATTLE_TEXTS.criticalHit);}
                //
                dmg = _target.hit(dmg);
                battle_updateHP();
            }
            //
            if(e > 0)
            {
                battle_effects_meanwhile(_move,_user,_target,_userSide,_targetSide, dmg);
                const timeout = _move.category == 'status' ? 0 : battleActionCooldown;
                setTimeout(() => {battle_effects_after(_move,_user,_target,_userSide,_targetSide, dmg, _whoNow, 0, true, false);}, timeout);
            }
            else
            {
                setTimeout(() => {battle_isSomebodyFaint(_whoNow);}, battleActionCooldown);
            }
        }
    }
    else
    {
        battle.info.innerHTML = showLanguage(BATTLE_TEXTS.missed);
        setTimeout(() => {battle_action(_whoNow + 1)}, battleActionCooldown);
    }
}

function battle_isSomebodyFaint(_whoNow)
{
    const AP = battleTeam.ally[battle.activeFighter.ally.pokemon]; //ally pokemon
    const OP = battleTeam.opponent[battle.activeFighter.opponent.pokemon]; //opponent pokemon

    if(AP.actualHP('number') > 0 && OP.actualHP('number') > 0)
    {
        if(battle.finishRound){battle.changeStatus('doSth');}
        else{setTimeout(() => {battle_action(_whoNow + 1)}, battleActionCooldown);}
    }
    
    if(AP.actualHP('number') > 0 && OP.actualHP('number') <= 0)
    {
        battle.info.innerHTML = OP.showName() + showLanguage(BATTLE_TEXTS.fainted);
        let exp = OP.baseExp * OP.level / 7;
        //if trainer battle x1.5
        if(AP.OT != activeUser.name){exp *= 1.5;}
        //if mamy lucky egg x1.5
        //if affection x1.2
        
        AP.expirience += Math.ceil(exp);
        
        for(let i=0;i<3;i++)
        {
            if(AP.EVYeld[i] > 0)
            {
                if(AP.sumEV() < MAX_EV_SUM && AP.EV[i] < MAX_EV)
                {
                    AP.EV[i] += 1;
                }
            }
        }
        
        setTimeout(function()
        {
            if(AP.expirience >=  AP.whenNextLevel())
            {
                battle.changeStatus('level up');
            }
            else
            {
                battle_end();
            }
        }, battleActionCooldown);
    }

    if(AP.actualHP('number') <= 0 && OP.actualHP('number') > 0)
    {
        battle.info.innerHTML = AP.showName() + showLanguage(BATTLE_TEXTS.fainted);
        setTimeout(() => {battle.changeStatus('next ally');},battleActionCooldown);
    }

    if(AP.actualHP('number') <= 0 && OP.actualHP('number') <= 0)
    {
        battle.info.innerHTML = showLanguage(BATTLE_TEXTS.bothFainted);
        setTimeout(() =>
        {
            let noAllyLeft = true;
            for(let i=0;i<TEAM_COUNT;i++)
            {
                if(battleTeam.ally[i] != null)
                {
                    if(battleTeam.ally[i].actualHP('number') > 0)
                    {
                        noAllyLeft = false;
                        document.getElementById('pokemonTeam_' + i).classList.add('activeButton');
                    }
                }
            }
            if(noAllyLeft){battle_lose();}
            else{battle_end()}
        }, battleActionCooldown);
    }
}

function battle_lose()
{
    okno.innerHTML = '<img src=\'' + waitingImageUrl + '\'>';
    let data = new FormData();
    data.append('which', 2);
    sendRequest(function(_RES)
    {
        changeMap(_RES,3,3);
        battle_end();
    },'php/database.php?base=maps',data);

}

function battle_effects_meanwhile(_move,_user,_target,_userSide,_targetSide,_dmg)
{
    for(let i=0;i<_move.effects.length;i++)
    {
        const EFFECT = _move.effects[i];
        let chance = EFFECT.chance;
        let target = _target;
        if(EFFECT.whom.english == 'user'){target = _user;}

        if(chance == 0){chance = 1000;}
        if(chance > randomInt(100))
        {
            switch(EFFECT.name.english)
            {
                case 'recoil damage':
                    target.hit(_dmg * EFFECT.value / 100);
                break;
                case 'drain HP':
                    target.heal(_dmg * EFFECT.value / 100);
                break;
                case 'change status':
                    if(EFFECT.value.english == 'flinch'){target.temporaryStatus.flinch = true;}
                break;
            }
        }
    }

    battle_updateHP();
}

function battle_effects_after(_move,_user,_target,_userSide,_targetSide, _dmg, _whoNow, _whichEffect, fail, anything)
{
    if(_move.effects[_whichEffect] != undefined)
    {
        anything = true;
        const EFFECT = _move.effects[_whichEffect];
        let chance = EFFECT.chance;
        let target = _target;
        let side = _targetSide;
        let canWeGo = true;
        if(EFFECT.whom.english == 'user' || EFFECT.whom.english == 'allies')
        {
            target = _user;
            side = _userSide;
        }
        
        if(chance == 0){chance = 1000;}
        if(chance > randomInt(100))
        {
            let text = '';
            switch(EFFECT.name.english)
            {
                case 'change status':
                {
                    let allIsOk = target.status == 'ok';
                    switch(EFFECT.value.english)
                    {
                        case 'ok':
                            fail = false;
                            text = target.showName();
                            if(target.status == 'ok')
                            {
                                text += BATTLE_TEXTS.isHealthy;
                            }
                            else
                            {
                                target.status = 'ok';
                                text += BATTLE_TEXTS.healed;
                            }
                            break;
                        case 'burn':
                            if(hasItType(target, 'fire')){allIsOk = false;}
                            if(battle.weather == 'rain'){allIsOk = false;}
                            if(allIsOk)
                            {
                                target.status = 'burn';
                                fail = false;
                                text = target.showName() + showLanguage(BATTLE_TEXTS.burned);
                            }
                            break;
                        case 'freeze':
                            if(hasItType(target, 'ice')){allIsOk = false;}
                            if(battle.weather == 'sunny'){allIsOk = false;}
                            if(allIsOk)
                            {
                                target.status = 'freeze';
                                fail = false;
                                text = target.showName() + showLanguage(BATTLE_TEXTS.freezed);
                            }
                            break;
                        case 'paralysis':
                            if(hasItType(target, 'electric')){allIsOk = false;}
                            if(battle.weather == 'sandstorm'){allIsOk = false;}
                            if(target.status == 'ok')
                            {
                                target.status = 'paralysis';
                                fail = false;
                                text = target.showName() + showLanguage(BATTLE_TEXTS.paralyzed);
                            }
                            break;
                        case 'poison':
                            if(hasItType(target, 'poison')){allIsOk = false;}
                            if(allIsOk)
                            {
                                target.status = 'poison';
                                fail = false;
                                text = target.showName() + showLanguage(BATTLE_TEXTS.poisoned);
                            }
                            break;
                        case 'sleep': 
                            if(battle.weather == 'storm'){allIsOk = false;}
                            if(allIsOk)
                            {
                                target.status = 'sleep';
                                target.sleepy = 0;
                                fail = false;
                                text = target.showName() + showLanguage(BATTLE_TEXTS.sleepy);
                            }
                            break;
                    }

                    battle.activeFighter[_targetSide].status.innerHTML = "";
                    battle.activeFighter[_targetSide].status.appendChild(infoImage(target.status + "ed",20));
                } break;
                case 'special event':
                {
                    switch(EFFECT.value.english)
                    {
                        case 'return':
                            if(isAllyAvailable())
                            {
                                text = showLanguage(BATTLE_TEXTS.chooseAlly);
                                setTimeout(function(){battle.changeStatus('return');},battleActionCooldown);
                                canWeGo = false;
                            }
                        break;
                        case 'hit two times':
                            if(_move.accuracy > Math.random() * 100 || _move.accuracy == 0)
                            {
                                target.hit(_dmg);
                                battle_updateHP();
                            }
                        break;
                    }
                }
                break;
                case 'change attack': case 'change defence': case 'change spAttack': case 'change spDefence': case 'change speed':
                    const STAT = getStatNumberByName(EFFECT.name.english.slice(7));
                    target.changeStat(STAT, EFFECT.value);
                    fail = false;
                    text = showLanguage(POKEMON_STATS[STAT]);
                    if(EFFECT.value > 0){text += showLanguage(BATTLE_TEXTS.increse);}
                    else if(EFFECT.value < 0){text += showLanguage(BATTLE_TEXTS.decrese);}
                    else{text += showLanguage(BATTLE_TEXTS.reset);}
                break;
                case 'change random stat': 
                    const S = randomInt(4);
                    target.changeStat(S, EFFECT.value);
                    fail = false;
                    text = showLanguage(POKEMON_STATS[S + 1]);
                    if(EFFECT.value > 0){text += showLanguage(BATTLE_TEXTS.increse);}
                    else if(EFFECT.value < 0){text += showLanguage(BATTLE_TEXTS.decrese);}
                    else{text += showLanguage(BATTLE_TEXTS.reset);}
                break;
                case 'change every stat':
                    for(let j=0; j<5;j++){target.changeStat(j), EFFECT.value}
                    fail = false;
                    text = showLanguage(BATTLE_TEXTS.everyStat);
                    if(EFFECT.value > 0){text += showLanguage(BATTLE_TEXTS.increse);}
                    else if(EFFECT.value < 0){text += showLanguage(BATTLE_TEXTS.decrese);}
                    else{text += showLanguage(BATTLE_TEXTS.reset);}
                break;
                case 'recover HP':
                    const FIRST_VALUE = target.actualHP('number');
                    target.heal(EFFECT.value * target.battle_sumStat('hp'));
                    const DIFFERENCE = target.actualHP('number') - FIRST_VALUE;
                    text = target.showName() + showLanguage(BATTLE_TEXTS.recovered) + DIFFERENCE + " HP";
                    fail = false;
                break;
                case 'shield':
                switch(EFFECT.value.english)
                {
                    case 'completely':
                        battle.activeFighter[side].protect = true;
                        fail = false;
                        text = target.showName() + showLanguage(BATTLE_TEXTS.protects);
                    break;
                    case 'physical':
                        battle.shields.physical = 5;
                        fail = false;
                        text = showLanguage(BATTLE_TEXTS.shieldUp_physical);
                    break;
                    case 'special':
                        battle.shields.special = 5;
                        fail = false;
                        text = showLanguage(BATTLE_TEXTS.shieldUp_special);
                    break;
                    case 'destruct physical':
                        battle.shields.physical = 0;
                        fail = false;
                        text = showLanguage(BATTLE_TEXTS.shieldBreak_physical);
                    break;
                    case 'destruct special':
                        battle.shields.special = 0;
                        fail = false;
                        text = showLanguage(BATTLE_TEXTS.shieldBreak_special);
                    break;
                        
                }
                break;
                case 'change weather':
                    let weather = EFFECT.value.english;
                    if(battle.weather != weather)
                    {
                        battle.weather = weather;
                        battle.waterTime = 5;
                        let cure = 'none';
                        switch(weather)
                        {
                            case 'sunny': cure = 'freeze'; break;
                            case 'rain': cure = 'burn'; break;
                            case 'storm': cure = 'sleep'; break;
                            case 'sandstorm': cure = 'paralysis'; break;
                        }
                        if(battleTeam.ally[battle.activeFighter.ally.pokemon].status == cure){battleTeam.ally[battle.activeFighter.ally.pokemon].status = 'ok'}
                        if(battleTeam.opponent[battle.activeFighter.opponent.pokemon].status == cure){battleTeam.opponent[battle.activeFighter.opponent.pokemon].status = 'ok'}
                    }
                break;
                case 'trap':
                    const VALUE = replaceAll(EFFECT.value.english, ' ', '_');
                    console.log(EFFECT.value.english, VALUE);
                    switch(VALUE)
                    {
                        case 'bind': case 'flame_weels': case 'leech': case 'unable_to_use_status': 
                            target.temporaryStatus.traps[VALUE] = 5;
                            //text
                        break;

                        case 'stealth_rock': case 'spikes': case 'poison_spikes': case 'sticky_web':
                            battle.traps.targetside[VALUE] ++;
                            //text
                        break;
                        
                        case 'destruct_all': break;
                    }
                break;
            }
            if(!fail){setTimeout(function(){battle.info.innerHTML = text}, battleActionCooldown);}
            battle_updateHP();
        }

        if(canWeGo){setTimeout(function(){battle_effects_after(_move,_user,_target,_userSide,_targetSide, _dmg, _whoNow, _whichEffect + 1, fail, anything);}, battleActionCooldown);}
    }
    else
    {
        if(_move.category == 'status')
        {
            if(anything)
            {
                if(fail){battle.info.innerHTML = showLanguage(BATTLE_TEXTS.fail);}
            }
            else{battle.info.innerHTML = showLanguage(BATTLE_TEXTS.nothing);}
        }
        
        battle_isSomebodyFaint(_whoNow);
    }
}

function battle_finishRound(_whoNow)
{
    battle.changeStatus('finish');
    battle.finishRound = true;
    let events = 0;

    for(let i = 0; i < 2; i++)
    {
        let firstSide = 'ally';
        let secondSide = 'opponent';
        if(i == 1)
        {
            firstSide = 'opponent';
            secondSide = 'ally';
        }

        const POKEMON = battleTeam[firstSide][battle.activeFighter[firstSide].pokemon];
        const SECOND_POKEMON = battleTeam[secondSide][battle.activeFighter[secondSide].pokemon];

        let temporaryStatusToFalse = ['flinch', 'protect'];
        let shieldsToDecrease = ['physical', 'special'];
        let statusDamage = 
        [
            {status: 'burn', text: 'burnCouses'},
            {status: 'poison', text: 'poisonCouses'}
        ];
        let weatherDamage = 
        [
            {weather: 'hail', immune: 'ice', text: 'hailHit'},
            {weather: 'sandstorm', immune: 'ground', text: 'sandstormHit'}
        ];
        let trapDamage =
        [
            {trap: 'bind', resistance: 'normal', text: 'bindhit', drain: false},
            {trap: 'flame', resistance: 'fire', text: 'flamedhit', drain: false},
            {trap: 'leech', resistance: 'grass', text: 'drained', drain: true}
        ]

        if(POKEMON.status == 'sleep'){POKEMON.sleepy++}

        for(let j = 0; j < temporaryStatusToFalse.length; j++)
        {
            POKEMON.temporaryStatus[temporaryStatusToFalse[j]] = false;
        }
        for(let j = 0; j < shieldsToDecrease.length; j++)
        {
            if(battle.shields[firstSide].physical > 0){battle.shields[firstSide][shieldsToDecrease[j]]--}
        }
        for(let j = 0; j < statusDamage.length; j++)
        {
            if(POKEMON.status == statusDamage[j].status && POKEMON.actualHP('number') > 0)
            {
                setTimeout(function()
                {
                    POKEMON.hit(POKEMON.battle_sumStat('hp') / 16);
                    battle_updateHP();
                    battle.info.innerHTML = POKEMON.showName() + showLanguage(BATTLE_TEXTS[statusDamage[j].text]);
                }, battleActionCooldown * events++);
            }
        }
        for(let j = 0; j < weatherDamage.length; j++)
        {
            if(battle.weather == weatherDamage[j].weather)
            {
                if(!hasItType[POKEMON, weatherDamage[j].immune])
                {
                    setTimeout(function()
                    {
                        POKEMON.hit(POKEMON.battle_sumStat('hp') / 16);
                        battle_updateHP();
                        battle.info.innerHTML = POKEMON.showName() + showLanguage(BATTLE_TEXTS[weatherDamage[j].text]);
                    }, battleActionCooldown * events++);
                }
            }
        }
        for(let j = 0; j < trapDamage.length; j++)
        {
            if(POKEMON.temporaryStatus.traps[trapDamage[j].trap] > 0)
            {
                setTimeout(function()
                {
                    const HIT = POKEMON.battle_sumStat('hp') / 8 * POKEMON.resistance(trapDamage[j].resistance);

                    POKEMON.hit(HIT);
                    if(trapDamage[j].drain)
                    {
                        SECOND_POKEMON.heal(HIT);
                        battle.info.innerHTML = SECOND_POKEMON.showName() + showLanguage(BATTLE_TEXTS.drained) + POKEMON.showName();
                    }
                    else
                    {
                        battle.info.innerHTML = POKEMON.showName() + showLanguage(BATTLE_TEXTS[trapDamage[j].text]);
                        AP.temporaryStatus.traps[trapDamage[j].trap]--;
                    }

                    battle_updateHP();
                }, battleActionCooldown * events++);
            }
        }
    }
    
    setTimeout(() => {battle_isSomebodyFaint(_whoNow)}, battleActionCooldown * (events + 1));
}

function battle_updateHP()
{
    battle.activeFighter.ally.lifeBar.style.width = battleTeam.ally[battle.activeFighter.ally.pokemon].actualHP('percent %');
    battle.activeFighter.ally.status.innerHTML = "";
    battle.activeFighter.ally.status.appendChild(infoImage(battleTeam.ally[battle.activeFighter.ally.pokemon].status + "ed",SIZE_OF_BATTLE_POKEMON_STATUS));
    
    if(battle.activeFighter.opponent.pokemon > -1)
    {
        battle.activeFighter.opponent.lifeBar.style.width = battleTeam.opponent[battle.activeFighter.opponent.pokemon].actualHP('percent %');
        battle.activeFighter.opponent.status.innerHTML = "";
        battle.activeFighter.opponent.status.appendChild(infoImage(battleTeam.opponent[battle.activeFighter.opponent.pokemon].status + "ed",SIZE_OF_BATTLE_POKEMON_STATUS));
    }

    for(let i=0;i<TEAM_COUNT;i++)
    {
        if(battleTeam.ally[i] != null){battleTeam.ally[i].objects.lifeBar.style.width = battleTeam.ally[i].actualHP('percent %');}
    }
}

function isAllyAvailable()
{
    let isAllyLeft = false;
    for(let i=0;i<TEAM_COUNT;i++)
    {
        if(battleTeam.ally[i] != null)
        {
            if(battleTeam.ally[i].actualHP('number') > 0 && battle.activeFighter.ally.pokemon != i)
            {
                isAllyLeft = true;
                document.getElementById('pokemonTeam_' + i).classList.add('activeButton');
            }
        }
    }

    return isAllyLeft;
}

function isThereEffect(_move, _effect, _value = '')
{
    for(let i = 0; i < _move.effects.length; i++)
    {
        if(_move.effects[i].name.english == _effect)
        {
            if(_value == ''){return i;}
            else if(_move.effects[i].value.english == _value){return i;}
        }
    }

    return -1;
}

function hasItType(_pokemon, _type)
{
    let type = getTypeNumberByName(_type);
    if(_pokemon.types[0] == type){return true;}
    if(_pokemon.types[1] == type){return true;}
    return false;
}

function replaceAll(_word, _search, _replace)
{
    while(_word.indexOf(_search) >= 0)
    {
        _word = _word.replace(_search, _replace);
    }
    return _word;
}