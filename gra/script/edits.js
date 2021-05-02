let admin_conteiner;
let admin_list;
let admin_content;


const ADMIN_LIST_OF_TASKS=
[
    {name:['dodaj pokemona','add pokemon'], function: adm_formPokemon}
];
const ADMIN_POKEMON_TEXTS=
{
    name:['nazwa pokemona','name of pokemon'],
    types:['typy','types'],
    abilities:['umiejętności','abilities'],
    EVYeld:['EV Yeld','EV Yeld'],
    catchRate:['szanse złapania','catch rate'],
    baseExp:['bazowe doświadczenie','base expirience'],
    growthExp:['wzrost doświadczenia','growth of expirience'],
    femaleRate:['szanse na samiczkę','female rate'],
    eggGroup:['grupa jajek','egg group'],
    eggCycles:['cykle do wyklucia','egg cycles'],
    baseHP:['bazowe życie','base hit points'],
    baseAttack:['bazowy atak','base attack'],
    baseDefence:['bazowa obrona','base defence'],
    baseSpAttack:['bazowy specjalny atak','base special attack'],
    baseSpDefence:['bazowa specjalna obrona','base special defence'],
    baseSpeed:['bazowa szybkość','base speed'],
    preevolutionSpecie:['gatunek preewolucji','preevolution specie'],
    preevolutionMethod:['metoda ewolucji preewolucji','evolution method of preevolution'],
    preevolutionMethodValue:['podtyp lub wartość metody','subtype or value od method'],
    height:['wysokość','height'],
    weight:['waga','weight'],
}

const EXAMPLE=
{
    name: 'alolan_ninetales',
    types:'ice,fairy',
    abilities:'snow cloak,,snow warning',
    EVYeld:'speed,speed',
    catchRate:75,
    baseExp:177,
    growthExp:'medium fast',
    femaleRate:75,
    eggGroup:'field',
    eggCycles:20,
    baseHP:75,
    baseAttack:80,
    baseDefence:85,
    baseSpAttack:90,
    baseSpDefence:95,
    baseSpeed:100,
    preevolutionSpecie:'alolan_vulpix',
    preevolutionMethod:'stone',
    preevolutionMethodValue:'ice stone',
    height:1.1,
    weight:19.9,
}

const ADMIN_WARNINGS=
[
    ['używaj tylko języka <u>angielskiego</u> oraz małych liter','use only <u>english</u> language and small letters']
];

const ADMIN_POKEMON_DESCRIPTION=
{
    name:['nie używaj spacji','do not use space'],
    types:['w przypadku dwu wypisz po przecinku bez spacji','in the case of two write out after "," without space'],
    abilities:['w przypadku dwu lub trzech (trzecia to zawsze ukryta) wypisz po przecinku bez spacji, jeśli ma być jedna umiejętność + ukryta wypisz drugą jako pustą','in the case of two or three (third is always hidden) write out after "," without space, in the case if there is only one ability plus hidden write second as empty'],
    EVYeld:['1 atak = attack, 2 atak = attack,attack (hp,attack,defence,spAttack,spDeffence,speed)','1 attack = attack, 2 attack = attack,attack (hp,attack,defence,spAttack,spDeffence,speed)'],
    catchRate:['1-255, 255-pewne złapanie','1-255, 255-sure catch'],
    baseExp:['',''],
    growthExp:['erratic,fast,medium fast,medium slow,slow,fluctuating','erratic,fast,medium fast,medium slow,slow,fluctuating'],
    femaleRate:['sama liczba 0-100, zamiast przecinka użyj kropki','only number 0-100, use dot insted of comma'],
    eggGroup:['',''],
    eggCycles:['minimum 1','minimum 1'],
    baseHP:['',''],
    baseAttack:['',''],
    baseDefence:['',''],
    baseSpAttack:['',''],
    baseSpDefence:['',''],
    baseSpeed:['',''],
    preevolutionSpecie:['',''],
    preevolutionMethod:['przykłady: stone, mega stone, level, friendship, place, love, move, trade...','examples: stone, mega stone, level, friendship, place, love, move, trade...'],
    preevolutionMethodValue:['przykłady: fire stone, lucarionite, 52, night, icy rock, fairy move, metal coath..','examples: fire stone, lucarionite, 52, night, icy rock, fairy move, metal coath...'],
    height:['zamiast przecinka użyj kropki','use dot insted of comma'],
    weight:['zamiast przecinka użyj kropki','use dot insted of comma'],
}

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
        task.onclick=function(){ADMIN_LIST_OF_TASKS[i].function()}
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
        if(temp==''){adm_error(tt,0); return false;}
        adm_add("'"+temp+"',");

        temp=adm_form_eggCycles.value;
        tt=ADMIN_POKEMON_TEXTS.eggCycles;
        if(temp==''){adm_error(tt,0); return false;}
        if(isNaN(temp)){adm_error(tt,2); return false;}
        if(temp<=0){adm_error(tt,1); return false;}
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

    if(language==ENGLISH)
    {
        error='error: ';
        switch(_type)
        {
            case 0: text+=' is empty'; break;
            case 1: text+=' is too low or too high'; break;
            case 2: text+=' is not a number'; break;
        }
    }

    if(language==POLSKI)
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