function battle_start(_opponentTeam, _numberOfPokemon)
{
    activeWindow = 'unactive';
    
    //(...) efekty przejścia i takie tam
    if(_opponentTeam == null)
    {
        _opponentTeam = [0,0,0,0,0,0];
        switch(_numberOfPokemon)
        {
            case 6: _opponentTeam[5] = new BattlePokemon(randomWildPokemon(1));
            case 5: _opponentTeam[4] = new BattlePokemon(randomWildPokemon(1));
            case 4: _opponentTeam[3] = new BattlePokemon(randomWildPokemon(1));
            case 3: _opponentTeam[2] = new BattlePokemon(randomWildPokemon(1));
            case 2: _opponentTeam[1] = new BattlePokemon(randomWildPokemon(1));
            case 1: _opponentTeam[0] = new BattlePokemon(randomWildPokemon(1));
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

        if(team[i] != null)
        {
            battle_allyTeam[i] = new BattlePokemon(team[i]);
            
            let data = newElement('div',pokemon,'pokemonData');            
            data.appendChild(pokemonImage(team[i].name));
            
            let name = newElement('p',data);
            name.innerHTML = team[i].showName() + ' ' + team[i].showGender();
            
            let lifebar_container = newElement('div',pokemon, 'lifeBar')
            let lifebar = newElement('div',lifebar_container);
            lifebar.style.width = team[i].actualHP('percent %');
            // lifebar.innerHTML = team[i].actualHP('fraction');
            battle_allyTeam[i].objects.lifebar = lifebar;
            
            let moveBars = newElement('div',pokemon,'moveBarsContainer');

            for(let j=0;j<4;j++)
            {
                let moveBar = newElement('div',moveBars,'moveBar');
                let moveBar_value = newElement('div',moveBar);
                moveBar_value.style.width = battle_allyTeam[i].actualPP(j,'percent %');
            }
            
        }
        else
        {
            battle_allyTeam[i] = null;
        }
    }
    
    let container = newElement('div',battleWindow_container);
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
    runButton.onclick = function(){start();}
    runButton.innerHTML = 'RUN forest RUN';

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

    let movesPlace = newElement('div', container, 'movesPlace');
    battle.movePlace = movesPlace;

    for(let i=0;i<4;i++)
    {
        let moveButton = newElement('div', movesPlace, 'button big');
        moveButton.onclick = function(){battle_useMove(i);}
        battle.movesButtons[i] = moveButton;
    }

    let items_containter = newElement('div', container);
    items_containter.innerHTML = 'Tu będą itemki ... ';

    battle_changeFighter('ally');
    battle_changeFighter('opponent');
}

function randomWildPokemon(level)
{
    return new Pokemon(randomInt(pokemonList.length - 1), level, -1, -1, 0, 0, -1, [1,0,0,0],'',-1,-1,'wild',0,0,0,0);
}

function battle_changeFighter(_side, _who)
{
    if(_who == undefined){_who = 0}

    const F = battle.activeFighter[_side];
    F.pokemon = _who;
    const DATA = eval('battle_' + _side + 'Team')[_who];
    console.log('battle_' + _side + 'Team', DATA);
    F.lifeBar.style.width = DATA.actualHP('percent %');
    F.level.innerHTML = DATA.level;
    F.name.innerHTML = DATA.showName();
    F.gender.innerHTML = DATA.showGender();
    F.status.innerHTML = DATA.status;
    F.image.innerHTML = _who;

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
}