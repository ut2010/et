window.addEventListener("load", function() {    // TODO: разобаться с этой ф-ей, возможно заменить на jquery

    var button;
    createButton();     // TODO: некрасиво, в ф-ии изменяется глобальная переменная, может передать ее по ссылке

    l("Start");

    createMenuItem();
    closeAllTabs();
    openGroup();


	// TODO: Проверка на первый запуск
    // Сообщить о сохранении открытых вкладок в группу "Придумать название" и сразу предложить изменить имя группы.
    // Сделать возможность отката последнего действия пользователя

    // Установка переменных хранилища
    //init();
    //var id = createGroup('AutoSave');
    //getAllTabs();

    // Сохраняем состояние вкладок при запуске браузера, а также при обновлении расширения запустится // TODO: возможно баг при обновлении, текущее и предыдущее состояния станут равны
    //saveCurrentTabState();

}, false);

// Временная ф-ия для заполнения при обновлении или установке плагина
function createMenuItem()
{
    l("createMenuItem");
    widget.preferences.clear();
    var groups = new Array()
    groups[0] = {'name': 'one'};
    widget.preferences.groups =  JSON.stringify(groups);
    widget.preferences.one =  JSON.stringify([{"url":"http://www.google.ru","pos":1}, {"url":"http://www.mail.ru","pos":1}]);
    widget.preferences.currentGroup = "one";
}

// Ф-ия получает текущее состояние вкладок,
// сохраняет его, и сохраняет предыдущее состояние вкладок
function saveCurrentTabState()
{
    widget.preferences.previousTabState = widget.preferences.currentTabState;      // TODO: возможна проблема присвоения, если currentTabState пуст, проверить
    widget.preferences.currentTabState = getAllTabs();                             // TODO: проверить на ошибку, если нет открытых вкладок
}

// Ф-ия получает массив всех открытых вкладок, оптимизирует информацию о них,
// и возвращает сериализованный массив
function getAllTabs()
{
    var tabs = opera.extension.tabs.getAll();
    var optimizedTabs = new Array();
    for (var x=0; x<tabs.length; x++)
    {
        optimizedTabs[x] =
        {
            url: tabs[x].url,
            pos: tabs[x].position
        }
    }
    // TODO: внести проверку на пустые объекты {}
    return JSON.stringify(optimizedTabs);
}

// Сохраняет текущее сотояние открытой группы
function saveCurrentGroupTabs()
{
    widget.preferences[widget.preferences.currentGroup] = getAllTabs();
}

function reOpen(item)
{
    saveCurrentGroupTabs();   // предполагается что текущая группа выбрана
    closeAllTabs();
    setCurrentGroup(item);
    setTimeout(openGroup, 3000);
}

// Ф-ия закрывает все открытые вкладки
function closeAllTabs()
{
    var tabs = opera.extension.tabs.getAll();

    for (var x=0; x < tabs.length; x++)
    {
    	if(x==0)
    	{
    		tabs[x].update({"url":"opera:speeddial"});
    	}
    	else
    	{
        tabs[x].close();
    	}
    }
}

function addGroupItem(item)
{
    // Сохраняем в список групп
    var groups = JSON.parse(widget.preferences.groups);
    groups.push(item);
    widget.preferences.groups = JSON.stringify(groups);
    saveCurrentGroupTabs();
    closeAllTabs();
    createNewGroup(item);
    widget.preferences.currentGroup = item.name;   // устанавливаем указатель на текущую группу
    openGroup();
}

// Устанавливает текущую группу
function setCurrentGroup(item)
{
    l("Установил группу");
    widget.preferences.currentGroup = item.name;   // устанавливаем указатель на текущую группу
}

function createNewGroup(item)
{
    widget.preferences[item.name] = JSON.stringify([{"url":"http://www.google.ru","pos":1}]);    // создаем переменную со стартовой вкладкой

}

 // Открывает вкладки группы, согласно установленному значению currentGroup
function openGroup()
{
    var tabs = JSON.parse(widget.preferences[widget.preferences.currentGroup]);
    
    //var thisTab = opera.extension.tabs.getSelected();
   // thisTab.update({"url":tabs[0].url});

    for (var x=0; x<tabs.length; x++)
    {
    	if(x==0)
    	{
    		l("Работает");
    		var tabsNew = opera.extension.tabs.getAll();
			tabsNew[0].update({"url": tabs[x].url});
    	}
    	else
    	{
        	opera.extension.tabs.create({url: tabs[x].url});
    	}
    }
}

function createButton()
{
    // Кнопка, popup
    var buttonProp =
    {
        disabled: false,
        icon: "images/icon_18.png",
        title: "Кнопка",
        //onclick: myTest(),
        badge: {
            //backgroundColor: '#cc0000',
            //color: '#ffffff',
            //display: block || none
            //textContent: "843"
        },
        popup: {
            height: 300,
            width: 200,
            href: "popup.html"
        }
    }

    button = opera.contexts.toolbar.createItem( buttonProp );
    opera.contexts.toolbar.addItem( button );
    //button.addEventListener('click', saveCurrentTabState, false);
}

// Упрощенный вывод в консоль
function l (message)
{
    console.log(message);
}