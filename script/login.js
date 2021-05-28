function login_changeLanguage(_language)
{
	switch(language)
	{
		case POLSKI: language_polish.classList.remove('active'); break;
		case ENGLISH: language_english.classList.remove('active'); break;
	}

	switch(_language)
	{
		case 'polish': language_polish.classList.add('active'); language = POLSKI; break;
		case 'english': language_english.classList.add('active'); language = ENGLISH; break;
	}

	Object.keys(MAIN_TEXTS).forEach(text =>{
		MAIN_TEXTS[text].object.innerHTML = MAIN_TEXTS[text].texts[language];
		}
	)

}

function changeLoginTab(_tab)
{
	document.getElementById('login_tab_' + logInTab).classList.remove('active');
	document.getElementById('login_content_' + logInTab).classList.remove('active');

	document.getElementById('login_tab_' + _tab).classList.add('active');
	document.getElementById('login_content_' + _tab).classList.add('active');

	logInTab = _tab;
}

function login_send(_type)
{
    let isError = false;
    let obj = document.getElementById(_type + '_errors');
    obj.classList.remove('active');
    obj.innerHTML = '';

    document.getElementById(_type + '_waiting').classList.remove('none');

    obj = document.getElementById(_type + '_button');
    obj.classList.add('none');
    obj.disabled = true;

    obj = document.getElementById(_type + '_name_input');
    if(obj.value.trim() == ''){login_addError('noUserName'); isError = true;}
    else if(obj.value.length < 4){login_addError('wrongUserName'); isError = true;}

    obj = document.getElementById(_type + '_password_input');
    if(obj.value == ''){login_addError('noPassword'); isError = true;}
    else if(obj.value.length < 4){login_addError('wrongPassword'); isError = true;}
    
    if(isError)
    {
        document.getElementById(_type + '_waiting').classList.add('none');
        obj = document.getElementById(_type + '_button');
        obj.classList.remove('none');
        obj.disabled = false;

        return false;
    }

    let php_login = new XMLHttpRequest();
    let login = document.getElementById(_type + '_name_input').value;
    let pass = document.getElementById(_type + '_password_input').value;
	
	php_login.onreadystatechange = function() 
	{
        if(this.readyState == 4 && this.status == 200)
		{
            console.log(this.responseText);
	        const RES = JSON.parse(this.responseText);
			console.log(RES);
            
	        if(RES.error == '')
            {
                activeUser.name = RES.name;
                activeUser.admin = RES.admin;
                start();
            }
            else
            {
                login_addError(RES.error);
                document.getElementById(_type + '_waiting').classList.add('none');
                obj = document.getElementById(_type + '_button');
                obj.classList.remove('none');
                obj.disabled = false;
            }
	    }
	};
    
    let sending_data = new FormData();
    sending_data.append('type', _type);
    sending_data.append('name', login);
    sending_data.append('pass', pass);
    const url = 'php/login.php';
	php_login.open("POST", url, true);
	php_login.send(sending_data);
}

function login_addError(_error)
{
    let object = document.getElementById('login_errors');
    object.classList.add('active');
    if(MAIN_ERRORS[_error] == undefined)
    {
        object.innerHTML +=  _error + '<br>';
    }
    else
    {
        object.innerHTML +=  MAIN_ERRORS[_error][language] + '<br>';
    }
}