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

    for(let i=0;i<6;i++){battle_opponentTeam[i] = _opponentTeam[i];}
    
    okno.innerHTML = '';
    
    let battleWindow_container = newElement('div',okno,'','battleWindow_container');
    let pokemonTeam = newElement('div',battleWindow_container,'pokemonTeam');
    
    let team = activeUser.team;
    for(let i=0;i<6;i++)
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
                battle_allyTeam[i].objects.moveBars[j] = moveBar;
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
    return new Pokemon(randomInt(pokemonList.length - 1), 1, -1, -1, 0, 0, -1, [1,0,0,0],'',-1,-1,'wild',0,0,0,0);
}

function battle_changeFighter(_side, _who)
{
    if(_who == undefined)
    {
        if(_side == 'opponent'){_who = 0;}
        else
        {
            for(let i=0;i<6;i++)
            {
                console.log('team ' + i,)
                console.log(battle_allyTeam[i].actualHP('number'));
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
    let info = '';

    switch(whats[0])
    {
        case 'move':
        {
            let move = P.moves[whats[1]];
            if(P.actualPP(whats[1],'number') <= 0){move = moveList[0];}
            info = BATTLE_TEXTS.use.language() + move.name[language] + BATTLE_TEXTS.type.language();
            info += POKEMON_TYPES[move.type].language() + BATTLE_TEXTS.power.language() + move.power;
            info += BATTLE_TEXTS.acc.language() + move.accuracy;
        } break;
        case 'run': info = BATTLE_TEXTS.run.language(); break;
        case 'team':
        {
            if(battle.activeFighter.ally.pokemon == whats[1]){info = BATTLE_TEXTS.inBattle.language()}
            else
            {
                const pokemon = battle_allyTeam[whats[1]];
                info = BATTLE_TEXTS.switch.language() + pokemon.name + BATTLE_TEXTS.level.language() + pokemon.level;
                info += BATTLE_TEXTS.type.language() + POKEMON_TYPES[pokemon.types[0]].language();
                if(pokemon.types[1] > 0){info += '/' + POKEMON_TYPES[pokemon.types[1]].language();}
                info += BATTLE_TEXTS.moves.language();
                for(let i=0;i<4;i++)
                {
                    if(pokemon.moves[i] != 0){info += pokemon.moves[i].name[language] + ', ';}
                }
            }
        }
    }

    battle.info.innerHTML = info;
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
    if(moves.length > 1){battle.decision.opponent = 'useMove ' + randomInt(moves.length);}

    battle.changeStatus('who first');
}

function battle_action(_whoNow)
{
    if(battle.order[_whoNow] == undefined){battle.changeStatus('doSth'); return false;}

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
            const move = DECISIONS[1] == -1 ? moveList[0] : user.moves[parseInt(DECISIONS[1])];
            if(DECISIONS[1]*1 >= 0)
            {
                user.ppUsed[DECISIONS[1]*1]++;
                if(who == 'ally'){user.objects.moveBars[[DECISIONS[1]*1]].style.width = user.actualPP([DECISIONS[1] * 1],'percent %');}
            }
            battle.info.innerHTML = user.name + BATTLE_TEXTS.used.language() + move.name[language];
            let target, targetside;
            if(move.target == 'one opponent'){target = secondSide; targetside = sideTwo;}
            if(move.target == 'all opponents'){target = secondSide; targetside = sideTwo;}
            if(move.target == 'everyone'){target = secondSide; targetside = sideTwo;}
            if(move.target == 'self'){target = user; targetside = who;}
            if(move.target == 'one ally'){target = null; targetside = null;}
            if(move.target == 'all allies'){target = user; targetside = who;}
            
            setTimeout(function(){battle_useMove(move,user,target,who,targetside,_whoNow)},1000)
        break;
    }
}

function battle_end()
{
    for(let i=0;i<6;i++)
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
    let dmg = 0;
    if(_move.power > 0)
    {
        //dmg = (2 * _user.level / 5) + 2
        dmg = 2;
        dmg *= _move.power / 50;
        if(_move.category == 'physical'){dmg *= _user.battle_sumStat('attack') / _target.battle_sumStat('defence');}
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
    console.log(e);
    e *= POKEMON_TYPES[_target.types[1]].resistance[_move.type];
    console.log(e);
    dmg *= e;
    
    dmg = Math.ceil(dmg);
    
    //effectysy które bendooooom
    if(e == 0){battle.info.innerHTML = BATTLE_TEXTS.noeffect.language();}

    if(dmg > 0)
    {
        if(e < 1 && e > 0){battle.info.innerHTML = BATTLE_TEXTS.weakeffect.language();}
        if(e == 1){battle.info.innerHTML = '';}
        if(e > 1){battle.info.innerHTML = BATTLE_TEXTS.supereffect.language();}
        if(dmg > _target.actualHP('number')){dmg = _target.actualHP('number');}
    
        _target.damage += dmg;
        if(_targetSide == 'ally'){_target.objects.lifeBar.style.width = _target.actualHP('percent %');}
        battle.activeFighter[_targetSide].lifeBar.style.width = _target.actualHP('percent %');
    }

    setTimeout(() => {battle_laterEffects(_move,_user,_target,_userSide,_targetSide,_whoNow)}, 1500);
}

function battle_laterEffects(_move,_user,_target,_userSide,_targetSide,_whoNow)
{
    if(_target.actualHP('number') <= 0)
    {
        battle.info.innerHTML = _target.showName() + BATTLE_TEXTS.fainted.language();
        console.log(_targetSide);
        if(_targetSide == 'opponent')
        {
            const P = battle_allyTeam[battle.activeFighter.ally.pokemon];
            let exp = _target.baseExp * _target.level / 7;
            //if trainer battle x1.5
            //if pokemon nie jest mój x1.5
            //if mamy lucky egg x1.5
            //if affection x1.2

            P.expirience += Math.ceil(exp);

            for(let i=0;i<3;i++)
            {
                if(_target.EVYeld[i] > 0)
                {
                    if(_target.sumEV() < MAX_EV_SUM && _target.EV[i] < MAX_EV)
                    {
                        _target.EV[i] += 1;
                    }
                }
            }
            
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
        }
        else{setTimeout(() => {battle.changeStatus('next ally');},1000);}
    }
    else
    {
        setTimeout(() => {battle_action(_whoNow + 1)}, 1000);
    }
}

function battle_lose()
{
    okno.innerHTML = '<img src=\'' + waitingImageUrl + '\'>';
    let data = new FormData();
    data.append('which', 2);
    sendRequest(function(_RES)
    {
        changeMap(_RES);
        actualPosition.x = 3;
        actualPosition.y = 3;
        start();
    },'php/database.php?base=maps',data);

}