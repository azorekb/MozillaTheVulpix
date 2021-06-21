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
    let container = document.createElement('div');
    okno.appendChild(container);
    
    let battleWindow_container = document.createElement('div');
    battleWindow_container.id = 'battleWindow_container';
    container.appendChild(battleWindow_container);

    let pokemonTeam = document.createElement('div');
    pokemonTeam.classList.add('pokemonTeam');
    battleWindow_container.appendChild(pokemonTeam);

    let team = activeUser.team;
    for(let i=0;i<6;i++)
    {
        
        let pokemon = document.createElement('div');
        pokemon.id = 'pokemonTeam_' + i;
        if(team[i] != null)
        {
            battle_allyTeam[i] = new BattlePokemon(team[i]);

            let data = document.createElement('div');
            data.classList.add('pokemonData');
            pokemon.appendChild(data);

            data.appendChild(pokemonImage(team[i].name));

            let name = document.createElement('p');
            name.innerHTML = team[i].name + ' ' + team[i].showGender();
            data.appendChild(name);

            let lifebar_container = document.createElement('div');
            lifebar_container.classList.add('lifeBar');
            pokemon.appendChild(lifebar_container);

            let lifebar = document.createElement('div');
            lifebar.style.width = team[i].actualHP('percent %');
            // lifebar.innerHTML = team[i].actualHP('fraction');
            battle_allyTeam[i].objects.lifebar = lifebar;
            lifebar_container.appendChild(lifebar);

        }
        else
        {
            battle_allyTeam[i] = null;
        }

        pokemonTeam.appendChild(pokemon);
    }




}

function randomWildPokemon(level)
{
    return new Pokemon(randomInt(pokemonList.length - 1), level, -1, -1, 0, 0, -1, [1,0,0,0],'',-1,-1,'wild',0,0,0,0);
}