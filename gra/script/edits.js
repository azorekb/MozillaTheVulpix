function admin_start()
{
    okno.innerHTML='';
    admin_conteiner=document.createElement('div');
    admin_conteiner.classList.add('adminContainer');
    okno.appendChild(admin_conteiner);

    admin_list=document.createElement('div');
    admin_list.classList.add('adminList');
    admin_conteiner.appendChild(admin_list);

    for(let i=0;i<ADMIN_LIST_OF_TASKS.length;i++)
    {
        let task=document.createElement('div');
        task.classList.add('adminTask');
        task.innerHTML=ADMIN_LIST_OF_TASKS[i].name[language];
        task.onclick=function(){eval(ADMIN_LIST_OF_TASKS[i].function)()}
        admin_list.appendChild(task);
    }

    admin_content=document.createElement('div');
    admin_conteiner.appendChild(admin_content);
    
}

function adm_formPokemon()
{
    admin_content.innerHTML='';
    let table=document.createElement('table');
    table.classList.add('admFormTable');
    let texts=Object.keys(ADMIN_POKEMON_TEXTS);
    for(let i=0;i<texts.length;i++)
    {
        let input=document.createElement('input');
        input.type='text';
        input.id='adm_form_'+texts[i];
        //input.value=EXAMPLE[texts[i]];

        table.insertRow(i).insertCell(0).innerHTML=ADMIN_POKEMON_TEXTS[texts[i]][language];
        table.rows[i].insertCell(1).appendChild(input);
        table.rows[i].insertCell(2).innerHTML=ADMIN_POKEMON_DESCRIPTION[texts[i]][language];
    }
    table.insertRow(0).insertCell(0).colSpan=3;
    table.rows[0].cells[0].innerHTML='<font color=ff0000>'+ADMIN_WARNINGS[0][language]+'</font>';
    admin_content.appendChild(table);
    let createButton=document.createElement('button');
    createButton.innerHTML="dodaj";
    createButton.onclick=function()
    {
        let temp,tt;
        adm_createContent.value='';
        tt=ADMIN_POKEMON_TEXTS.name;
        if(adm_form_name.value==''){adm_error(tt,0); return false;}
        adm_add(adm_form_name.value);
        adm_add(':new Pokemon_list(0,');
        
        temp=adm_form_types.value.split(',');
        tt=ADMIN_POKEMON_TEXTS.types;
        if(temp[0]==''){adm_error(tt,0); return false;}
        adm_add("'"+temp[0]+"',");
        if(temp.length==2){adm_add("'"+temp[1]+"',");}else{adm_add("'',");}
        
        temp=adm_form_abilities.value.split(',');
        tt=ADMIN_POKEMON_TEXTS.abilities;
        if(temp[0]==''){adm_error(tt,0); return false;}
        adm_add("'"+temp[0]+"',");
        if(temp.length>=2){adm_add("'"+temp[1]+"',");}else{adm_add("'',");}
        if(temp.length==3){adm_add("'"+temp[2]+"',");}else{adm_add("'',");}
        
        temp=adm_form_EVYeld.value.split(',');
        tt=ADMIN_POKEMON_TEXTS.EVYeld;
        if(temp[0]==''){adm_error(tt,0); return false;}
        adm_add("['"+temp[0]+"'");
        if(temp.length>=2)
        {
            for(let i=1;i<temp.length;i++)
            {   
                adm_add(",'"+temp[i]+"'");
            }
        }
        adm_add('],');
        
        temp=adm_form_catchRate.value*1;
        tt=ADMIN_POKEMON_TEXTS.catchRate;
        if(temp==''){adm_error(tt,0); return false;}
        if(isNaN(temp)){adm_error(tt,2); return false;}
        if(temp<=0){adm_error(tt,1); return false;}
        if(temp>255){adm_error(tt,1); return false;}
        adm_add(temp+',');
        
        temp=adm_form_baseExp.value;
        tt=ADMIN_POKEMON_TEXTS.baseExp;
        if(temp==''){adm_error(tt,0); return false;}
        if(isNaN(temp)){adm_error(tt,2); return false;}
        if(temp<=0){adm_error(tt,1); return false;}
        adm_add(temp+',');

        temp=adm_form_growthExp.value;
        tt=ADMIN_POKEMON_TEXTS.growthExp;
        if(temp==''){adm_error(tt,0); return false;}
        adm_add("'"+temp+"',");

        temp=adm_form_femaleRate.value/100;
        tt=ADMIN_POKEMON_TEXTS.femaleRate;
        if(temp==''){adm_error(tt,0); return false;}
        if(isNaN(temp)){adm_error(tt,2); return false;}
        if(temp<0){adm_error(tt,1); return false;}
        if(temp>1){adm_error(tt,1); return false;}
        adm_add(temp+',');

        temp=adm_form_eggGroup.value;
        tt=ADMIN_POKEMON_TEXTS.eggGroup;
        //if(temp==''){adm_error(tt,0); return false;}
        adm_add("'"+temp+"',");

        temp=adm_form_eggCycles.value;
        tt=ADMIN_POKEMON_TEXTS.eggCycles;
        //if(temp==''){adm_error(tt,0); return false;}
        //if(isNaN(temp)){adm_error(tt,2); return false;}
        //if(temp<=0){adm_error(tt,1); return false;}
        adm_add(temp+',');

        temp=adm_form_baseHP.value;
        tt=ADMIN_POKEMON_TEXTS.baseHP;
        if(temp==''){adm_error(tt,0); return false;}
        if(isNaN(temp)){adm_error(tt,2); return false;}
        if(temp<=0){adm_error(tt,1); return false;}
        adm_add(temp+',');

        temp=adm_form_baseAttack.value;
        tt=ADMIN_POKEMON_TEXTS.baseAttack;
        if(temp==''){adm_error(tt,0); return false;}
        if(isNaN(temp)){adm_error(tt,2); return false;}
        if(temp<=0){adm_error(tt,1); return false;}
        adm_add(temp+',');

        temp=adm_form_baseDefence.value;
        tt=ADMIN_POKEMON_TEXTS.baseDefence;
        if(temp==''){adm_error(tt,0); return false;}
        if(isNaN(temp)){adm_error(tt,2); return false;}
        if(temp<=0){adm_error(tt,1); return false;}
        adm_add(temp+',');

        temp=adm_form_baseSpAttack.value;
        tt=ADMIN_POKEMON_TEXTS.baseSpAttack;
        if(temp==''){adm_error(tt,0); return false;}
        if(isNaN(temp)){adm_error(tt,2); return false;}
        if(temp<=0){adm_error(tt,1); return false;}
        adm_add(temp+',');

        temp=adm_form_baseSpDefence.value;
        tt=ADMIN_POKEMON_TEXTS.baseSpDefence;
        if(temp==''){adm_error(tt,0); return false;}
        if(isNaN(temp)){adm_error(tt,2); return false;}
        if(temp<=0){adm_error(tt,1); return false;}
        adm_add(temp+',');

        temp=adm_form_baseSpeed.value;
        tt=ADMIN_POKEMON_TEXTS.baseSpeed;
        if(temp==''){adm_error(tt,0); return false;}
        if(isNaN(temp)){adm_error(tt,2); return false;}
        if(temp<=0){adm_error(tt,1); return false;}
        adm_add(temp+',');
        
        temp=adm_form_preevolutionSpecie.value;
        tt=ADMIN_POKEMON_TEXTS.preevolutionSpecie;
        adm_add("'"+temp+"',");

        temp=adm_form_preevolutionMethod.value;
        tt=ADMIN_POKEMON_TEXTS.preevolutionMethod;
        adm_add("'"+temp+"',");

        temp=adm_form_preevolutionMethodValue.value;
        tt=ADMIN_POKEMON_TEXTS.preevolutionMethodValue;
        adm_add("'"+temp+"',");

        temp=adm_form_weight.value;
        tt=ADMIN_POKEMON_TEXTS.weight;
        if(temp==''){adm_error(tt,0); return false;}
        if(isNaN(temp)){adm_error(tt,2); return false;}
        if(temp<=0){adm_error(tt,1); return false;}
        adm_add(temp+',');

        temp=adm_form_height.value;
        tt=ADMIN_POKEMON_TEXTS.height;
        if(temp==''){adm_error(tt,0); return false;}
        if(isNaN(temp)){adm_error(tt,2); return false;}
        if(temp<=0){adm_error(tt,1); return false;}
        adm_add(temp+'),');
    }

//,'medium fast',0.125,'field',35,55,55,50,45,65,55,'','','',0.3,6.5),
    admin_content.appendChild(createButton);
    let createContent=document.createElement('textarea');
    createContent.id='adm_createContent';
    createContent.rows=3;
    createContent.cols=100;
    admin_content.appendChild(createContent);
}

function adm_add(_text)
{
    adm_createContent.value+=_text;
}

function adm_error(_text,_type)
{
    let text=_text[language];
    let error='';

    if(language == ENGLISH)
    {
        error='error: ';
        switch(_type)
        {
            case 0: text+=' is empty'; break;
            case 1: text+=' is too low or too high'; break;
            case 2: text+=' is not a number'; break;
        }
    }

    if(language == POLSKI)
    {
        error='błąd: ';
        switch(_type)
        {
            case 0: text+=' nic nie zawiera'; break;
            case 1: text+=' ma zbyt małą lub zbyt dużą wartość'; break;
            case 2: text+=' nie jest liczbą'; break;
        }
    }
    
    adm_createContent.value=error+text;
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
    adm_details.appendChild(adm_mapNo);
    
    for(let i=0;i<maps.length;i++)
    {
        option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        adm_mapNo.appendChild(option);
    }

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

}