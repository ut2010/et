window.addEventListener("load", function() {    // TODO: разобаться с этой ф-ей, возможно заменить на jquery

    var button;
    createButton();     // TODO: некрасиво, в ф-ии изменяется глобальная переменная, может передать ее по ссылке




    //saveCurrentGroupTabs();
    //closeAllTabs();
    //widget.preferences.currentGroup = 'one';   // Текущая активная группа
    //openGroup(widget.preferences.currentGroup);

	
	
	

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

// Ф-ия закрывает все открытые вкладки
function closeAllTabs()
{
    var tabs = opera.extension.tabs.getAll();

    for (var x=0; x < tabs.length; x++)
    {
        tabs[x].close();
    }
}

function addGroupItem(item)
{
    // Сохраняем в список групп
    var group = JSON.parse(widget.preferences.groups);
    group.push(item);
    widget.preferences.groups = JSON.stringify(group);
    saveCurrentGroupTabs();
    closeAllTabs();
    setCurrentGroup(item);
}

// Устанавливает текущую группу
function setCurrentGroup(item)
{
    if (widget.preferences[item.name]==undefinite)     // если создается новая группа
    {
        widget.preferences[item.name] = [{"url":"http://www.google.ru","pos":1}];    // то создаем переменную с пустым объектом, без вкладок
    }
    widget.preferences.currentGroup = item.name;   // устанавливаем указатель на текущую группу
}


function openGroup(item)
{
    var tabs = JSON.parse(widget.preferences['one']);
    for (var x=0; x<tabs.length; x++)
    {
        opera.extension.tabs.create({url: tabs[x].url});
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