function insertWaitingImage(_object)
{
    _object.innerHTML = '';
    let waitingImage = document.createElement('img');
    waitingImage.src = waitingImageUrl;
    _object.appendChild(waitingImage);
}

function admin_start()
{
    worldmapContent.innerHTML = '';
    let admin_conteiner = newElement('div',worldmapContent,'adminContainer','admin_conteiner');
    let admin_list = newElement('div',admin_conteiner,'adminList','admin_list');

    for(let i=0;i<ADMIN_LIST_OF_TASKS.length;i++)
    {
        let task = newElement('div',admin_list,'adminTask button medium');
        task.innerHTML = ADMIN_LIST_OF_TASKS[i].language();
        if(ADMIN_LIST_OF_TASKS[i].disabled)
        {
            task.classList.add('disabled');
        }
        else
        {
            task.onclick=function(){admin_show_database(ADMIN_LIST_OF_TASKS[i].english.replace(' ', '_'))}
        }
    }

    let admin_content = newElement('div',admin_conteiner,'','admin_content');
    admin_content.innerHTML = ADMIN_WARNINGS[2].language();

    activeWindow = 'admin';

    adm_updateArrays();
}

function admin_show_database(_db)
{
    insertWaitingImage(admin_content);
    sendRequest(admin_database_list, 'php/database.php?base=' + _db, null, _db);
}

function admin_database_list(_res,_db)
{
    admin_content.innerHTML = '';
    
    let databaseTable = newElement('table',admin_content,'admdatabaseTable','adm_databaseTable');
    
    databaseTable.insertRow(0);
    const details = ADMIN_DATABASE_COLS[_db];

    for(let i=0;i<details.length;i++)
    {
        if(details[i].hidden === undefined)
        {
            databaseTable.rows[0].insertCell(i).innerHTML = details[i].description.language();
        }
    }
    
    let lastCell = databaseTable.rows[0].insertCell(databaseTable.rows[0].cells.length);

    let newElementButton = newElement('div',lastCell,'adminButton button small','adm_database_newElementButton');
    newElementButton.innerHTML = '+';
    newElementButton.onclick = function(){adm_add_dbElement(_db);};

    let waitingImage = newElement('img',lastCell,'none','adm_database_newElement_waiting');
    waitingImage.src = waitingImageUrl;
    waitingImage.height = 32;

    if(_db == 'pokemon'){pokemonList = [''];}
    
    Object.keys(_res).forEach(element => {
        if(_db == 'pokemon')
        {
            pokemonList[element*1 +1] = _res[element].name;
        }
        
        let lastRow = databaseTable.insertRow(databaseTable.rows.length);
        lastRow.onclick = function(){adm_edit_dbElement(_db,_res[element].id);}
        
        for(let i=0;i<details.length;i++)
        {
            if(details[i].hidden === undefined)
            {
                lastRow.insertCell(i).innerHTML = _res[element][details[i].dbname];
            }
        }
    })
    adm_updateArrays();
            
    
}

function adm_edit_dbElement(_db,_id)
{
    insertWaitingImage(admin_content);    
    let data = new FormData();
    data.append('which', _id);
    sendRequest(adm_edit_dbElement_ready, 'php/database.php?base=' + _db, data, [_db,_id]);
}

function adm_edit_dbElement_ready(_res,[_db,_id])
{
    const RES = _res[0];
    let array = ADMIN_DATABASE_COLS[_db];
    
    admin_content.innerHTML = '';

    let editTable = newElement('table',admin_content,'','admin_editTable');
    for(let i=1; i<array.length;i++)
    {
        editTable.insertRow(i-1).insertCell(0).innerHTML = array[i].description.language();
        let disable = false;
        let input;
        
        switch(array[i].input)
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
                input.min = array[i].min; 
                input.max = array[i].max; 
            }
            break;
                    
            case 'select':
            {
                input = document.createElement('select');
                for(let j=0;j<array[i].table.length;j++)
                {
                    let option = document.createElement('option');
                    if(array[i].noLanguage === undefined)
                    {
                        option.value = array[i].table[j].english;
                        option.innerHTML = array[i].table[j].language();
                    }
                    else
                    {
                        option.value = array[i].table[j];
                        option.innerHTML = array[i].table[j];
                    }
                    input.appendChild(option);
                }
            }
            break;
                        
            case 'selects':
            {
                input = [];
                for(let k=0;k<array[i].numOfInput;k++)
                {
                    input[k] = document.createElement('select');
                    for(let j=0;j<array[i].table.length;j++)
                    {
                        let option = document.createElement('option');
                        option.value = j;
                        option.innerHTML = array[i].table[j].language();
                        if(array[i].dbname == 'abilities' && POKEMON_ABILITIES[j].done == undefined){option.classList.add('notReady');}
                        input[k].appendChild(option);
                    }
                            
                }
            }
            break;

            case 'checkbox':
            {
                input = document.createElement('input');
                input.type = 'checkbox';
                if(RES[array[i].dbname] == 1){input.checked = true;}
                else{input.checked = false;}
            }
        }
        
        if(array[i].onchange != undefined)
        {
            input.onchange = array[i].onchange;
        }
        
        if(array[i].numOfInput == undefined)
        {
            input.value = RES[array[i].dbname];
            input.id = 'admin_editDBElement_' + array[i].dbname;
            input.disabled = disable;
            editTable.rows[i-1].insertCell(1).appendChild(input);
        }
        else
        {
            const dbvalue = RES[array[i].dbname].split(',');
            console.log(RES[array[i].dbname], dbvalue);
            let cell = editTable.rows[i-1].insertCell(1);
            for(let j=0;j<array[i].numOfInput;j++)
            {
                input[j].value = dbvalue[j];
                input[j].id = 'admin_editDBElement_' + array[i].dbname + '_' + j;
                cell.appendChild(input[j]);
            }
        }
        
    }
    if(_db == 'moves')
    {
        effectsTab = adm_moves_addition();
        admin_content.appendChild(effectsTab);
    }
    if(_db == 'maps')
    {
        mapsHelps = adm_maps_addition(RES.cells);
        admin_content.appendChild(mapsHelps);
    }
    
    let buttonDiv = newElement('div',admin_content,'adm_buttonContainer');

    let save = newElement('div',buttonDiv,'adminButton button small','adm_edit_saveButton');
    save.innerHTML = ADMIN_EDIT_TEXTS.save.language();
    save.onclick = function(){admin_saveDBElement(_db,_id);}

    let waitingImage = newElement('img',buttonDiv,'none','adm_edit_waitingIMG');
    waitingImage.src = waitingImageUrl;
    waitingImage.height = 33;

    let cancel = newElement('div',buttonDiv,'adminButton button small','adm_edit_cancelButton');
    cancel.innerHTML = ADMIN_EDIT_TEXTS.cancel.language();
    cancel.onclick = function(){admin_show_database(_db);}
    
    newElement('div',admin_content,'','adm_edit_info');

    if(_db == 'moves')
    {
        let arrayOfEffects = [];
        if(RES.effects != undefined && RES.effects != '')
        {
            arrayOfEffects = RES.effects.split(',');
        }
        
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
    
    if(_db == 'pokemon')
    {
        admin_editDBElement_preevolution_method.onchange();
        admin_editDBElement_preevolution_value.value = RES.preevolution_value;
    }
}

function adm_add_dbElement(_db)
{
    adm_database_newElementButton.classList.add('none');
    adm_database_newElement_waiting.classList.remove('none');

    let data = new FormData();
    data.append('new',true);

    sendRequest(adm_add_dbElement_ready, 'php/database.php?base=' + _db, data, _db);
}

function adm_add_dbElement_ready(_RES,_db)
{
    if(_RES.id == undefined)
    {
        adm_database_newElementButton.classList.remove('none');
        adm_database_newElement_waiting.classList.add('none');
    }
    else
    {
        adm_edit_dbElement(_db,_RES.id);
    }
}

function admin_saveDBElement(_db,_id)
{
    adm_edit_waitingIMG.classList.remove('none');
    adm_edit_saveButton.classList.add('none');
    noErrors = true;
    adm_edit_info.innerHTML = '';

    let data = new FormData();
    data.append('id',_id);

    if(_db == 'moves')
    {
        let value = '';

        for(let i=0;i<NUMBER_OF_EFFECTS;i++)
        {
            const WHAT = document.getElementById('admin_move_effect_what_' + i).value;
            const VALUE = document.getElementById('admin_move_effect_value_' + i);
            const CHANCE = document.getElementById('admin_move_effect_chance_' + i).value;
            const WHOM = document.getElementById('admin_move_effect_whom_' + i).value;

            if(WHAT > 0)
            {
                if(CHANCE === ''){admin_addWarning(6,i); continue;}
                if(isNaN(CHANCE)){admin_addWarning(9,i); continue;}
                if(CHANCE < 1){admin_addWarning(7,i); continue;}
                if(CHANCE > 100){admin_addWarning(8,i); continue;}

                if(value != ''){value += ',';}
                value += WHAT + '|' + VALUE.value + '|' + CHANCE + '|' + WHOM;
            }
        }
        admin_editDBElement_effects.value = value;
    }

    if(_db == 'maps')
    {
        if(actualMapData.no == _id)
        {
            actualMap = adm_thisMap;
        }
        let value ='';
        for(let i=0;i<adm_thisMap.length;i++)
        {
            if(i > 0){value += '/';}
            for(let j=0;j<adm_thisMap[i].length;j++)
            {
                if(j > 0){value += '|';}
                value += adm_thisMap[i][j][0] + ',' + adm_thisMap[i][j][1];
            }
        }

        admin_editDBElement_cells.value = value;
    }

    for(let i=1;i<ADMIN_DATABASE_COLS[_db].length;i++)
    {
        let input;
        let property = ADMIN_DATABASE_COLS[_db][i];
        
        if(property.input == 'selects')
        {
            input = document.getElementById('admin_editDBElement_' + property.dbname + '_0').value;

            for(let j=1;j<property.numOfInput;j++)
            {
                input += ',';
                input += document.getElementById('admin_editDBElement_' + property.dbname + '_' + j).value;
            }
            data.append(property.dbname,input);
        }
        else if(property.input == 'checkbox')
        {
            if(document.getElementById('admin_editDBElement_' + property.dbname).checked){input = 1;}
            else{input = 0;}
            data.append(property.dbname,input);
        }
        else
        {
            input = document.getElementById('admin_editDBElement_' + property.dbname).value;
            data.append(property.dbname,input);
        }

        if(property.input == 'disabled' || property.input == 'select' || property.input == 'selects'){continue;}

        if(input == '' && property.input != 'checkbox' && property.notImportant == undefined){admin_addError(i,0,_db);}
        if(property.input == 'number')
        {
            if(isNaN(input)){admin_addError(i,1,_db);}
            else
            {
                if(input < property.min){admin_addError(i,2,_db);}
                if(input > property.max){admin_addError(i,3,_db);}
            }
        }
    }

    if(noErrors)
    {
        sendRequest(adm_edit_success,'php/database.php?base=' + _db, data, 'giveMeResText');
    }
    else
    {
        adm_edit_waitingIMG.classList.add('none');
        adm_edit_saveButton.classList.remove('none');
    }
}

function adm_edit_success(_RES,_resText)
{
    if(_resText == '{}')
    {
        admin_addSuccess();
    }

    adm_edit_waitingIMG.classList.add('none');
    adm_edit_saveButton.classList.remove('none');
}

function admin_addWarning(_number,_effect)
{
    const TEXT = (_effect + 1) + ADMIN_POKEMON_TEXTS.errors[_number].language() + '<br>';
    adm_edit_info.innerHTML += colorText(TEXT,COLOR_WARNING);
}

function admin_addError(_property,_error,_db)
{
    if(noErrors)
    {
        noErrors = false;
        adm_edit_info.innerHTML += colorText(ADMIN_POKEMON_TEXTS.error.language(),COLOR_ERROR);
    }
    const TEXT = '<br>' + ADMIN_DATABASE_COLS[_db][_property].description.language() + ADMIN_POKEMON_TEXTS.errors[_error].language();
    adm_edit_info.innerHTML +=  colorText(TEXT,COLOR_ERROR);
}

function admin_addSuccess()
{
    adm_edit_info.innerHTML += colorText(ADMIN_POKEMON_TEXTS.success.language(),COLOR_SUCCESS);
}

function adm_updateArrays()
{
    ADMIN_DATABASE_COLS.pokemon[18].table = pokemonList;
    ADMIN_DATABASE_COLS.pokemon_moves[1].table = pokemonList;
    ADMIN_DATABASE_COLS.pokemon_moves[2].table = moveList;
}
// ===========================================================================
// =========================== MOVES =========================================
// ===========================================================================

function adm_moves_addition()
{
    let effectsTab = document.createElement('table');
    effectsTab.classList.add('adminMoveEffectsTab');
    effectsTab.id = 'admin_moves_effectsTable'; 

    for(let i=0; i<NUMBER_OF_EFFECTS; i++)
    {
        let whatEffect = document.createElement('select');
        for(let j=0;j<POKEMON_MOVE_EFFECTS.length;j++)
        {
            let option = document.createElement('option');
            option.value = j;
            option.innerHTML = POKEMON_MOVE_EFFECTS[j].language();
            if(POKEMON_MOVE_EFFECTS[j].done == undefined){option.classList.add('notReady');}
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
        option.innerHTML = MOVE_EFFECT_WHOM[j].language();
        whom.appendChild(option);
    }
    effectsTab.rows[i].insertCell(3).appendChild(whom);

    }
    effectsTab.insertRow(0);
    for(let i=0;i<ADMIN_EFFECTS_COLS.length;i++)
    {
        effectsTab.rows[0].insertCell(i).innerHTML = ADMIN_EFFECTS_COLS[i].language();
    }

    return effectsTab;
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
            let optClass = '';
            if(POKEMON_MOVE_EFFECTS[selectValue].types[i].done == undefined){optClass = ' class =\'notReady\'';}
            value += '<option value=' + i + optClass + '>' + POKEMON_MOVE_EFFECTS[selectValue].types[i].language() + '</option>';
        }
        value += '</select>';
    }

    admin_moves_effectsTable.rows[_number + 1].cells[1].innerHTML = value;
}

// ===========================================================================
// =========================== MAPS ==========================================
// ===========================================================================
function adm_maps_addition(_cells)
{
    let content = document.createElement('div');

    let adm_details = newElement('div',content,'admDetails');    
    let text = newElement('p',adm_details);
    text.innerHTML = 'X:';
    
    let adm_sizeX = document.createElement('input',adm_details,'adm_mapSize','adm_mapSizeX');
    adm_sizeX.type = 'number';
    adm_sizeX.min = 1;
    adm_sizeX.max = 50;
    adm_sizeX.oninput = function(){adm_changeSizeOfMap();}
    
    text = newElement('p',adm_details);
    text.innerHTML = 'Y:';
    
    let adm_sizeY = document.createElement('input',adm_details,'adm_mapSize','adm_mapSizeY');
    adm_sizeY.type = 'number';
    adm_sizeY.min = 1;
    adm_sizeY.max = 50;
    adm_sizeY.oninput = function(){adm_changeSizeOfMap();}
    
    text = newElement('p',content);
    text.innerHTML = ADMIN_EDIT_TEXTS.bg.language() + '<br>';
    
    let adm_mapBG_container = newElement('div',content,'admMapItems');
    
    for(let i=0;i<MAP_ITEMS.background.length;i++)
    {
        let adm_mapItem = newElement('div',adm_mapBG_container);
        let img = newElement('img',adm_mapItem);
        img.src = IMG_WAY + MAP_ITEMS.background[i].src;
        img.title = ADMIN_MAPS_DESCRIPTIONS.bgTitle.language() + i;
        adm_mapItem.onclick = function(){adm_mapBGSelect(this, i);}
        if(i == 0){adm_mapItem.classList.add('active');}
    }

    text = newElement('p',content);
    text.innerHTML = ADMIN_EDIT_TEXTS.object.language() + '<br>';
    
    let adm_mapObject_container = newElement('div',content,'admMapItems');
    
    for(let i=0;i<MAP_ITEMS.object.length;i++)
    {
        let adm_mapItem = document.createElement('div',adm_mapObject_container);
        adm_mapItem.onclick = function(){adm_mapObjectSelect(this, i);}
        if(i == 0){adm_mapItem.classList.add('active');}

        let img = newElement('img',adm_mapItem);
        img.src = IMG_WAY + MAP_ITEMS.object[i].src;
        img.title = ADMIN_MAPS_DESCRIPTIONS.imgTitle.language() + i;
    }

    let choose = newElement('div',content);
    choose.innerHTML = ADMIN_EDIT_TEXTS.edit.language() + '<br>';
    let tempArray = ['bg','object','both'];
    for(let i=0;i<tempArray.length;i++)
    {
        let label = newElement('label',choose);

        let radio = newElement('input',label);
        radio.type = 'radio';
        radio.name = 'adm_chooseEditInMap';
        radio.id = 'adm_chooseEditInMap' + tempArray[i];
        radio.value = tempArray[i];
        if(i == 0){radio.checked = true;}

        text = newElement('b',label);
        text.innerHTML = ADMIN_EDIT_TEXTS[tempArray[i]].language() + ' ';
    }
    
    let adm_infoDiv = newElement('div',content,'admInfo');
    adm_infoDiv.innerHTML = ADMIN_WARNINGS[1].language();
    
    let adm_mapTable = newElement('table',content,'admMapTable','adm_mapTable');
    
    adm_thisMap = _cells.split('/');
    
    for(let i=0;i<adm_thisMap.length;i++)
    {
        adm_mapTable.insertRow(i);
        adm_thisMap[i] = adm_thisMap[i].split('|');
        for(let j=0;j<adm_thisMap[i].length;j++)
        {
            adm_thisMap[i][j] = adm_thisMap[i][j].split(',');
            mapImg(adm_mapTable.rows[i].insertCell(j),adm_thisMap[i][j],'both');
            adm_mapTable.rows[i].cells[j].onclick = function(){adm_changeMapField(i,j);}
            adm_mapTable.rows[i].cells[j].onmouseover = function(_event){if(_event.ctrlKey){adm_changeMapField(i,j);}}
        }
    }
    
    adm_sizeY.value = adm_thisMap.length;
    adm_sizeX.value = adm_thisMap[0].length;

    return content;
}

function adm_mapBGSelect(_item,_index)
{
    _item.parentNode.childNodes[adm_selectedMapBG].classList.remove('active');
    _item.classList.add('active');
    adm_selectedMapBG = _index;
}

function adm_mapObjectSelect(_item,_index)
{
    _item.parentNode.childNodes[adm_selectedMapObject].classList.remove('active');
    _item.classList.add('active');
    adm_selectedMapObject = _index;
}

function adm_changeMapField(_y,_x)
{
    const img = [adm_selectedMapBG,adm_selectedMapObject];
    let tempArray = ['bg','object','both'];
    let choose;
    for(let i=0;i<tempArray.length;i++)
    {
        if(document.getElementById('adm_chooseEditInMap' + tempArray[i]).checked){choose = tempArray[i];}
    }
    mapImg(adm_mapTable.rows[_y].cells[_x],img,choose);
    if(choose == 'bg' || choose == 'both'){adm_thisMap[_y][_x][0] = adm_selectedMapBG;}
    if(choose == 'object' || choose == 'both'){adm_thisMap[_y][_x][1] = adm_selectedMapObject;}
}

function adm_changeSizeOfMap()
{
    if(adm_mapSizeY.value > 50 || adm_mapSizeY.value < 1){return false;}
    if(adm_mapSizeX.value > 50 || adm_mapSizeX.value < 1){return false;}

    while(adm_mapSizeY.value > adm_thisMap.length)
    {
        let lastRow = adm_mapTable.rows.length;
        let cellsCount = 0;
        if(adm_thisMap.length > 0){cellsCount = adm_thisMap[0].length}
        adm_mapTable.insertRow(lastRow);
        adm_thisMap.push([]);
        for(let i=0;i<cellsCount;i++)
        {
            let images = [adm_selectedMapBG,adm_selectedMapObject];
            mapImg(adm_mapTable.rows[lastRow].insertCell(i),images,'both');
            adm_mapTable.rows[lastRow].cells[i].onclick = function(){adm_changeMapField(lastRow,i);}
            adm_mapTable.rows[lastRow].cells[i].onmouseover = function(_event){if(_event.ctrlKey){adm_changeMapField(lastRow,i);}}
            adm_thisMap[lastRow].push([adm_selectedMapBG,0]);
        }
    }
    
    while(adm_mapSizeY.value < adm_thisMap.length)
    {
        let lastRow = adm_mapTable.rows.length;
        adm_mapTable.deleteRow(lastRow - 1);
        adm_thisMap.pop();
    }
    
    while(adm_mapSizeX.value > adm_thisMap[0].length)
    {
        let lastCell = adm_mapTable.rows[0].cells.length;
        let rowsCount = adm_mapTable.rows.length;
        
        for(let i=0;i<rowsCount;i++)
        {
            let images = [adm_selectedMapBG,adm_selectedMapObject];
            mapImg(adm_mapTable.rows[i].insertCell(lastCell),images,'both');
            adm_mapTable.rows[i].cells[lastCell].onclick = function(){adm_changeMapField(i,lastCell);}
            adm_mapTable.rows[i].cells[lastCell].onmouseover = function(_event){if(_event.ctrlKey){adm_changeMapField(i,lastCell);}}
            adm_thisMap[i].push([adm_selectedMapBG,0]);
        }
    }

    while(adm_mapSizeX.value < adm_thisMap[0].length)
    {
        let lastCell = adm_mapTable.rows[0].cells.length;
        let rowsCount = adm_mapTable.rows.length;
        
        for(let i=0;i<rowsCount;i++)
        {
            adm_mapTable.rows[i].deleteCell(lastCell - 1);
            adm_thisMap[i].pop();
        }
    }
}