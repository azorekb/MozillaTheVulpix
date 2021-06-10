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
        task.innerHTML = ADMIN_LIST_OF_TASKS[i][language];
        if(ADMIN_LIST_OF_TASKS[i].disabled)
        {
            task.classList.add('disabled');
        }
        else
        {
            task.onclick=function(){admin_show_database(ADMIN_LIST_OF_TASKS[i].english)}
        }
        admin_list.appendChild(task);
    }

    let admin_content = document.createElement('div');
    admin_content.id = 'admin_content';
    admin_content.innerHTML = ADMIN_WARNINGS[2][language];
    admin_conteiner.appendChild(admin_content);

    activeWindow = 'admin';
}

function admin_show_database(_db)
{
    insertWaitingImage(admin_content);

    let php_database = new XMLHttpRequest();
    php_database.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
		{
            console.log(this.responseText);
	        const RES = JSON.parse(this.responseText);
			console.log(RES);
            
            admin_database_list(_db,RES);
        }
    }
    
	php_database.open("POST", 'php/database.php?base=' + _db, true);
	php_database.send();

}

function admin_database_list(_db,_res)
{
    let databaseTable = document.createElement('table');
    databaseTable.id = 'adm_databaseTable';
    databaseTable.classList.add('admdatabaseTable');
    
    databaseTable.insertRow(0);
    const details = ADMIN_DATABASE_COLS[_db];

    for(let i=0;i<details.length;i++)
    {
        databaseTable.rows[0].insertCell(i).innerHTML = details[i].description[language];
    }
    
    let newElementButton = document.createElement('div');
    newElementButton.innerHTML = '+';
    newElementButton.classList.add('adminButton','button','small');
    newElementButton.onclick = function(){adm_add_dbElement(_db);};
    newElementButton.id = 'adm_database_newElementButton';

    let waitingImage = document.createElement('img');
    waitingImage.src = waitingImageUrl;
    waitingImage.classList.add('none');
    waitingImage.id = 'adm_database_newElement_waiting';
    waitingImage.height = 32;
    databaseTable.rows[0].insertCell(details.length).appendChild(newElementButton);
    databaseTable.rows[0].cells[details.length].appendChild(waitingImage);

    Object.keys(_res).forEach(element => {
        let lastRow = databaseTable.insertRow(databaseTable.rows.length);
        lastRow.onclick = function(){adm_edit_dbElement(_db,_res[element].id);}
        for(let i=0;i<details.length;i++)
        {
            lastRow.insertCell(i).innerHTML = _res[element][details[i].dbname];
        }
    })
            
    admin_content.innerHTML = '';
    admin_content.appendChild(databaseTable);
}

function adm_edit_dbElement(_db,_id)
{
    insertWaitingImage(admin_content);
    
    let php_database = new XMLHttpRequest();
    php_database.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
		{
            console.log(this.responseText);
	        const RES = JSON.parse(this.responseText)[0];
			console.log(RES);

            let array = ADMIN_DATABASE_COLS[_db];
            
            let editTable = document.createElement('table');

            for(let i=1; i<array.length;i++)
            {
                editTable.insertRow(i-1).insertCell(0).innerHTML = array[i].description[language];

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
                            option.value = array[i].table[j].english;
                            option.innerHTML = array[i].table[j][language];
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
                                option.innerHTML = array[i].table[j][language];
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
            editTable.id = 'admin_editTable';
            
            if(_db == 'moves'){effectsTab = adm_moves_addition();}

            let save = document.createElement('div');
            save.innerHTML = ADMIN_EDIT_TEXTS.save[language];
            save.classList.add('adminButton','button','small');
            save.id = 'adm_edit_saveButton';
            save.onclick = function(){admin_saveDBElement(_db,_id);}
            let cancel = document.createElement('div');

            cancel.innerHTML = ADMIN_EDIT_TEXTS.cancel[language];
            cancel.classList.add('adminButton','button','small');
            cancel.id = 'adm_edit_cancelButton';
            cancel.onclick = function(){admin_show_database(_db);}
            
            let waitingImage = document.createElement('img');
            waitingImage.src = waitingImageUrl;
            waitingImage.height = 33;
            waitingImage.classList.add('none');
            waitingImage.id = 'adm_edit_waitingIMG';
            
            let buttonDiv = document.createElement('div');
            buttonDiv.classList.add('adm_buttonContainer');
            buttonDiv.appendChild(waitingImage);
            buttonDiv.appendChild(save);
            buttonDiv.appendChild(cancel);

            let info = document.createElement('div');
            info.id = 'adm_edit_info';

            admin_content.innerHTML = '';
            admin_content.appendChild(editTable);
            if(_db == 'moves'){admin_content.appendChild(effectsTab);}
            admin_content.appendChild(info);
            admin_content.appendChild(buttonDiv);

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
        }
    }

    let data = new FormData();
    data.append('which', _id);
    php_database.open("POST", 'php/database.php?base=' + _db, true);
    php_database.send(data);
}

function adm_add_dbElement(_db)
{
    adm_database_newElementButton.classList.add('none');
    adm_database_newElement_waiting.classList.remove('none');

    let data = new FormData();
    data.append('new',true);

    let php_database = new XMLHttpRequest();
    php_database.onreadystatechange = function()
    {
        if(this.readyState == 4 && this.status == 200)
	    {
            console.log(this.responseText);
            const RES = JSON.parse(this.responseText);
	 	    console.log(RES);
            
            if(RES.id == undefined)
            {
                adm_database_newElementButton.classList.remove('none');
                adm_database_newElement_waiting.classList.add('none');
            }
            else
            {
                adm_edit_dbElement(_db,RES.id);
            }
        }
    }

    php_database.open("POST", 'php/database.php?base=' + _db, true);
    php_database.send(data);
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
        let php_database = new XMLHttpRequest();
        php_database.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
		    {
	            const RES = this.responseText;
		    	console.log(RES);

                if(RES == '{}')
                {
                    admin_addSuccess()
                }

                adm_edit_waitingIMG.classList.add('none');
                adm_edit_saveButton.classList.remove('none');
            }
        }

        php_database.open("POST", 'php/database.php?base=' + _db, true);
        php_database.send(data);
    }
    else
    {
        adm_edit_waitingIMG.classList.add('none');
        adm_edit_saveButton.classList.remove('none');
    }
}


function admin_addWarning(_number,_effect)
{
    const TEXT = (_effect + 1) + ADMIN_POKEMON_TEXTS.errors[_number][language] + '<br>';
    adm_edit_info.innerHTML += colorText(TEXT,COLOR_WARNING);
}

function admin_addError(_property,_error,_db)
{
    if(noErrors)
    {
        noErrors = false;
        adm_edit_info.innerHTML += colorText(ADMIN_POKEMON_TEXTS.error[language],COLOR_ERROR);
    }
    const TEXT = '<br>' + ADMIN_DATABASE_COLS[_db][_property].description[language] + ADMIN_POKEMON_TEXTS.errors[_error][language];
    adm_edit_info.innerHTML +=  colorText(TEXT,COLOR_ERROR);
}

function admin_addSuccess()
{
    adm_edit_info.innerHTML += colorText(ADMIN_POKEMON_TEXTS.success[language],COLOR_SUCCESS);
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
            value += '<option value=' + i + '>' + POKEMON_MOVE_EFFECTS[selectValue].types[i][language] + '</option>';
        }
        value += '</select>';
    }

    admin_moves_effectsTable.rows[_number + 1].cells[1].innerHTML = value;
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