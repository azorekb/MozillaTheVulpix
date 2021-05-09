function admin_start()
{
    okno.innerHTML = '';
    admin_conteiner=document.createElement('div');
    admin_conteiner.classList.add('adminContainer');
    okno.appendChild(admin_conteiner);

    admin_list=document.createElement('div');
    admin_list.classList.add('adminList');
    admin_conteiner.appendChild(admin_list);

    for(let i=0;i<ADMIN_LIST_OF_TASKS.length;i++)
    {
        let task = document.createElement('div');
        task.classList.add('adminTask');
        task.innerHTML = ADMIN_LIST_OF_TASKS[i].name[language];
        task.onclick=function(){eval(ADMIN_LIST_OF_TASKS[i].function)()}
        admin_list.appendChild(task);
    }

    admin_content = document.createElement('div');
    admin_content.id = 'admin_content';
    admin_content.innerHTML = ADMIN_WARNINGS[2][language];
    admin_conteiner.appendChild(admin_content);
    
}

function adm_formPokemon()
{
    admin_content.innerHTML = '';
    let table = document.createElement('table');
    table.classList.add('admFormTable');
    let details = Object.keys(ADMIN_POKEMON_DETAILS);
    for(let i=0;i<details.length;i++)
    {
        let input = document.createElement('input');
        input.type = 'text';
        input.id = 'adm_form_'+details[i];
        // input.value = ADMIN_POKEMON_DETAILS[details[i]].example;

        table.insertRow(i).insertCell(0).innerHTML = ADMIN_POKEMON_DETAILS[details[i]].text[language];
        table.rows[i].insertCell(1).appendChild(input);
        table.rows[i].insertCell(2).innerHTML = ADMIN_POKEMON_DETAILS[details[i]].description[language];
    }
    table.insertRow(0).insertCell(0).colSpan = 3;
    table.rows[0].cells[0].innerHTML = '<font color=ff0000>' + ADMIN_WARNINGS[0][language] + '</font>';
    admin_content.appendChild(table);
    let createButton = document.createElement('button');
    createButton.innerHTML = "dodaj";
    createButton.onclick=function()
    {
        adm_createContent.value = '';

        for(let i=0;i<details.length;i++)
        {
            const DETAIL =  details[i];
            const VALUE = document.getElementById('adm_form_' + DETAIL).value;
            const OBJECT = ADMIN_POKEMON_DETAILS[DETAIL];
            let text;

            if(OBJECT.isImportant && VALUE == ''){adm_error(OBJECT.text,0); return false;}
            if(OBJECT.isNumber && isNaN(VALUE)){adm_error(OBJECT.text,1); return false;}
            if(OBJECT.min && VALUE < OBJECT.min){adm_error(OBJECT.text,2); return false;}
            if(OBJECT.max && VALUE > OBJECT.max){adm_error(OBJECT.text,3); return false;}

            if(DETAIL == 'name')
            {
                text = VALUE + ': new Pokemon_list(0';
            }
            else if(OBJECT.isMulti)
            {
                const VALUES = VALUE.split(',');
                text = ",['" + VALUES[0] + "'";
                if(VALUES.length >= 2)
                {
                    for(let j=1;j<VALUES.length;j++)
                    {   
                        text += ",'" + VALUES[j] + "'";
                    }
                }
                text += ']';
            }
            else
            {
                text = ',';
                if(OBJECT.isNumber)
                {
                    text += VALUE;
                }
                else
                {
                    text += "'" + VALUE + "'";
                }
            }

            adm_createContent.value += text;
        }

        adm_createContent.value += '),';
    }

    admin_content.appendChild(createButton);
    let createContent = document.createElement('textarea');
    createContent.id = 'adm_createContent';
    createContent.rows = 3;
    createContent.cols = 100;
    admin_content.appendChild(createContent);
}

function adm_error(_text,_type)
{
    let errorText;

    if(language == ENGLISH)
    {
        errorText = 'error: ' + _text[language];
        switch(_type)
        {
            case 0: errorText += ' is empty'; break;
            case 1: errorText += ' is not a number'; break;
            case 2: errorText += ' is too low'; break;
            case 3: errorText += ' is too high'; break;
        }
    }

    if(language == POLSKI)
    {
        errorText = 'błąd: ' + _text[language];
        switch(_type)
        {
            case 0: errorText += ' nic nie zawiera'; break;
            case 1: errorText += ' nie jest liczbą'; break;
            case 2: errorText += ' ma zbyt małą wartość'; break;
            case 3: errorText += ' ma zbyt dużą wartość'; break;
        }
    }
    
    adm_createContent.value = errorText;
}

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
    
    for(let i=0;i<maps.length;i++)
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
        img.src = MAP_ITEMS[i].src;
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

    adm_mapTable = document.createElement('table');
    adm_mapTable.classList.add('admMapTable');
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

    for(let i=0;i<maps[_number].length;i++)
    {
        adm_mapTable.insertRow(i);
        for(let j=0;j<maps[_number][i].length;j++)
        {
            const img = maps[_number][i][j];
            adm_mapTable.rows[i].insertCell(j).appendChild(mapImg(img));
            adm_mapTable.rows[i].cells[j].onclick = function(){adm_changeMapField(i,j);}
            adm_mapTable.rows[i].cells[j].onmouseover = function(_event){if(_event.ctrlKey){adm_changeMapField(i,j);}}
        }
    }
    
    adm_sizeY.value = maps[_number].length;
    adm_sizeX.value = maps[_number][0].length;
}

function adm_changeMapField(_y,_x)
{
    adm_mapTable.rows[_y].cells[_x].innerHTML = '';
    adm_mapTable.rows[_y].cells[_x].appendChild(mapImg(adm_selectedMapItem));
    maps[adm_mapNo.value][_y][_x] = adm_selectedMapItem;
}

function adm_changeSizeOfMap()
{
    while(adm_sizeY.value > maps[adm_mapNo.value].length)
    {
        let lastRow = adm_mapTable.rows.length;
        let cellsCount = 0;
        if(maps[adm_mapNo.value].length > 0){cellsCount = maps[adm_mapNo.value][0].length}
        adm_mapTable.insertRow(lastRow);
        maps[adm_mapNo.value].push([]);
        for(let i=0;i<cellsCount;i++)
        {
            adm_mapTable.rows[lastRow].insertCell(i).appendChild(mapImg(adm_selectedMapItem));
            adm_mapTable.rows[lastRow].cells[i].onclick = function(){adm_changeMapField(lastRow,i);}
            adm_mapTable.rows[lastRow].cells[i].onmouseover = function(_event){if(_event.ctrlKey){adm_changeMapField(lastRow,i);}}
            maps[adm_mapNo.value][lastRow].push(adm_selectedMapItem);
        }
    }

    while(adm_sizeY.value < maps[adm_mapNo.value].length)
    {
        let lastRow = adm_mapTable.rows.length;
        adm_mapTable.deleteRow(lastRow - 1);
        maps[adm_mapNo.value].pop();
    }

    while(adm_sizeX.value > maps[adm_mapNo.value][0].length)
    {
        let lastCell = adm_mapTable.rows[0].cells.length;
        let rowsCount = adm_mapTable.rows.length;

        for(let i=0;i<rowsCount;i++)
        {
            adm_mapTable.rows[i].insertCell(lastCell).appendChild(mapImg(adm_selectedMapItem));
            adm_mapTable.rows[i].cells[lastCell].onclick = function(){adm_changeMapField(i,lastCell);}
            adm_mapTable.rows[i].cells[lastCell].onmouseover = function(_event){if(_event.ctrlKey){adm_changeMapField(i,lastCell);}}
            maps[adm_mapNo.value][i].push(adm_selectedMapItem);
        }
    }

    while(adm_sizeX.value < maps[adm_mapNo.value][0].length)
    {
        let lastCell = adm_mapTable.rows[0].cells.length;
        let rowsCount = adm_mapTable.rows.length;

        for(let i=0;i<rowsCount;i++)
        {
            adm_mapTable.rows[i].deleteCell(lastCell - 1);
            maps[adm_mapNo.value][i].pop();
        }
    }
    
}

function adm_createCode()
{
    adm_codeText.value = '';
    adm_addToCodeText('let maps = [];');
    for(let i=0;i<maps.length;i++)
    {
        adm_addToCodeText('');
        adm_addToCodeText('maps[' + i + '] = [];');
        for(let j=0;j<maps[i].length;j++)
        {
            let newText = 'maps[' + i + '].push([' + maps[i][j][0];

            for(let k=1;k<maps[i][j].length;k++)
            {
                newText += ',' + maps[i][j][k];
            }

            newText += ']);';
            adm_addToCodeText(newText);

        }
    }

    adm_codeText.select();
    document.execCommand("copy");
}

function adm_addToCodeText(_text)
{
    adm_codeText.value += _text + '\n';
}

function adm_addNewMap()
{
    let newMapNo = maps.length;
    maps.push([[0]]);
    let option = document.createElement('option');
    option.value = newMapNo;
    option.innerHTML = newMapNo;
    option.selected = true;
    adm_mapNo.appendChild(option);

    adm_mapChange(newMapNo);
}