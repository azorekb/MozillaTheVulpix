function admin_start()
{
    worldmapContent.innerHTML = '';
    let admin_conteiner = document.createElement('div');
    admin_conteiner.classList.add('adminContainer');
    admin_conteiner.id = 'admin_conteiner';
    worldmapContent.appendChild(admin_conteiner);

    let admin_list=document.createElement('div');
    admin_list.classList.add('adminList');
    admin_list.id = 'admin_list';
    admin_conteiner.appendChild(admin_list);

    for(let i=0;i<ADMIN_LIST_OF_TASKS.length;i++)
    {
        let task = document.createElement('div');
        task.classList.add('adminTask', 'button', 'medium');
        task.innerHTML = ADMIN_LIST_OF_TASKS[i].name[language];
        task.onclick=function(){eval(ADMIN_LIST_OF_TASKS[i].function)()}
        admin_list.appendChild(task);
    }

    let admin_content = document.createElement('div');
    admin_content.id = 'admin_content';
    admin_content.innerHTML = ADMIN_WARNINGS[2][language];
    admin_conteiner.appendChild(admin_content);

    activeWindow = 'admin';
}

// ===========================================================================
// =========================== POKEMON =======================================
// ===========================================================================

function adm_formPokemon()
{
    admin_content.innerHTML = '';
    let table = document.createElement('table');
    table.classList.add('admFormTable');
    let details = Object.keys(ADMIN_POKEMON_DETAILS);
    for(let i=0;i<details.length;i++)
    {
        const example = ['przykład: ','example: '];
        let input = document.createElement('input');
        input.classList.add('admInput');
        input.type = 'text';
        input.id = 'adm_form_'+details[i];
        input.oninput = function(){adm_changeValueByInput(this);}
        input.placeholder = example[language] + ADMIN_POKEMON_DETAILS[details[i]].example;
        // input.value = ADMIN_POKEMON_DETAILS[details[i]].example;
        
        table.insertRow(i).insertCell(0).innerHTML = ADMIN_POKEMON_DETAILS[details[i]].text[language];
        table.rows[i].insertCell(1).appendChild(input);
        table.rows[i].insertCell(2).innerHTML = ADMIN_POKEMON_DETAILS[details[i]].description[language];
    }
    table.insertRow(0).insertCell(0).colSpan = 3;
    table.rows[0].cells[0].innerHTML = '<font color=ff0000>' + ADMIN_WARNINGS[0][language] + '</font>';
    
    table.insertRow(0).insertCell(0).innerHTML = ADMIN_POKEMON_TEXTS.choosePKMN[language];
    
    let select = document.createElement('select');
    const POKEMON = Object.keys(POKEMON_LIST);

    for(let i=0;i<POKEMON.length;i++)
    {
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = POKEMON[i];
        select.append(option);
    } 

    select.id = 'adm_selectedPokemon';
    select.onchange = function(){adm_changeSelectedPokemon()};
    table.rows[0].insertCell(1).appendChild(select);
    
    let newPokemon = document.createElement('button');
    newPokemon.innerHTML = '+';
    newPokemon.id = 'adm_newPokemon';
    newPokemon.onclick=function(){adm_addPokemon();}
    table.rows[0].cells[1].appendChild(newPokemon);

    let createButton = document.createElement('button');
    createButton.innerHTML = ADMIN_POKEMON_TEXTS.createButton[language];
    createButton.id = 'adm_createButton';
    createButton.onclick=function(){adm_createPokemonCode();}
    table.rows[0].cells[1].appendChild(createButton);
    
    let paragraph = document.createElement('p');
    paragraph.id = 'adm_status';
    table.rows[0].insertCell(2).appendChild(paragraph);
    
    table.rows[0].insertCell(3).innerHTML = ADMIN_POKEMON_TEXTS.code[language];

    let createContent = document.createElement('textarea');
    createContent.id = 'adm_createContent';
    createContent.rows = 1;
    createContent.cols = 3;
    admin_content.appendChild(createContent);
    table.rows[1].insertCell(1).appendChild(createContent);
    table.rows[1].cells[1].rowSpan = details.length + 1;
    table.rows[1].cells[1].style.verticalAlign = 'top';

    admin_content.appendChild(table);

    adm_changeSelectedPokemon();
}

function adm_changeValueByInput(_input)
{
    const DETAIL = _input.id.split('adm_form_')[1];
    const PKMN_NUMBER = adm_selectedPokemon.value;
    const POKEMON = adm_selectedPokemon[PKMN_NUMBER].innerHTML;

    let values = _input.value.split(',');
    values.push('');
    values.push('');

    switch(DETAIL)
    {
        case 'name': 
        {
            const INDEX = Object.keys(POKEMON_LIST).indexOf(_input.value);
            let disable = false;

            if(_input.value.indexOf(' ') >= 0){disable = true; console.log('nazwa zawiera spacje');}
            if(INDEX >= 0 && INDEX != PKMN_NUMBER){disable = true; console.log('nazwa się powtarza: ', INDEX, PKMN_NUMBER);}
            if(_input.value == ''){disable = true; console.log('nazwa jest pusta');}
            
            Object.keys(ADMIN_POKEMON_DETAILS).forEach(detail => {
                if(detail != 'name')
                document.getElementById('adm_form_' + detail).disabled = disable;
            });
            adm_createButton.disabled = disable;

            if(disable){return false;}
            if(POKEMON == _input.value){return true;}
            
            adm_selectedPokemon[PKMN_NUMBER].innerHTML = _input.value;

            POKEMON_LIST[_input.value] = new Pokemon_list(
                POKEMON_LIST[POKEMON].no,
                POKEMON_LIST[POKEMON].types.first,
                POKEMON_LIST[POKEMON].types.second,
                POKEMON_LIST[POKEMON].abilities.first,
                POKEMON_LIST[POKEMON].abilities.second,
                POKEMON_LIST[POKEMON].abilities.hidden,
                POKEMON_LIST[POKEMON].EVYeld,
                POKEMON_LIST[POKEMON].catchRate,
                POKEMON_LIST[POKEMON].baseExp,
                POKEMON_LIST[POKEMON].growthExp,
                POKEMON_LIST[POKEMON].femaleRate,
                POKEMON_LIST[POKEMON].eggGroup,
                POKEMON_LIST[POKEMON].eggCycles,
                POKEMON_LIST[POKEMON].baseStats.hp,
                POKEMON_LIST[POKEMON].baseStats.attack,
                POKEMON_LIST[POKEMON].baseStats.defence,
                POKEMON_LIST[POKEMON].baseStats.spAttack,
                POKEMON_LIST[POKEMON].baseStats.spDefence,
                POKEMON_LIST[POKEMON].baseStats.speed,
                POKEMON_LIST[POKEMON].preevolution.spiece,
                POKEMON_LIST[POKEMON].preevolution.method,
                POKEMON_LIST[POKEMON].preevolution.value,
                POKEMON_LIST[POKEMON].height,
                POKEMON_LIST[POKEMON].weight
                );
                
            delete POKEMON_LIST[POKEMON];
            // console.log(POKEMON_LIST);
        }
        break;
          
        case 'no': case 'catchRate': case 'baseExp': case 'femaleRate': case 'eggCycles': case 'height':
        case 'weight': POKEMON_LIST[POKEMON][DETAIL] = _input.value * 1; break;
        
        case 'growthExp':  case 'eggGroup': POKEMON_LIST[POKEMON][DETAIL] = _input.value;
        

        case 'EVYeld':
        {
            values.pop(); values.pop();
            POKEMON_LIST[POKEMON][DETAIL] = values; break;
        } 
          
        case 'abilities': POKEMON_LIST[POKEMON].abilities.hidden = values[2]; 
        case 'types': POKEMON_LIST[POKEMON][DETAIL].first = values[0]; POKEMON_LIST[POKEMON][DETAIL].second = values[1]; break;
        case 'baseStats_hp': case 'baseStats_attack': case 'baseStats_defence': case 'baseStats_spAttack': case 'baseStats_spDefence':
        case 'baseStats_speed' : POKEMON_LIST[POKEMON].baseStats[DETAIL.split('_')[1]] = _input.value * 1; break;
        case 'preevolution_specie': case 'preevolution_method':
        case 'preevolution_value': POKEMON_LIST[POKEMON].preevolution[DETAIL.split('_')[1]] = _input.value; break;
    }
}

function adm_changeSelectedPokemon()
{
    const DETAILS = Object.keys(ADMIN_POKEMON_DETAILS);
    const SELECTED_POKEMON = adm_selectedPokemon.value;
    const SELECTED_POKEMON_NAME = adm_selectedPokemon[SELECTED_POKEMON].innerHTML;
    const POKEMON = POKEMON_LIST[SELECTED_POKEMON_NAME];
    for(let i=0;i<DETAILS.length;i++)
    {
        document.getElementById('adm_form_' + DETAILS[i]).value = adm_getPokemonDetailsValue(DETAILS[i],POKEMON,SELECTED_POKEMON_NAME);
    }
    Object.keys(ADMIN_POKEMON_DETAILS).forEach(detail => {
        if(detail != 'name')
        document.getElementById('adm_form_' + detail).disabled = false;
    });
    adm_createButton.disabled = false;
}

function adm_getPokemonDetailsValue(_detail,_pokemon,_pokemonName)
{
    let value;
    switch(_detail)
    {
        case 'name': value = _pokemonName; break;

        case 'no': case 'EVYeld': case 'catchRate': case 'baseExp': case 'growthExp': case 'femaleRate': case 'eggGroup': case 'eggCycles': case 'height':
        case 'weight': value = _pokemon[_detail]; break;
        
        case 'types': value = _pokemon.types.first + ',' + _pokemon.types.second; break;

        case 'abilities': value = _pokemon.abilities.first + ',' + _pokemon.abilities.second + ',' + _pokemon.abilities.hidden; break;

        case 'baseStats_hp': case 'baseStats_attack': case 'baseStats_defence': case 'baseStats_spAttack': case 'baseStats_spDefence':
        case 'baseStats_speed' : case 'preevolution_specie': case 'preevolution_method':
        case 'preevolution_value': value = _pokemon[_detail.split('_')[0]][_detail.split('_')[1]]; break;
    }

    return value;
}

function adm_addPokemon()
{
    let option = document.createElement('option');
    option.value = adm_selectedPokemon.length;
    option.innerHTML = 'new_pokemon';
    option.selected = true;
    adm_selectedPokemon.appendChild(option);

    POKEMON_LIST.new_pokemon = new Pokemon_list('','','','','','',[''],'','','','','','','','','','','','','','','','','');

    adm_changeSelectedPokemon();
}

function adm_createPokemonCode()
{
    noErrors = true;
    let details = Object.keys(ADMIN_POKEMON_DETAILS);
    adm_add('make it clear');
    const pokemonCount = adm_selectedPokemon.length;

    adm_add('let POKEMON_LIST =\n{\n');

    for(let p=0;p<pokemonCount;p++)
    {
        const POKEMON = adm_selectedPokemon[p].innerHTML;

        for(let i=0;i<details.length;i++)
        {
            const DETAIL =  details[i];
            const DETAILS = DETAIL.split('_');
            const VALUE = DETAIL.indexOf('_') == -1 ? POKEMON_LIST[POKEMON][DETAIL] : POKEMON_LIST[POKEMON][DETAILS[0]][DETAILS[1]];
            const OBJECT = ADMIN_POKEMON_DETAILS[DETAIL];

            if(OBJECT.isImportant && VALUE === ''){adm_error(POKEMON,OBJECT.text,0); continue;}
            if(OBJECT.isImportant && typeof(VALUE) == 'object' && (VALUE[0] === '' || VALUE.first === '')){adm_error(POKEMON,OBJECT.text,0); continue;}
            if(OBJECT.isNumber && isNaN(VALUE)){adm_error(POKEMON,OBJECT.text,1); continue;}
            if(OBJECT.isNumber && VALUE < 0){adm_error(POKEMON,OBJECT.text,2); continue;}
            if(OBJECT.min && VALUE < OBJECT.min){adm_error(POKEMON,OBJECT.text,2); continue;}
            if(OBJECT.max && VALUE > OBJECT.max){adm_error(POKEMON,OBJECT.text,3); continue;}
            if(errorText = adm_specification(DETAIL,VALUE)){adm_error(POKEMON,OBJECT.text,errorText); continue;}

            if(DETAIL == 'name')
            {
                adm_add('\t' + POKEMON + ': new Pokemon_list(');
            }
            else if(DETAIL == 'no')
            {
                adm_add(VALUE);
            }
            else if(OBJECT.isMulti)
            {
                adm_add(',');

                if(VALUE.first === undefined)
                {
                    adm_add('[\'' + VALUE[0] + '\'');
                    if(VALUE.length >= 2)
                    {
                        for(let j=1;j<VALUE.length;j++)
                        {   
                            if(VALUE[j] == undefined){adm_add(',\'\'')}
                            else{adm_add(',\'' + VALUE[j] + '\'');}
                        }
                    }
                    adm_add(']');
                }
                else
                {
                    adm_add('\'' + VALUE.first + '\',\'' + VALUE.second + '\'');
                    if(VALUE.hidden !== undefined){adm_add(',\'' + VALUE.hidden + '\'');}
                }
            }
            else
            {
                adm_add(',');
                if(isNaN(VALUE))
                {
                    if(VALUE === undefined){adm_add('\'\'');}
                    else{adm_add('\'' + VALUE + '\'');}
                }
                else
                {
                    if(VALUE *1 === VALUE){adm_add(VALUE);}
                    else{adm_add('\'\'');}
                }
            }
        }

        adm_add('),\n');
    }

    adm_add('}');
    if(noErrors)
    {
        adm_status.innerHTML = '<font color=#008400>' + ADMIN_POKEMON_TEXTS.success[language] + '</font>';
        adm_createContent.select();
        document.execCommand("copy");
    }
    else{adm_status.innerHTML = '<font color=#ff0000>' + ADMIN_POKEMON_TEXTS.error[language] + ' ' + adm_status.innerHTML + '</font>';}
}

function adm_specification(_detail,_value)
{
    switch(_detail)
    {
        case 'no':
        {
            let numberOfValues = 0;
            Object.keys(POKEMON_LIST).forEach(pokemon => {
                if(pokemon.no == _value){numberOfValues++;}
            });
            if(numberOfValues > 1 && _value > 0){return 4;}
        } break;
        case 'types':
        {
            if(POKEMON_TYPES.indexOf(_value.first) < 0){return 5;}
            if(POKEMON_TYPES.indexOf(_value.second) < 0){return 5;}
        } break;
        // case 'abilities': 
        // {
        //     if(POKEMON_ABILITIES.indexOf(_value.first) < 0){return 5;}
        //     if(POKEMON_ABILITIES.indexOf(_value.second) < 0){return 5;}
        //     if(POKEMON_ABILITIES.indexOf(_value.hidden) < 0){return 5;}
        // } break;
        case 'EVYeld':
        {
            for(let i=0;i<_value.length;i++)
            {
                if(POKEMON_STATS.indexOf(_value[i]) < 0){return 5;}
            }
        } break;
        // case 'growthExp': if(POKEMON_EXP_GROWTH.indexOf(_value) < 0){return 5;} break;
        //case 'preevolution_specie': if(Object.keys(POKEMON_LIST).indexOf(_value) < 0 && _value != ''){return 5;} break;
        case 'preevolution_method': if(false){if(Object.keys(POKEMON_EVOLUTION_METHODS).indexOf < 0){return 5;}} break;
        case 'preevolution_value': if(false){if(POKEMON_EVOLUTION_METHODS[adm_form_preevolution_method.value].indexOf(_value) < 0){return 5;}} break;
    }

    return false;
}

function adm_error(_pokemon,_text,_type)
{
    if(noErrors)
    {
        noErrors = false;
        adm_createContent.value = ADMIN_POKEMON_TEXTS.error[language];
        adm_status.innerHTML = 0;
        adm_createContent.cols = 50;
    }

    let errorText = '\n' + _pokemon + ": " + _text[language] + ADMIN_POKEMON_TEXTS.errors[_type][language];
    
    adm_createContent.value += errorText;
    adm_status.innerHTML = adm_status.innerHTML *1 +1;
    adm_createContent.rows++;
}

function adm_add(_text)
{
    if(noErrors)
    {
        if(_text == 'make it clear')
        {
            adm_createContent.value = '';
        }
        else
        {
            adm_createContent.value += _text;
        }
    }
}

// ===========================================================================
// =========================== MAPS ==========================================
// ===========================================================================


function adm_mapEditor()
{
    admin_content.innerHTML='';
    
    adm_details = document.createElement('div');
    adm_details.classList.add('admDetails');
    admin_content.appendChild(adm_details);
    
    let text = document.createElement('p');
    text.innerHTML = ADMIN_MAPS_DESCRIPTIONS.no[language];
    adm_details.appendChild(text);
    
    adm_mapNo = document.createElement('select');
    adm_mapNo.id = 'adm_mapNo';
    adm_mapNo.oninput = function(){adm_mapChange(this.value);}
    adm_details.appendChild(adm_mapNo);
    
    for(let i=0;i<MAPS.length;i++)
    {
        option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        adm_mapNo.appendChild(option);
    }
    
    adm_newMapButton = document.createElement('button');
    adm_newMapButton.innerHTML = '+';
    adm_newMapButton.onclick = function(){adm_addNewMap();}
    adm_details.appendChild(adm_newMapButton);
    
    text = document.createElement('p');
    text.innerHTML = 'X:';
    adm_details.appendChild(text);
    
    let adm_sizeX = document.createElement('input');
    adm_sizeX.type = 'number';
    adm_sizeX.min = 1;
    adm_sizeX.id = 'adm_sizeX';
    adm_sizeX.classList.add('adm_size');
    adm_sizeX.oninput = function(){adm_changeSizeOfMap();}
    adm_details.appendChild(adm_sizeX);
    
    text = document.createElement('p');
    text.innerHTML = 'Y:';
    adm_details.appendChild(text);
    
    let adm_sizeY = document.createElement('input');
    adm_sizeY.type = 'number';
    adm_sizeY.min = 1;
    adm_sizeY.id = 'adm_sizeY';
    adm_sizeY.classList.add('adm_size');
    adm_sizeY.oninput = function(){adm_changeSizeOfMap();}
    adm_details.appendChild(adm_sizeY);
    
    let adm_mapItems_container = document.createElement('div');
    adm_mapItems_container.classList.add('admMapItems');
    admin_content.appendChild(adm_mapItems_container);
    
    for(let i=0;i<MAP_ITEMS.length;i++)
    {
        let adm_mapItem = document.createElement('div');
        let img = document.createElement('img');
        img.src = IMG_WAY + MAP_ITEMS[i].src;
        img.title = ADMIN_MAPS_DESCRIPTIONS.imgTitle[language] + i;
        adm_mapItem.appendChild(img);
        adm_mapItem.onclick = function(){adm_mapItemSelect(this, i);}
        adm_mapItems_container.appendChild(adm_mapItem);
    }
    
    adm_mapItems_container.childNodes[0].classList.add('active');
    
    adm_infoDiv = document.createElement('div');
    adm_infoDiv.innerHTML = ADMIN_WARNINGS[1][language];
    adm_infoDiv.classList.add('admInfo');
    admin_content.appendChild(adm_infoDiv);
    
    let createCode = document.createElement('button');
    createCode.innerHTML = 'twórz kod';
    createCode.onclick = function() {adm_createCode();}
    admin_content.appendChild(createCode);
    
    let codeText = document.createElement('textarea');
    codeText.rows = 1;
    codeText.cols = 10;
    codeText.id = 'adm_codeText';
    admin_content.appendChild(codeText);
    
    let adm_mapTable = document.createElement('table');
    adm_mapTable.classList.add('admMapTable');
    adm_mapTable.id = 'adm_mapTable';
    admin_content.appendChild(adm_mapTable);
    
    adm_mapChange(0);
}

function adm_mapItemSelect(_item,_index)
{
    _item.parentNode.childNodes[adm_selectedMapItem].classList.remove('active');
    _item.classList.add('active');
    adm_selectedMapItem = _index;
}

function adm_mapChange(_number)
{
    while(adm_mapTable.rows.length > 0){adm_mapTable.deleteRow(0);}
    
    for(let i=0;i<MAPS[_number].length;i++)
    {
        adm_mapTable.insertRow(i);
        for(let j=0;j<MAPS[_number][i].length;j++)
        {
            const img = MAPS[_number][i][j];
            adm_mapTable.rows[i].insertCell(j).appendChild(mapImg(img));
            adm_mapTable.rows[i].cells[j].onclick = function(){adm_changeMapField(i,j);}
            adm_mapTable.rows[i].cells[j].onmouseover = function(_event){if(_event.ctrlKey){adm_changeMapField(i,j);}}
        }
    }
    
    adm_sizeY.value = MAPS[_number].length;
    adm_sizeX.value = MAPS[_number][0].length;
}

function adm_changeMapField(_y,_x)
{
    adm_mapTable.rows[_y].cells[_x].innerHTML = '';
    adm_mapTable.rows[_y].cells[_x].appendChild(mapImg(adm_selectedMapItem));
    MAPS[adm_mapNo.value][_y][_x] = adm_selectedMapItem;
}

function adm_changeSizeOfMap()
{
    while(adm_sizeY.value > MAPS[adm_mapNo.value].length)
    {
        let lastRow = adm_mapTable.rows.length;
        let cellsCount = 0;
        if(MAPS[adm_mapNo.value].length > 0){cellsCount = MAPS[adm_mapNo.value][0].length}
        adm_mapTable.insertRow(lastRow);
        MAPS[adm_mapNo.value].push([]);
        for(let i=0;i<cellsCount;i++)
        {
            adm_mapTable.rows[lastRow].insertCell(i).appendChild(mapImg(adm_selectedMapItem));
            adm_mapTable.rows[lastRow].cells[i].onclick = function(){adm_changeMapField(lastRow,i);}
            adm_mapTable.rows[lastRow].cells[i].onmouseover = function(_event){if(_event.ctrlKey){adm_changeMapField(lastRow,i);}}
            MAPS[adm_mapNo.value][lastRow].push(adm_selectedMapItem);
        }
    }
    
    while(adm_sizeY.value < MAPS[adm_mapNo.value].length)
    {
        let lastRow = adm_mapTable.rows.length;
        adm_mapTable.deleteRow(lastRow - 1);
        MAPS[adm_mapNo.value].pop();
    }
    
    while(adm_sizeX.value > MAPS[adm_mapNo.value][0].length)
    {
        let lastCell = adm_mapTable.rows[0].cells.length;
        let rowsCount = adm_mapTable.rows.length;
        
        for(let i=0;i<rowsCount;i++)
        {
            adm_mapTable.rows[i].insertCell(lastCell).appendChild(mapImg(adm_selectedMapItem));
            adm_mapTable.rows[i].cells[lastCell].onclick = function(){adm_changeMapField(i,lastCell);}
            adm_mapTable.rows[i].cells[lastCell].onmouseover = function(_event){if(_event.ctrlKey){adm_changeMapField(i,lastCell);}}
            MAPS[adm_mapNo.value][i].push(adm_selectedMapItem);
        }
    }

    while(adm_sizeX.value < MAPS[adm_mapNo.value][0].length)
    {
        let lastCell = adm_mapTable.rows[0].cells.length;
        let rowsCount = adm_mapTable.rows.length;
        
        for(let i=0;i<rowsCount;i++)
        {
            adm_mapTable.rows[i].deleteCell(lastCell - 1);
            MAPS[adm_mapNo.value][i].pop();
        }
    }
    
}

function adm_createCode()
{
    adm_codeText.value = 'let MAPS =\n';
    adm_codeText.value +='[';
    
    for(let i=0;i<MAPS.length;i++)
    {
        adm_codeText.value +='\n\t[';
        for(let j=0;j<MAPS[i].length;j++)
        {
            adm_codeText.value += '\n\t\t[' + MAPS[i][j][0];
            
            for(let k=1;k<MAPS[i][j].length;k++)
            {
                adm_codeText.value += ',' + MAPS[i][j][k];
            }
            
            adm_codeText.value += '],';
            
        }
        adm_codeText.value +='\n\t],';
    }
    
    adm_codeText.value += '\n]';
    
    adm_codeText.select();
    document.execCommand("copy");
}

function adm_addNewMap()
{
    let newMapNo = MAPS.length;
    MAPS.push([[0]]);
    let option = document.createElement('option');
    option.value = newMapNo;
    option.innerHTML = newMapNo;
    option.selected = true;
    adm_mapNo.appendChild(option);
    adm_mapChange(newMapNo);
}


// ===========================================================================
// =========================== MOVES =========================================
// ===========================================================================


function adm_moveEditor_run()
{
    admin_content.innerHTML = '';
    let waitingImage = document.createElement('img');
    waitingImage.src = waitingImageUrl;
    admin_content.appendChild(waitingImage);
    let php_moves = new XMLHttpRequest();
    php_moves.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
		{
            console.log(this.responseText);
	        const RES = JSON.parse(this.responseText);
			console.log(RES);
            
            let moveTable = document.createElement('table');
            moveTable.id = 'adm_moveTable';
            moveTable.classList.add('admMoveTable');

            moveTable.insertRow(0);
            for(let i=0;i<ADMIN_MOVES_PROPERTIES.length;i++)
            {
                moveTable.rows[0].insertCell(i).innerHTML = ADMIN_MOVES_PROPERTIES[i].description[language];
            }
            let newMoveButton = document.createElement('div');
            newMoveButton.innerHTML = '+';
            newMoveButton.classList.add('adminButton','button','small');
            newMoveButton.onclick = function(){adm_addMove();};
            newMoveButton.id = 'adm_move_newMoveButton';
            let waitingImage = document.createElement('img');
            waitingImage.src = waitingImageUrl;
            waitingImage.classList.add('none');
            waitingImage.id = 'adm_newMove_waiting';
            waitingImage.height = 32;
            moveTable.rows[0].insertCell(ADMIN_MOVES_PROPERTIES.length).appendChild(newMoveButton);
            moveTable.rows[0].cells[ADMIN_MOVES_PROPERTIES.length].appendChild(waitingImage);


            Object.keys(RES).forEach(move => {
                let lastRow = moveTable.insertRow(moveTable.rows.length);
                lastRow.onclick = function(){adm_editMove(RES[move].id);}
                console.log(move,RES);
                for(let i=0;i<ADMIN_MOVES_PROPERTIES.length;i++)
                {
                    lastRow.insertCell(i).innerHTML = RES[move][ADMIN_MOVES_PROPERTIES[i].dbname];
                }
            })
            
            admin_content.innerHTML = '';
            admin_content.appendChild(moveTable);
        }
    }
    
	php_moves.open("POST", 'php/moves.php', true);
	php_moves.send();
}

function adm_editMove(_move)
{
    admin_content.innerHTML = '';
    let waitingImage = document.createElement('img');
    waitingImage.src = waitingImageUrl;
    admin_content.appendChild(waitingImage);
    let php_moves = new XMLHttpRequest();
    php_moves.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
		{
            console.log(this.responseText);
	        const RES = JSON.parse(this.responseText)[0];
			console.log(RES);
            
            let editTable = document.createElement('table');
            for(let i=1; i<ADMIN_MOVES_PROPERTIES.length;i++)
            {
                editTable.insertRow(i-1).insertCell(0).innerHTML = ADMIN_MOVES_PROPERTIES[i].description[language];
                let disable = false;
                let input;
                switch(ADMIN_MOVES_PROPERTIES[i].input)
                {
                    
                    case 'disabled': disable = true;
                    case 'text':
                    {
                        input = document.createElement('input');
                        input.type = 'text';
                    }
                    break;
                    
                    
                    case 'number':
                    {
                        input = document.createElement('input');
                        input.type = 'number';
                        input.min = ADMIN_MOVES_PROPERTIES[i].min; 
                        input.max = ADMIN_MOVES_PROPERTIES[i].max; 
                    }
                    break;
                    
                    case 'select':
                    {
                        input = document.createElement('select');
                        for(let j=0;j<ADMIN_MOVES_PROPERTIES[i].table.length;j++)
                        {
                            let option = document.createElement('option');
                            option.value = ADMIN_MOVES_PROPERTIES[i].table[j];
                            option.innerHTML = ADMIN_MOVES_PROPERTIES[i].table[j];
                            input.appendChild(option);
                        }
                    }
                    break;

                    case 'checkbox':
                    {
                        input = document.createElement('input');
                        input.type = 'checkbox';
                        if(RES[ADMIN_MOVES_PROPERTIES[i].dbname] == 1){input.checked = true;}
                        else{input.checked = false;}
                    }
                }
            
                input.value = RES[ADMIN_MOVES_PROPERTIES[i].dbname];
                input.id = 'admin_editMove_' + ADMIN_MOVES_PROPERTIES[i].dbname;
                input.disabled = disable;
                editTable.rows[i-1].insertCell(1).appendChild(input);
            }
            editTable.id = 'admin_editTable';
            
            let effectsTab = document.createElement('table');
            effectsTab.classList.add('adminMoveEffectsTab');
            effectsTab.id = 'admin_moves_effectsTable';

            let arrayOfEffects = [];
            if(RES.effects != undefined && RES.effects != '')
            {
                arrayOfEffects = RES.effects.split(',');
            } 

            for(let i=0; i<NUMBER_OF_EFFECTS; i++)
            {
                let whatEffect = document.createElement('select');
                for(let j=0;j<POKEMON_MOVE_EFFECTS.length;j++)
                {
                    let option = document.createElement('option');
                    option.value = j;
                    option.innerHTML = POKEMON_MOVE_EFFECTS[j][language];
                    whatEffect.appendChild(option);
                }
                whatEffect.id = 'admin_move_effect_what_' + i;
                whatEffect.onchange = function(){admin_changeWhatMoveEffect(i);}
                effectsTab.insertRow(i).insertCell(0).appendChild(whatEffect);
                
                effectsTab.rows[i].insertCell(1).innerHTML = '<input id=\'admin_move_effect_value_' + i + '\' disabled>';
                
                let chance = document.createElement('input');
                chance.id = 'admin_move_effect_chance_' + i;
                chance.type = 'number';
                chance.min = 1;
                chance.max = 100;
                effectsTab.rows[i].insertCell(2).appendChild(chance);

                let whom = document.createElement('select');
                whom.id = 'admin_move_effect_whom_' + i;
                for(let j=0;j<MOVE_EFFECT_WHOM.length;j++)
                {
                    let option = document.createElement('option');
                    option.value = j;
                    option.innerHTML = MOVE_EFFECT_WHOM[j][language];
                    whom.appendChild(option);
                }
                effectsTab.rows[i].insertCell(3).appendChild(whom);

            }
            effectsTab.insertRow(0);
            for(let i=0;i<ADMIN_EFFECTS_COLS.length;i++)
            {
                effectsTab.rows[0].insertCell(i).innerHTML = ADMIN_EFFECTS_COLS[i][language];
            }

            let save = document.createElement('div');
            save.innerHTML = ADMIN_MOVE_TEXTS.save[language];
            save.classList.add('adminButton','button','small');
            save.id = 'adm_move_saveButton';
            save.onclick = function(){admin_saveMove(_move);}
            let cancel = document.createElement('div');

            cancel.innerHTML = ADMIN_MOVE_TEXTS.cancel[language];
            cancel.classList.add('adminButton','button','small');
            cancel.id = 'adm_move_cancelButton';
            cancel.onclick = function(){adm_moveEditor_run();}
            
            let waitingImage = document.createElement('img');
            waitingImage.src = waitingImageUrl;
            waitingImage.height = 33;
            waitingImage.classList.add('none');
            waitingImage.id = 'adm_move_waitingIMG';
            
            let buttonDiv = document.createElement('div');
            buttonDiv.classList.add('adm_buttonContainer');
            buttonDiv.appendChild(waitingImage);
            buttonDiv.appendChild(save);
            buttonDiv.appendChild(cancel);

            let info = document.createElement('div');
            info.id = 'adm_moves_info';

            admin_content.innerHTML = '';
            admin_content.appendChild(editTable);
            admin_content.appendChild(effectsTab);
            admin_content.appendChild(buttonDiv);
            admin_content.appendChild(info);
            for(let i=0;i<NUMBER_OF_EFFECTS;i++)
            {
                if(arrayOfEffects[i] != undefined)
                {
                    const VALUES = arrayOfEffects[i].split('|');
                    for(let j=0;j<ADMIN_EFFECTS_COLS.length;j++)
                    {
                        document.getElementById('admin_move_effect_'+ ADMIN_EFFECTS_COLS[j].english + '_' + i).value = VALUES[j];
                        if(j == 0){admin_changeWhatMoveEffect(i);}
                    }
                }
            }
        }
    }

    let data = new FormData();
    data.append('move', _move);
    php_moves.open("POST", 'php/moves.php', true);
    php_moves.send(data);
}

function admin_changeWhatMoveEffect(_number)
{
    let selectValue = document.getElementById('admin_move_effect_what_' + _number).value;
    let value = '';
    if(POKEMON_MOVE_EFFECTS[selectValue].disable)
    {
        value = '<input id=\'admin_move_effect_value_' + _number + '\' disabled value=\'\'>';
    }
    else if(POKEMON_MOVE_EFFECTS[selectValue].types == undefined)
    {
        value = '<input type=number id=\'admin_move_effect_value_' + _number + '\'>';
    }
    else
    {
        value = '<select id=\'admin_move_effect_value_' + _number + '\'>';
        for(let i=0;i<POKEMON_MOVE_EFFECTS[selectValue].types.length;i++)
        {
            value += '<option value=' + i + '>' + POKEMON_MOVE_EFFECTS[selectValue].types[i][language] + '</option>';
        }
        value += '</select>';
    }

    admin_moves_effectsTable.rows[_number + 1].cells[1].innerHTML = value;
}

function admin_saveMove(_move)
{
    adm_move_waitingIMG.classList.remove('none');
    adm_move_saveButton.classList.add('none');
    noErrors = true;
    adm_moves_info.innerHTML = '';

    let data = new FormData();
    data.append('id',_move);

    let value = '';

    for(let i=0;i<NUMBER_OF_EFFECTS;i++)
    {
        const WHAT = document.getElementById('admin_move_effect_what_' + i).value;
        const VALUE = document.getElementById('admin_move_effect_value_' + i);
        const CHANCE = document.getElementById('admin_move_effect_chance_' + i).value;
        const WHOM = document.getElementById('admin_move_effect_whom_' + i).value;
        
        if(WHAT > 0)
        {
            if(CHANCE === ''){admin_move_addWarning(6,i); continue;}
            if(isNaN(CHANCE)){admin_move_addWarning(9,i); continue;}
            if(CHANCE < 1){admin_move_addWarning(7,i); continue;}
            if(CHANCE > 100){admin_move_addWarning(8,i); continue;}
            
            if(value != ''){value += ',';}
            value += WHAT + '|' + VALUE.value + '|' + CHANCE + '|' + WHOM;
        }
    }
    admin_editMove_effects.value = value;


    for(let i=1;i<ADMIN_MOVES_PROPERTIES.length;i++)
    {
        let input = document.getElementById('admin_editMove_' + ADMIN_MOVES_PROPERTIES[i].dbname).value;
        if(ADMIN_MOVES_PROPERTIES[i].dbname == 'contact')
        {
            if(document.getElementById('admin_editMove_' + ADMIN_MOVES_PROPERTIES[i].dbname).checked){input = 1;}
            else{input = 0;}
        }
        let property = ADMIN_MOVES_PROPERTIES[i];
        data.append(property.dbname,input)
        if(property.input == 'disabled'){continue;}
        if(input == '' && property.input != 'checkbox'){admin_move_addError(i,0);}
        if(property.input == 'number')
        {
            if(isNaN(input)){admin_move_addError(i,1);}
            else
            {
                if(input < property.min){admin_move_addError(i,2);}
                if(input > property.max){admin_move_addError(i,3);}
            }
        }
    }

    if(noErrors)
    {
        let php_moves = new XMLHttpRequest();
        php_moves.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
		    {
	            const RES = this.responseText;
		    	console.log(RES);

                if(RES == '{}')
                {
                    admin_move_addSuccess()
                }

                adm_move_waitingIMG.classList.add('none');
                adm_move_saveButton.classList.remove('none');
            }
        }

        php_moves.open("POST", 'php/moves.php', true);
        php_moves.send(data);
    }
    else
    {
        adm_move_waitingIMG.classList.add('none');
        adm_move_saveButton.classList.remove('none');
    }
    
}

function admin_move_addWarning(_number,_effect)
{
    const TEXT = (_effect + 1) + ADMIN_POKEMON_TEXTS.errors[_number][language] + '<br>';
    adm_moves_info.innerHTML += colorText(TEXT,COLOR_WARNING);
}

function admin_move_addError(_property,_error)
{
    if(noErrors)
    {
        noErrors = false;
        adm_moves_info.innerHTML += color_text(ADMIN_POKEMON_TEXTS.error[language],COLOR_ERROR);
    }
    const TEXT = '<br>' + ADMIN_MOVES_PROPERTIES[_property].description[language] + ADMIN_POKEMON_TEXTS.errors[_error][language];
    adm_moves_info.innerHTML +=  colorText(TEXT,COLOR_ERROR);
}

function admin_move_addSuccess()
{
    adm_moves_info.innerHTML += colorText(ADMIN_POKEMON_TEXTS.success[language],COLOR_SUCCESS);
}

function adm_addMove()
{
    adm_move_newMoveButton.classList.add('none');
    adm_newMove_waiting.classList.remove('none');

    let data = new FormData();
    data.append('new',true);
    let php_moves = new XMLHttpRequest();
    php_moves.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
	    {
            console.log(this.responseText);
            const RES = JSON.parse(this.responseText);
	 	    console.log(RES);
            if(RES.id == undefined)
            {
                adm_move_newMoveButton.classList.remove('none');
                adm_newMove_waiting.classList.add('none');
            }
            else
            {
                adm_editMove(RES.id);
            }
        }
    }

    php_moves.open("POST", 'php/moves.php', true);
    php_moves.send(data);
}