const TEST_TEXT = 
{
    no: {english: 'No.', polski: 'Nr'},
    pokemon: {english: 'Pokemon'},
    nick: {english: 'Nickname', polski: 'Imię'},
    move: {english: 'Move ', polski: 'Ruch '},
    ability: {english: 'Ability', polski: 'Umiejętność'},
    none: {english: 'None', polski: 'Brak'},
    lv: {english: 'Level', polski: 'Poziom'}
}

function openTest()
{
    worldmapContent.innerHTML = '';
    
    let teamTable = document.createElement('table');
    worldmapContent.appendChild(teamTable);
    teamTable.classList.add('testTable');
    teamTable.insertRow(0).insertCell(0).innerHTML = showLanguage(TEST_TEXT.no);
    teamTable.insertRow(1).insertCell(0).innerHTML = showLanguage(TEST_TEXT.pokemon);
    teamTable.insertRow(2).insertCell(0).innerHTML = showLanguage(TEST_TEXT.nick);
    teamTable.insertRow(3).insertCell(0).innerHTML = showLanguage(TEST_TEXT.move) + 1;
    teamTable.insertRow(4).insertCell(0).innerHTML = showLanguage(TEST_TEXT.move) + 2;
    teamTable.insertRow(5).insertCell(0).innerHTML = showLanguage(TEST_TEXT.move) + 3;
    teamTable.insertRow(6).insertCell(0).innerHTML = showLanguage(TEST_TEXT.move) + 4;
    teamTable.insertRow(7).insertCell(0).innerHTML = showLanguage(TEST_TEXT.ability);
    teamTable.insertRow(8).insertCell(0).innerHTML = showLanguage(TEST_TEXT.lv);

    for(let i = 1; i <= TEAM_COUNT; i++)
    {
        teamTable.rows[0].insertCell(i).innerHTML = i;
        const PKMN = activeUser.team[i - 1];

        let select = document.createElement('select');
        select.id = 'teamSet_pokemon_' + (i - 1);
        for(let j = 0; j <= pokemonList.length; j++)
        {
            let option = document.createElement('option');
            option.value = j;
            if(j == 0)
            {
                option.innerHTML = showLanguage(TEST_TEXT.none);
                if(PKMN == null){option.selected = true;}
            }
            else
            {
                option.innerHTML = pokemonList[j - 1].name;
                if(PKMN != null)
                {
                    if(PKMN.name == pokemonList[j - 1].name)
                    {
                        option.selected = true;
                    }
                }
            }
            select.appendChild(option);
        }
        teamTable.rows[1].insertCell(i).appendChild(select);

        let input = document.createElement('input');
        input.id = 'teamSet_nick_' + (i - 1);
        if(PKMN != null){input.value = PKMN.nick}
        teamTable.rows[2].insertCell(i).appendChild(input);

        for(let j = 0; j < POKEMON_MOVE_COUNT; j++)
        {
            select = document.createElement('select');
            select.id = 'teamSet_move_' + j + '_' + (i - 1);
            for(let k = 0; k < moveList.length; k++)
            {
                let option = document.createElement('option');
                option.value = k;
                option.innerHTML = showLanguage(moveList[k].name);
                if(PKMN != null)
                {
                    if(PKMN.moves[j] != 0 && PKMN.moves[j].name.english == moveList[k].name.english)
                    {
                        option.selected = true;
                    }
                }
                select.appendChild(option);
            }
            teamTable.rows[3 + j].insertCell(i).appendChild(select);
        }

        select = document.createElement('select');
        select.id = 'teamSet_ability_' + (i - 1);
        for(let j = 0; j < POKEMON_ABILITIES.length; j++)
        {
            let option = document.createElement('option');
            option.value = j;
            option.innerHTML = showLanguage(POKEMON_ABILITIES[j]);
            if(PKMN != null)
            {
                if(PKMN.ability == j)
                {
                    option.selected = true;
                }
            }
            select.appendChild(option);
        }
        teamTable.rows[7].insertCell(i).appendChild(select);
        
        input = document.createElement('input');
        input.type = 'number';
        input.id = 'teamSet_level_' + (i - 1);
        input.min = 1;
        input.max = 100;
        if(PKMN != null){input.value = PKMN.level;}
        else{input.value = 1;}
        teamTable.rows[8].insertCell(i).appendChild(input);
    }

    let ok = document.createElement('div');
    ok.onclick = test_change;
    ok.innerHTML = 'OK';
    ok.classList.add('button', 'test');
    let okContainer = document.createElement('div');
    okContainer.appendChild(ok);
    worldmapContent.appendChild(okContainer);

}

function test_change()
{
    for(let i = 0; i < TEAM_COUNT; i++)
    {
        const POKEMON = document.getElementById('teamSet_pokemon_' + i).value * 1;
        if(POKEMON == 0){activeUser.team[i] = null}
        else
        {
            const NICK = document.getElementById('teamSet_nick_' + i).value;
            const MOVES = 
            [
                document.getElementById('teamSet_move_0_' + i).value * 1,
                document.getElementById('teamSet_move_1_' + i).value * 1,
                document.getElementById('teamSet_move_2_' + i).value * 1,
                document.getElementById('teamSet_move_3_' + i).value * 1
            ];
            const ABILITY = document.getElementById('teamSet_ability_' + i).value * 1;
            const LEVEL = document.getElementById('teamSet_level_' + i).value * 1;

            activeUser.team[i] = new Pokemon(POKEMON - 1, LEVEL, -1, ABILITY, 0, 0, -1, MOVES, NICK, -1, -1, 'Szibi Snowpix', 0, 0);
        }
    }
}