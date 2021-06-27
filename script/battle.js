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
    battle_battleField.activeFighter.ally.level = ally_level;

    let ally_name = newElement('div',dataRow);
    battle_battleField.activeFighter.ally.name = ally_name;

    let ally_gender = newElement('div',dataRow);
    battle_battleField.activeFighter.ally.gender = ally_gender;

    let ally_status = newElement('div',dataRow);
    battle_battleField.activeFighter.ally.status = ally_status;

}

function randomWildPokemon(level)
{
    return new Pokemon(randomInt(pokemonList.length - 1), level, -1, -1, 0, 0, -1, [1,0,0,0],'',-1,-1,'wild',0,0,0,0);
}