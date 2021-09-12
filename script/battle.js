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

    for(let i=0;i<TEAM_COUNT;i++){battle_opponentTeam[i] = _opponentTeam[i];}
    
    okno.innerHTML = '';
    
    let battleWindow_container = newElement('div',okno,'','battleWindow_container');
    let pokemonTeam = newElement('div',battleWindow_container,'pokemonTeam');
    
    let team = activeUser.team;
    for(let i=0;i<TEAM_COUNT;i++)
    {
        let pokemon = newElement('div',pokemonTeam, '', 'pokemonTeam_' + i);

        if(team[i] == null)
        {
            battle_allyTeam[i] = null;
        }
        else
        {
            battle_allyTeam[i] = new BattlePokemon(team[i]);
            
            let data = newElement('div',pokemon,'pokemonData');            
            data.appendChild(pokemonImage(team[i].name,20));
            
            let name = newElement('p',data);
            name.innerHTML = team[i].showName() + ' ' + team[i].showGender();
            
            let lifebar_container = newElement('div',pokemon, 'lifeBar')
            let lifebar = newElement('div',lifebar_container);
            lifebar.style.width = team[i].actualHP('percent %');
            // lifebar.innerHTML = team[i].actualHP('fraction');
            battle_allyTeam[i].objects.lifeBar = lifebar;
            
            let moveBars = newElement('div',pokemon,'moveBarsContainer');

            for(let j=0;j<4;j++)
            {
                let moveBar = newElement('div',moveBars,'moveBar');
                let moveBar_value = newElement('div',moveBar);
                moveBar_value.style.width = battle_allyTeam[i].actualPP(j,'percent %');
                battle_allyTeam[i].objects.moveBars[j] = moveBar_value;
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
                if(battle_allyTeam[i].actualHP('number') > 0){_who = i; break;}
            }
        } 
    }

    const F = battle.activeFighter[_side];
    F.pokemon = _who;
    const DATA = eval('battle_' + _side + 'Team')[_who];
    F.lifeBar.style.width = DATA.actualHP('percent %');
    F.level.innerHTML = DATA.level;
    F.name.innerHTML = DATA.showName();
    F.gender.innerHTML = DATA.showGender();
    F.status.innerHTML = DATA.status;
    F.image.innerHTML = '';
    F.image.appendChild(pokemonImage(DATA.name));

    if(_side == 'ally')
    {
        for(i=0;i<4;i++)
        {
            if(DATA.actualPP(i,'number') == 0)
            {
                battle.movesButtons[i].innerHTML = moveList[0].name[language];
            }
            else
            {
                battle.movesButtons[i].innerHTML = DATA.moves[i].name[language] + ' ' + DATA.actualPP(i,'fraction');
            }
        }
    }

    battle.info.innerHTML = F.name.innerHTML + BATTLE_TEXTS.go.language();
}

function battle_info(_what)
{
    if(battle.status != 'doSth' && battle.status != 'choose ally'){return false;}
    const whats = _what.split(' ');
    const P = battle_allyTeam[battle.activeFighter.ally.pokemon];
    
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
            info.innerHTML = BATTLE_TEXTS.use.language() + move.name[language];
            info.appendChild(infoImage(POKEMON_TYPES[move.type].english, 20));
            info.innerHTML += BATTLE_TEXTS.power.language() + move.power;
            info.innerHTML += BATTLE_TEXTS.acc.language() + move.accuracy;
        } break;
        case 'run': info = BATTLE_TEXTS.run.language(); break;
        case 'team':
        {
            if(battle.activeFighter.ally.pokemon == whats[1]){info = BATTLE_TEXTS.inBattle.language()}
            else
            {
                const pokemon = battle_allyTeam[whats[1]];
                info.innerHTML = BATTLE_TEXTS.switch.language() + pokemon.name + BATTLE_TEXTS.level.language() + pokemon.level;
                info.innerHTML += BATTLE_TEXTS.type.language() + POKEMON_TYPES[pokemon.types[0]].language();
                if(pokemon.types[1] > 0){info.innerHTML += '/' + POKEMON_TYPES[pokemon.types[1]].language();}
                info.innerHTML += BATTLE_TEXTS.moves.language();
                for(let i=0;i<4;i++)
                {
                    if(pokemon.moves[i] != 0){info.innerHTML += pokemon.moves[i].name[language] + ', ';}
                }
            }
        }
    }
}

function battle_decide(_what)
{
    if(battle.status != 'doSth' && battle.status != 'choose ally'){return false;}
    
    const WHATS = _what.split(' ');
    const active = battle.activeFighter.ally.pokemon;
    switch(WHATS[0])
    {
        case 'run': battle.decision.ally = _what; break;
        case 'useMove':
        {
            const pokemon = battle_allyTeam[active];
            if(pokemon.moves[WHATS[1]] == 0){battle.decision.ally = 'useMove -1';}
            else if(pokemon.actualPP(WHATS[1],'number') <= 0){battle.decision.ally = 'useMove -1';}
            else{battle.decision.ally = _what;}
        } break;
        case 'changeAlly':
        {
            const pokemon = battle_allyTeam[WHATS[1]];
            if(WHATS[1] == active){return false;}
            if(pokemon.actualHP('number') <= 0){return false;}
            battle.decision.ally = _what;
        } break;
    }

    battle.changeStatus('opponent move');
}

function battle_tactic()
{
    const PKMN = battle_opponentTeam[battle.activeFighter.opponent.pokemon];
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

    battle.changeStatus('who first');
}

function battle_action(_whoNow)
{
    if(battle.order[_whoNow] == undefined){battle_finishRound(_whoNow); return false;}

    const who = battle.order[_whoNow];
    const user = eval('battle_' + who + 'Team')[battle.activeFighter[who].pokemon];
    const secondSide = who == 'ally' ? battle_opponentTeam[battle.activeFighter.opponent.pokemon] : battle_allyTeam[battle.activeFighter.ally.pokemon];
    const sideTwo = who == 'ally' ? 'opponent' : 'ally';
    const DECISIONS = battle.decision[who].split(' ');
    
    switch(DECISIONS[0])
    {
        case 'run':
            battle.info.innerHTML = BATTLE_TEXTS.runSuccess.language();
            setTimeout(function(){battle_end()},1000);
        break;
        case 'changeAlly':
                battle.info.innerHTML = user.name + BATTLE_TEXTS.comeBack.language();
                setTimeout(function(){battle_changeFighter(who,DECISIONS[1]);},1000);
                setTimeout(function(){battle_action(_whoNow + 1)},2000);
        break;
        case 'useMove':
            let unable = false;
            const X = randomInt(100); // chance of fully paralysis
            if(user.temporaryStatus.flinch)
            {
                battle.info.innerHTML = user.showName() + BATTLE_TEXTS.flinch.language();
                unable = true;
            }
            if(user.status == 'paralysis' && X < 25)
            {
                battle.info.innerHTML = user.showName() + BATTLE_TEXTS.fullyPar.language();
                unable = true;
            }
            if(user.status == 'freeze')
            {
                battle.info.innerHTML = user.showName() + BATTLE_TEXTS.freezeSolid.language();
                unable = true;
            }
            if(unable){setTimeout(() => {battle_action(_whoNow + 1)}, 1000);}
            else
            {
                const whitchMove = DECISIONS[1]*1;
                const move = whitchMove == -1 ? moveList[0] : user.moves[parseInt(DECISIONS[1])];
                if(whitchMove >= 0)
                {
                    user.ppUsed[whitchMove]++;
                    if(who == 'ally'){user.objects.moveBars[whitchMove].style.width = user.actualPP(whitchMove,'percent %');}
                }
                battle.info.innerHTML = user.showName() + BATTLE_TEXTS.used.language() + move.name[language];
                let target, targetside;
                if(move.target == 'one opponent'){target = secondSide; targetside = sideTwo;}
                if(move.target == 'all opponents'){target = secondSide; targetside = sideTwo;}
                if(move.target == 'everyone'){target = secondSide; targetside = sideTwo;}
                if(move.target == 'self'){target = user; targetside = who;}
                if(move.target == 'one ally'){target = null; targetside = null;}
                if(move.target == 'all allies'){target = user; targetside = who;}
                
                setTimeout(function(){battle_useMove(move,user,target,who,targetside,_whoNow)},1000);
            }
        break;
    }
}

function battle_end()
{
    for(let i=0;i<TEAM_COUNT;i++)
    {
        if(battle_allyTeam[i] != null)
        {
            for(let j=0;j<BATTLE_COPY_PROPERTIES.length;j++)
            {
                const p = BATTLE_COPY_PROPERTIES[j];
                if(p.array)
                {
                    for(let k=0;k<activeUser.team[i][p.what].length;k++)
                    {
                        activeUser.team[i][p.what][k] = battle_allyTeam[i][p.what][k];
                    }
                }
                else
                {
                    activeUser.team[i][p.what] = battle_allyTeam[i][p.what];
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
    if(accuracy == 0){accuracy = 1000;}
    if(accuracy > randomInt(100))
    {
        let dmg = 0;
        if(_move.power > 0)
        {
            //dmg = (2 * _user.level / 5) + 2
            dmg = 2;
            dmg *= _move.power / 50;
            if(_move.category == 'physical')
            {
                dmg *= _user.battle_sumStat('attack') / _target.battle_sumStat('defence');
                if(_user.status == 'burn'){dmg *= 0.5;}
            }
            else{dmg *= _user.battle_sumStat('spAttack') / _target.battle_sumStat('spDefence');}
            //targets...
            if(_user.types[0] == 2 || _user.types[1] == 2) //fire
            {
                if(battle.weather == 'rain'){dmg *= 0.5;}
                if(battle.weather == 'sun'){dmg *= 1.5;}
            }
            if(_user.types[0] == 3 || _user.types[1] == 3) // water
            {
                if(battle.weather == 'rain'){dmg *= 1.5;}
                if(battle.weather == 'sun'){dmg *= 0.5;}
            }
            //critical hit zostawię sobie na potem....
            if(_user.types[0] == _move.type || _user.types[1] == _move.type)
            {
                dmg *= 1.5; //stab
            }
        }
        
        let e = POKEMON_TYPES[_target.types[0]].resistance[_move.type];
        e *= POKEMON_TYPES[_target.types[1]].resistance[_move.type];
        dmg *= e;

        if(e == 0){battle.info.innerHTML = BATTLE_TEXTS.noeffect.language();}
        
        if(dmg > 0)
        {
            if(e < 1 && e > 0){battle.info.innerHTML = BATTLE_TEXTS.weakeffect.language() + e;}
            if(e == 1){battle.info.innerHTML = e;}
            if(e > 1){battle.info.innerHTML = BATTLE_TEXTS.supereffect.language() + e;}
            
            dmg = _target.hit(dmg);
            battle_updateHP();
            
        }
        
        battle_effects_meanwhile(_move,_user,_target,_userSide,_targetSide, dmg);
        let timeout = _move.category == 'status' ? 0 : 1000;
        setTimeout(() => {battle_effects_after(_move,_user,_target,_userSide,_targetSide, dmg, _whoNow);}, timeout);
    }
    else
    {
        battle.info.innerHTML = BATTLE_TEXTS.missed.language();
        setTimeout(() => {battle_action(_whoNow + 1)}, 1000);
    }
}

function battle_isSomebodyFaint(_whoNow)
{
    const AP = battle_allyTeam[battle.activeFighter.ally.pokemon]; //ally pokemon
    const OP = battle_opponentTeam[battle.activeFighter.opponent.pokemon]; //opponent pokemon

    if(AP.actualHP('number') > 0 && OP.actualHP('number') > 0)
    {
        if(battle.finishRound){battle.changeStatus('doSth');}
        else{setTimeout(() => {battle_action(_whoNow + 1)}, 1000);}
    }
    
    if(AP.actualHP('number') > 0 && OP.actualHP('number') <= 0)
    {
        battle.info.innerHTML = OP.showName() + BATTLE_TEXTS.fainted.language();
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
        },1000);
    }

    if(AP.actualHP('number') <= 0 && OP.actualHP('number') > 0)
    {
        battle.info.innerHTML = AP.showName() + BATTLE_TEXTS.fainted.language();
        setTimeout(() => {battle.changeStatus('next ally');},1000);
    }

    if(AP.actualHP('number') <= 0 && OP.actualHP('number') <= 0)
    {
        battle.info.innerHTML = BATTLE_TEXTS.bothFainted.language();
        setTimeout(() =>
        {
            let noAllyLeft = true;
            for(let i=0;i<TEAM_COUNT;i++)
            {
                if(battle_allyTeam[i] != null)
                {
                    if(battle_allyTeam[i].actualHP('number') > 0)
                    {
                        noAllyLeft = false;
                        document.getElementById('pokemonTeam_' + i).classList.add('activeButton');
                    }
                }
            }
            if(noAllyLeft){battle_lose();}
            else{battle_end()}
        }, 1000);
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

function battle_effects_meanwhile(_move,_user,_target,_userSide,_targetSide, _dmg)
{
    for(let i=0;i<_move.effects.length;i++)
    {
        const EFFECT = _move.effects[i];
        let chance = EFFECT.chance;
        if(chance == 0){chance = 1000;}
        if(chance > randomInt(100))
        {
            switch(EFFECT.name.english)
            {
                case 'recoil damage':
                {
                    _user.hit(_dmg * EFFECT.value / 100);
                } break;
                case 'drain HP':
                {
                    _user.heal(_dmg * EFFECT.value / 100);
                } break;
            }
        }
    }

    battle_updateHP();
}

function battle_effects_after(_move,_user,_target,_userSide,_targetSide, _dmg, _whoNow)
{
    let fail = true;
    let anything = false;
    let numberOfEffects = 0;
    
    for(let i=0;i<_move.effects.length;i++)
    {
        anything = true;
        const EFFECT = _move.effects[i];
        let chance = EFFECT.chance;
        let isMessage = true;
        if(chance == 0){chance = 1000;}
        if(chance > randomInt(100))
        {
            let text = '';
            switch(EFFECT.name.english)
            {
                case 'change status':
                {
                    let allIsOk = _target.status == 'ok';
                    switch(EFFECT.value.english)
                    {
                        case 'ok':
                            fail = false;
                            text = _target.showName();
                            if(_target.status == 'ok')
                            {
                                text += BATTLE_TEXTS.isHealthy;
                            }
                            else
                            {
                                _target.status = 'ok';
                                text += BATTLE_TEXTS.healed;
                            }
                            break;
                        case 'burn':
                            if(_target.types[0] == getTypeNumberByName('fire')){allIsOk = false;}
                            if(_target.types[1] == getTypeNumberByName('fire')){allIsOk = false;}
                            if(allIsOk)
                            {
                                _target.status = 'burn';
                                fail = false;
                                text = _target.showName() + BATTLE_TEXTS.burned.language();
                            }
                            break;
                        case 'freeze':
                            if(_target.types[0] == getTypeNumberByName('ice')){allIsOk = false;}
                            if(_target.types[1] == getTypeNumberByName('ice')){allIsOk = false;}
                            if(battle.weather == 'sunny'){allIsOk = false;}
                            if(allIsOk)
                            {
                                _target.status = 'freeze';
                                fail = false;
                                text = _target.showName() + BATTLE_TEXTS.freezed.language();
                            }
                            break;
                        case 'paralysis':
                            if(_target.types[0] == getTypeNumberByName('electric')){allIsOk = false;}
                            if(_target.types[1] == getTypeNumberByName('electric')){allIsOk = false;}
                            if(_target.status == 'ok')
                            {
                                _target.status = 'paralysis';
                                fail = false;
                                text = _target.showName() + BATTLE_TEXTS.paralyzed.language();
                            }
                            break;
                        case 'poison': if(allIsOk){_target.status = 'poison'; fail = false; text = _target.showName() + BATTLE_TEXTS.poisoned.language();} break;
                        case 'sleep': if(allIsOk){_target.status = 'sleep'; fail = false; text = _target.showName() + BATTLE_TEXTS.sleepy.language();} break;
                        case 'flinch':
                            if(true)
                            {
                                _target.temporaryStatus.flinch = true;
                                fail = false;
                                isMessage = false;
                            }
                            break;
                    }

                    battle.activeFighter[_targetSide].status.innerHTML = _target.status;
                } break;
                    case 'change attack':
                        _target.changeStat('attack', EFFECT.value);
                        fail = false;
                        text = POKEMON_STATS[2].language();
                        if(EFFECT.value > 0){text += BATTLE_TEXTS.increse.language();}
                        else if(EFFECT.value < 0){text += BATTLE_TEXTS.decrese.language();}
                        else{text += BATTLE_TEXTS.reset.language();}
                        break;
                    case 'change defence':
                        _target.changeStat('defence', EFFECT.value);
                        fail = false;
                        text = POKEMON_STATS[3].language();
                        if(EFFECT.value > 0){text += BATTLE_TEXTS.increse.language();}
                        else if(EFFECT.value < 0){text += BATTLE_TEXTS.decrese.language();}
                        else{text += BATTLE_TEXTS.reset.language();}
                        break;
                    case 'change sp attack':
                        _target.changeStat('sp attack', EFFECT.value);
                        fail = false;
                        text = POKEMON_STATS[4].language();
                        if(EFFECT.value > 0){text += BATTLE_TEXTS.increse.language();}
                        else if(EFFECT.value < 0){text += BATTLE_TEXTS.decrese.language();}
                        else{text += BATTLE_TEXTS.reset.language();}
                        break;
                    case 'change sp defence':
                        _target.changeStat('sp defence', EFFECT.value);
                        fail = false;
                        text = POKEMON_STATS[5].language();
                        if(EFFECT.value > 0){text += BATTLE_TEXTS.increse.language();}
                        else if(EFFECT.value < 0){text += BATTLE_TEXTS.decrese.language();}
                        else{text += BATTLE_TEXTS.reset.language();}
                        break;
                    case 'change speed':
                        _target.changeStat('speed', EFFECT.value);
                        fail = false;
                        text = POKEMON_STATS[6].language();
                        if(EFFECT.value > 0){text += BATTLE_TEXTS.increse.language();}
                        else if(EFFECT.value < 0){text += BATTLE_TEXTS.decrese.language();}
                        else{text += BATTLE_TEXTS.reset.language();}
                        break;
                    case 'change random stat': 
                        const S = randomInt(4);
                        _target.changeStat(S, EFFECT.value);
                        fail = false;
                        text = POKEMON_STATS[S + 1].language();
                        if(EFFECT.value > 0){text += BATTLE_TEXTS.increse.language();}
                        else if(EFFECT.value < 0){text += BATTLE_TEXTS.decrese.language();}
                        else{text += BATTLE_TEXTS.reset.language();}
                        break;
                    case 'change every stat':
                        for(let j=0; j<5;j++){_target.changeStat(j), EFFECT.value}
                        fail = false;
                        text = BATTLE_TEXTS.everyStat.language();
                        if(EFFECT.value > 0){text += BATTLE_TEXTS.increse.language();}
                        else if(EFFECT.value < 0){text += BATTLE_TEXTS.decrese.language();}
                        else{text += BATTLE_TEXTS.reset.language();}
                        break;
            }
            if(!fail && isMessage){setTimeout(function(){battle.info.innerHTML = text}, 1000 * numberOfEffects++);}
        }
    }

    if(_move.category == 'status')
    {
        if(anything)
        {
            if(fail){battle.info.innerHTML = BATTLE_TEXTS.fail.language();}
        }
        else{battle.info.innerHTML = BATTLE_TEXTS.nothing.language();}
    }
    

    setTimeout(function(){battle_isSomebodyFaint(_whoNow);}, 1000 * numberOfEffects);
}

function battle_finishRound(_whoNow)
{
    battle.changeStatus('finish');
    battle.finishRound = true;
    let events = 0;
    const AP = battle_allyTeam[battle.activeFighter.ally.pokemon]; //ally pokemon
    const OP = battle_opponentTeam[battle.activeFighter.opponent.pokemon]; //opponent pokemon

    AP.temporaryStatus.flinch = false;
    OP.temporaryStatus.flinch = false;
    
    if(AP.status == 'burn' && AP.actualHP('number') > 0)
    {
        setTimeout(function()
        {
            AP.hit(AP.battle_sumStat('hp') / 16);
            battle_updateHP();
            battle.info.innerHTML = AP.showName() + BATTLE_TEXTS.burnCouses.language();
        }, 1000 * events++);
    }
    if(OP.status == 'burn' && OP.actualHP('number') > 0)
    {
        setTimeout(function()
        {
            OP.hit(OP.battle_sumStat('hp') / 16);
            battle_updateHP();
            battle.info.innerHTML = OP.showName() + BATTLE_TEXTS.burnCouses.language();
        }, 1000 * events++);
    }
    setTimeout(() => {battle_isSomebodyFaint(_whoNow)}, 1000 * (events + 1));
}

function battle_updateHP()
{
    battle.activeFighter.ally.lifeBar.style.width = battle_allyTeam[battle.activeFighter.ally.pokemon].actualHP('percent %');
    battle.activeFighter.opponent.lifeBar.style.width = battle_opponentTeam[battle.activeFighter.opponent.pokemon].actualHP('percent %');
    for(let i=0;i<TEAM_COUNT;i++)
    {
        if(battle_allyTeam[i] != null){battle_allyTeam[i].objects.lifeBar.style.width = battle_allyTeam[i].actualHP('percent %');}
    }
}